import React, { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UseCreatelistItemService, useEditChecklistItem } from '../../../../features/task/checklist/checklistService';
import ChecklistModal from './ChecklistModal';
import { lessOptions } from './ModalOptions';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  setClickChecklistId,
  setClickChecklistItemId,
  setCreateChecklistItem,
  setToggleAssignChecklistItemId,
  seteditChecklistItem
} from '../../../../features/task/checklist/checklistSlice';
import { setCurrentTaskIdForTag } from '../../../../features/workspace/tags/tagSlice';
import { ICheckListItems } from '../../../../features/task/interface.tasks';
import Assignee from '../../../../pages/workspace/tasks/assignTask/Assignee';
import { ManageTagsDropdown } from '../../../Tag/ui/ManageTagsDropdown/ui/ManageTagsDropdown';
import TaskTag from '../../../Tag/ui/TaskTag';
import ThreeDotIcon from '../../../../assets/icons/ThreeDotIcon';

export interface checkListItemProps {
  Item: ICheckListItems[];
  checklistId: string;
}

function ChecklistItem({ Item, checklistId }: checkListItemProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const [newItem, setNewItem] = useState<string>('');
  const [name, setName] = useState('');
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const { showChecklistItemInput, clickedChecklistId } = useAppSelector((state) => state.checklist);

  const createChecklist = useMutation(UseCreatelistItemService, {
    onSuccess: (data) => {
      dispatch(
        setCreateChecklistItem({
          checklistId,
          checklistItem: data.data.checklist_item
        })
      );
    }
  });

  const editChecklistItem = useMutation(useEditChecklistItem, {
    onSuccess: (data) => {
      dispatch(
        seteditChecklistItem({
          checklistId,
          checklistItem: data.data.checklist_item
        })
      );
      setName('');
    }
  });

  const handleSubmit = async () => {
    await createChecklist.mutateAsync({
      checklist_id: checklistId,
      name: newItem
    });
    setNewItem('');
  };

  const isDone = async (id: string, done: number, name: string) => {
    await editChecklistItem.mutateAsync({
      itemId: id,
      name,
      checklist_id: checklistId,
      done: done === 1 ? 0 : 1
    });
  };

  const handleEditItemName = async (id: string, done: number) => {
    await editChecklistItem.mutateAsync({
      itemId: id,
      name: name,
      checklist_id: checklistId,
      done
    });
  };

  return (
    <div className="w-full">
      {showChecklistItemInput && clickedChecklistId === checklistId && (
        <span className="flex items-center">
          <label className="text-xl">+</label>
          <input
            autoFocus
            type="text"
            className="h-8 my-1 border-none hover:border-none hover:outline-none focus:outline-none rounded w-full"
            placeholder="Add New Checklist Item"
            onChange={(e) => setNewItem(e.target.value)}
            value={newItem}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSubmit() : null)}
          />
        </span>
      )}

      {Item.map((item) => {
        return (
          <div key={item.id} className="p-1 mb-0.5">
            <div className="group flex items-center text-gray-500 bg-white py-0.5 h-auto">
              <div className="w-2/4 flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={item.is_done === 1 ? true : false}
                  className="rounded-lg mx-3 text-green-500 border-green-800"
                  onChange={() => {
                    isDone(item.id, item.is_done, item.name);
                  }}
                />
                <div
                  ref={inputRef}
                  suppressContentEditableWarning={true}
                  contentEditable={true}
                  onKeyDown={(e) => (e.key === 'Enter' ? handleEditItemName(item.id, item.is_done) : null)}
                  onInput={(e) => {
                    if (e instanceof KeyboardEvent && (e.key === 'Enter' || e.keyCode === 13)) {
                      e.preventDefault();
                      return;
                    }

                    setName(e.currentTarget.textContent as string);
                  }}
                  className="cursor-text"
                >
                  {item.name}
                </div>
                <div className="opacity-0 group-hover:opacity-100 flex items-center">
                  <div onClick={(e) => setAnchor(e.currentTarget)}>
                    <ThreeDotIcon />
                  </div>

                  <ChecklistModal
                    anchor={anchor}
                    setAnchor={setAnchor}
                    options={lessOptions}
                    checklistId={checklistId}
                    checklistItemId={item.id}
                  />
                  <ManageTagsDropdown tagsArr={item.tags} entityId={item.id} entityType="checklist_item" />
                </div>
              </div>
              <div
                onClick={() => {
                  dispatch(setToggleAssignChecklistItemId(item.id));
                  dispatch(setClickChecklistId(checklistId));
                  dispatch(setClickChecklistItemId(item.id));
                }}
                className="w-1/4 flex justify-center"
              >
                <Assignee itemId={item.id} option="checklist" assigneeChecklistItem={item} />
              </div>

              <span onClick={() => dispatch(setCurrentTaskIdForTag(item.id))} className="w-1/4 flex justify-center">
                {item.tags.map((tag) => (
                  <TaskTag key={tag.id} tag={tag} entity_id={item.id} entity_type="task" />
                ))}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChecklistItem;
