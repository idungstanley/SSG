import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  UseCreatelistItemService,
  // UseDeleteChecklistItemService,
  UseUpdateChecklistItemService
} from '../../../../../../../../features/task/checklist/checklistService';
import { GrDrag } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg';
import ChecklistModal from './ChecklistModal';
import { lessOptions } from '../ModalOptions';
import { useAppDispatch, useAppSelector } from '../../../../../../../../app/hooks';
import {
  setClickChecklistId,
  setClickChecklistItemId,
  setToggleAssignChecklistItemId,
  setTriggerItemtUpdate
} from '../../../../../../../../features/task/checklist/checklistSlice';
import AssignTask from '../../../../../../tasks/assignTask/AssignTask';
import { AvatarWithInitials } from '../../../../../../../../components';
import ToolTip from '../../../../../../../../components/Tooltip';
import { ICheckListItems } from '../../../../../../../../features/task/interface.tasks';

export interface checkListItemProps {
  Item: ICheckListItems[];
  checklistId: string;
}

function ChecklistItem({ Item, checklistId }: checkListItemProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const [newItem, setNewItem] = useState<string>('');
  const [itemId, setItemId] = useState<string>('');
  const [done, setDone] = useState<number>(0);
  const [editName, setEditName] = useState<string>('');

  const { triggerItemUpdate, toggleAssignChecklistItemId } = useAppSelector((state) => state.checklist);

  const createChecklist = useMutation(UseCreatelistItemService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  const handleSubmit = async () => {
    await createChecklist.mutateAsync({
      checklist_id: checklistId,
      name: newItem
    });
    setNewItem('');
  };

  UseUpdateChecklistItemService({
    checklist_id: checklistId,
    name: editName,
    triggerItemUpdate: triggerItemUpdate,
    itemId: itemId,
    done
  });

  const isDone = (id: string, done: number, name: string) => {
    setItemId(id);
    setEditName(name);
    done === 0 ? setDone(1) : setDone(0);
    dispatch(setTriggerItemtUpdate(true));
  };

  const handleEditItemName = (id: string, done: number) => {
    setEditName(inputRef.current!.innerText);
    setItemId(id);
    setDone(done);
    dispatch(setTriggerItemtUpdate(true));
  };

  const focusItem = () => {
    inputRef.current?.focus();
  };

  const groupAssignee = (data: [{ id: string; initials: string; colour: string }] | undefined) => {
    return data?.map((newData) => (
      <div key={newData.id} className="">
        <span key={newData.id}>
          <AvatarWithInitials initials={newData.initials} backgroundColour={newData.colour} height="h-5" width="w-5" />
        </span>
      </div>
    ));
  };

  return (
    <div>
      <span className="flex items-center">
        <label className="px-5 text-xl">+</label>
        <input
          autoFocus
          type="text"
          className="h-8 my-1 border-none hover:border-none hover:outline-none focus:outline-none rounded"
          placeholder="New Checklist Item"
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
          onKeyDown={(e) => (e.key == 'Enter' ? handleSubmit() : null)}
        />
      </span>
      {Item.map((item) => {
        return (
          <div key={item.id}>
            <div className="group flex items-center px-5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 py-0.5">
              <span className="text-gray-200 justify-center cursor-move opacity-0 group-hover:opacity-100">
                <GrDrag className="text-base text-gray-200 opacity-30 w-4 h-4" />
              </span>
              <input
                type="checkbox"
                checked={item.is_done == 0 ? false : true}
                className="rounded-lg mx-3"
                onChange={() => {
                  setItemId(item.id);
                  isDone(item.id, item.is_done, item.name);
                }}
              />
              <div
                ref={inputRef}
                suppressContentEditableWarning={true}
                contentEditable={true}
                onKeyDown={(e) => (e.key === 'Enter' ? handleEditItemName(item.id, item.is_done) : null)}
                className="cursor-text"
              >
                {item.name}
              </div>
              {item.assignees.length ? (
                <span
                  className="flex mx-4 cursor-pointer"
                  onClick={() => {
                    dispatch(setToggleAssignChecklistItemId(item.id));
                    dispatch(setClickChecklistId(checklistId));
                    dispatch(setClickChecklistItemId(item.id));
                  }}
                >
                  {groupAssignee(item.assignees)}
                </span>
              ) : (
                <span className="mx-4 cursor-pointer">
                  <ToolTip tooltip="Assign Team member">
                    <CgProfile
                      onClick={() => {
                        dispatch(setToggleAssignChecklistItemId(item.id));
                        dispatch(setClickChecklistId(checklistId));
                        dispatch(setClickChecklistItemId(item.id));
                      }}
                    />
                  </ToolTip>
                </span>
              )}

              <div className="opacity-0 group-hover:opacity-100">
                <ChecklistModal
                  options={lessOptions}
                  checklistId={checklistId}
                  checklistItemId={item.id}
                  focus={focusItem}
                />
              </div>
              {toggleAssignChecklistItemId == item.id ? (
                <span className="absolute shadow-2xl z-30 ml-20 mt-10">
                  <AssignTask option={'checklstItem'} item={item} />
                </span>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChecklistItem;