import { AssigneeType, ICheckListItems, ICheckListRes, Tag } from './../interface.tasks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface checklistState {
  checklists: ICheckListRes[] | undefined;
  triggerChecklistUpdate: boolean;
  triggerItemUpdate: boolean;
  clickedChecklistId: string;
  clickedChecklistItemId: string | undefined;
  toggleAssignChecklistItemId: string | null | undefined;
  showChecklistInput: boolean;
  showChecklistItemInput: boolean;
  openChecklistModal: boolean;
  openedDisclosureId: string[];
  assignTag?: Tag;
}

interface CreateItemProps {
  checklistId: string;
  checklistItem: ICheckListItems;
}

const initialState: checklistState = {
  triggerChecklistUpdate: false,
  triggerItemUpdate: false,
  clickedChecklistId: '',
  clickedChecklistItemId: '',
  toggleAssignChecklistItemId: null,
  showChecklistItemInput: false,
  showChecklistInput: false,
  openChecklistModal: false,
  openedDisclosureId: [],
  checklists: [],
  assignTag: undefined
};

export const checklistSlice = createSlice({
  name: 'Checklists',
  initialState,
  reducers: {
    setChecklists(state, action: PayloadAction<ICheckListRes[]>) {
      state.checklists = action.payload;
    },
    setCreateNewChecklist(state, action: PayloadAction<ICheckListRes>) {
      if (state.checklists) {
        state.checklists = [...state.checklists, action.payload];
      } else {
        state.checklists = [action.payload];
      }
    },
    setEditChecklist(state, action: PayloadAction<ICheckListRes>) {
      state.checklists = state.checklists?.map((checklist) => {
        if (checklist.id === action.payload.id) {
          return action.payload;
        }
        return checklist;
      });
    },
    setCreateChecklistItem(state, action: PayloadAction<CreateItemProps>) {
      const { checklistId, checklistItem } = action.payload;

      const findChecklist = state.checklists?.find((checklist) => checklist.id === checklistId);

      if (findChecklist) {
        findChecklist.items.push(checklistItem);

        state.checklists = state.checklists?.map((checklist) => {
          if (checklist.id === checklistId) {
            return findChecklist;
          }
          return checklist;
        });
      }
    },
    seteditChecklistItem(state, action: PayloadAction<CreateItemProps>) {
      const { checklistId, checklistItem } = action.payload;

      const findChecklist = state.checklists?.find((checklist) => checklist.id === checklistId);

      if (findChecklist) {
        const updatedItems = findChecklist.items.map((item) => {
          if (item.id === checklistItem.id) {
            return checklistItem;
          }
          return item;
        });
        const updateChecklist = { ...findChecklist, items: updatedItems };
        state.checklists = state.checklists?.map((checklist) => {
          if (checklist.id === checklistId) {
            return updateChecklist;
          }
          return checklist;
        });
      }
    },
    setDeleteChecklistItem(state, action: PayloadAction<{ checklistId: string; itemId: string }>) {
      const { checklistId, itemId } = action.payload;

      const findChecklist = state.checklists?.find((checklist) => checklist.id === checklistId);

      if (findChecklist) {
        const updatedItems = findChecklist.items.filter((item) => {
          return item.id !== itemId;
        });
        const updateChecklist = { ...findChecklist, items: updatedItems };
        state.checklists = state.checklists?.map((checklist) => {
          if (checklist.id === checklistId) {
            return updateChecklist;
          }
          return checklist;
        });
      }
    },
    setDeleteChecklist(state, action: PayloadAction<string>) {
      state.checklists = state.checklists?.filter((item) => {
        return item.id !== action.payload;
      });
    },
    setAssignChecklistItem(state, action: PayloadAction<{ itemId: string; assignee: AssigneeType }>) {
      let checklistToUpdate = null;
      let updatedItemArr = null;
      if (state.checklists) {
        for (let index = 0; index < state.checklists?.length; index++) {
          const itemToUpdate = state.checklists[index].items.find((i) => i.id === action.payload.itemId);
          if (itemToUpdate) {
            checklistToUpdate = state.checklists[index];
            itemToUpdate.assignees.push(action.payload.assignee);
            updatedItemArr = state.checklists[index].items.map((item) => {
              if (item.id === itemToUpdate.id) {
                return itemToUpdate;
              }
              return item;
            });
          }
        }
        const updatedChecklist = { ...checklistToUpdate, items: updatedItemArr };
        setEditChecklist(updatedChecklist as ICheckListRes);
      }
    },
    setUnassignChecklistItem(state, action: PayloadAction<{ itemId: string; assigneeId: string }>) {
      let checklistToUpdate = null;
      let updatedItemArr = null;
      if (state.checklists) {
        for (let index = 0; index < state.checklists?.length; index++) {
          const itemToUpdate = state.checklists[index].items.find((i) => i.id === action.payload.itemId);
          if (itemToUpdate) {
            checklistToUpdate = state.checklists[index];
            const updateItemAssignee = itemToUpdate.assignees.filter((item) => {
              return item.id !== action.payload.assigneeId;
            });
            itemToUpdate.assignees = updateItemAssignee;
            updatedItemArr = state.checklists[index].items.map((item) => {
              if (item.id === itemToUpdate.id) {
                return itemToUpdate;
              }
              return item;
            });
            // itemToUpdate.assignees.push(action.payload.assignee);
          }
        }
        const updateChecklist = { ...checklistToUpdate, items: updatedItemArr };
        setEditChecklist(updateChecklist as ICheckListRes);
      }
    },
    setAssignTagsToChecklistItem(state, action: PayloadAction<{ itemId: string; tag: Tag }>) {
      let checklistToUpdate = null;
      let updatedItemArr = null;
      if (state.checklists) {
        for (let index = 0; index < state.checklists?.length; index++) {
          const itemToUpdate = state.checklists[index].items.find((i) => i.id === action.payload.itemId);
          if (itemToUpdate) {
            checklistToUpdate = state.checklists[index];
            itemToUpdate.tags.push(action.payload.tag);
            updatedItemArr = state.checklists[index].items.map((item) => {
              if (item.id === itemToUpdate.id) {
                return itemToUpdate;
              }
              return item;
            });
          }
        }
        const updatedChecklist = { ...checklistToUpdate, items: updatedItemArr };
        setEditChecklist(updatedChecklist as ICheckListRes);
      }
    },
    setUnassignTagChecklistItem(state, action: PayloadAction<{ itemId: string; tagId: string }>) {
      let checklistToUpdate = null;
      let updatedItemArr = null;
      if (state.checklists) {
        for (let index = 0; index < state.checklists?.length; index++) {
          const itemToUpdate = state.checklists[index].items.find((i) => i.id === action.payload.itemId);
          if (itemToUpdate) {
            checklistToUpdate = state.checklists[index];
            const updateItemAssignee = itemToUpdate.tags.filter((item) => {
              return item.id !== action.payload.tagId;
            });
            itemToUpdate.tags = updateItemAssignee;
            updatedItemArr = state.checklists[index].items.map((item) => {
              if (item.id === itemToUpdate.id) {
                return itemToUpdate;
              }
              return item;
            });
          }
        }
        const updateChecklist = { ...checklistToUpdate, items: updatedItemArr };
        setEditChecklist(updateChecklist as ICheckListRes);
      }
    },
    setTriggerChecklistUpdate(state, action: PayloadAction<boolean>) {
      state.triggerChecklistUpdate = action.payload;
    },
    setTriggerItemtUpdate(state, action: PayloadAction<boolean>) {
      state.triggerItemUpdate = action.payload;
    },
    setClickChecklistId(state, action: PayloadAction<string>) {
      state.clickedChecklistId = action.payload;
    },
    setClickChecklistItemId(state, action: PayloadAction<string | undefined>) {
      state.clickedChecklistItemId = action.payload;
    },
    setToggleAssignChecklistItemId(state, action: PayloadAction<string | null | undefined>) {
      state.toggleAssignChecklistItemId = action.payload;
    },
    setShowChecklistInput(state, action: PayloadAction<boolean>) {
      state.showChecklistInput = action.payload;
    },
    setShowChecklistItemInput(state, action: PayloadAction<boolean>) {
      state.showChecklistItemInput = action.payload;
    },
    setOpenChecklistModal(state, action: PayloadAction<boolean>) {
      state.openChecklistModal = action.payload;
    },
    setOpenedDisclosureId(state, action: PayloadAction<string>) {
      let newArr = [];
      if (state.openedDisclosureId.includes(action.payload)) {
        newArr = state.openedDisclosureId.filter((i) => i !== action.payload);
      } else {
        newArr = [...state.openedDisclosureId, action.payload];
      }
      state.openedDisclosureId = newArr;
    },
    setAssignTag(state, action: PayloadAction<Tag>) {
      state.assignTag = action.payload;
    }
  }
});

export const {
  setUnassignTagChecklistItem,
  setAssignTag,
  setChecklists,
  setTriggerChecklistUpdate,
  setTriggerItemtUpdate,
  setClickChecklistId,
  setClickChecklistItemId,
  setToggleAssignChecklistItemId,
  setShowChecklistInput,
  setShowChecklistItemInput,
  setOpenChecklistModal,
  setOpenedDisclosureId,
  setCreateNewChecklist,
  setEditChecklist,
  setCreateChecklistItem,
  seteditChecklistItem,
  setDeleteChecklist,
  setDeleteChecklistItem,
  setAssignChecklistItem,
  setUnassignChecklistItem,
  setAssignTagsToChecklistItem
} = checklistSlice.actions;

export default checklistSlice.reducer;
