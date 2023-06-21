import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  UseCreatelistItemService,
  UseUpdateChecklistItemService
} from '../../../../features/task/checklist/checklistService';
import ChecklistModal from './ChecklistModal';
import { lessOptions } from './ModalOptions';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  setClickChecklistId,
  setClickChecklistItemId,
  setToggleAssignChecklistItemId,
  setTriggerItemtUpdate
} from '../../../../features/task/checklist/checklistSlice';
import { setCurrentTaskIdForTag } from '../../../../features/workspace/tags/tagSlice';
import { ICheckListItems } from '../../../../features/task/interface.tasks';
import Assignee from '../../../../pages/workspace/tasks/assignTask/Assignee';
import TaskTag from '../../../../pages/workspace/tasks/component/taskData/taskTag';
import { ManageTagsDropdown } from '../../../Tag/ui/ManageTagsDropdown/ui/ManageTagsDropdown';

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
  const [editName, setEditName] = useState<string | undefined>('');

  const { triggerItemUpdate, showChecklistItemInput, clickedChecklistId } = useAppSelector((state) => state.checklist);

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
    setEditName(inputRef.current?.innerText);
    setItemId(id);
    setDone(done);
    dispatch(setTriggerItemtUpdate(true));
  };

  const focusItem = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      {showChecklistItemInput && clickedChecklistId === checklistId && (
        <span className="flex items-center">
          <label className="mr-2 text-xl">+</label>
          <input
            autoFocus
            type="text"
            className="h-8 my-1 border-none hover:border-none hover:outline-none focus:outline-none rounded w-full"
            placeholder="Add New Checklist Item"
            onChange={(e) => setNewItem(e.target.value)}
            value={newItem}
            onKeyDown={(e) => (e.key == 'Enter' ? handleSubmit() : null)}
          />
        </span>
      )}

      {Item.map((item) => {
        return (
          <div key={item.id} className="bg-white p-1 mb-0.5">
            <div className="group flex items-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 py-0.5 h-auto">
              <input
                type="checkbox"
                checked={item.is_done == 0 ? false : true}
                className="rounded-lg mx-3 text-green-500 border-green-800"
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
              <div
                onClick={() => {
                  dispatch(setToggleAssignChecklistItemId(item.id));
                  dispatch(setClickChecklistId(checklistId));
                  dispatch(setClickChecklistItemId(item.id));
                }}
              >
                <Assignee itemId={item.id} option="checklist" assigneeChecklistItem={item} />
              </div>

              {item.tags.length > 0 && (
                <div className="mr-4">
                  <TaskTag taskColField={item.tags} entity_type="checklist_item" entity_id={item.id} />
                </div>
              )}

              <span onClick={() => dispatch(setCurrentTaskIdForTag(item.id))}>
                <ManageTagsDropdown tagsArr={item.tags} entityId={item.id} entityType="checklist_item" />
              </span>
              <div className="mx-1">
                <ChecklistModal
                  options={lessOptions}
                  checklistId={checklistId}
                  checklistItemId={item.id}
                  focus={focusItem}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChecklistItem;
