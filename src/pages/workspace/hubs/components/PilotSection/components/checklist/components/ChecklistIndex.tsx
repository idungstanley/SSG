import React, { useState } from 'react';
import { useAppSelector } from '../../../../../../../../app/hooks';
import {
  UseCreateClistService
  UseDeleteChecklistItemService,
  UseGetAllClistService
} from '../../../../../../../../features/task/checklist/checklistService';
import { Spinner } from '../../../../../../../../common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoPlus } from 'react-icons/go';
import SingleChecklist from '../SingleChecklist';
import { itemProps } from './ChecklistItem';
import { useAppDispatch } from '../../../../../../../../app/hooks';
import { setShowChecklistInput } from '../../../../../../../../features/task/checklist/checklistSlice';
import { MdCancel } from 'react-icons/md';
import ToolTip from '../../../../../../../../components/Tooltip';

export default function ChecklistIndex() {
  const [checklistName, setChecklistName] = useState<string>('Checklist');

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showChecklistInput } = useAppSelector((state) => state.checklist);

  //Create Checklist
  const createChecklist = useMutation(UseCreateClistService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setShowChecklistInput(false));
    }
  });

  const handleSubmit = async (name: string) => {
    await createChecklist.mutateAsync({
      task_id: activeItemId,
      name
    });
  };

  // Get Checklists
  const { data, status } = UseGetAllClistService({
    task_id: activeItemId,
    activeItemType: activeItemType
  });
  const task_checklist = data?.data.task.checklists;

  UseDeleteChecklistItemService({
  query: clickedChecklistId,
  delChecklist: triggerDelChecklist
  });

  if (status == 'loading') {
    <Spinner size={20} color={'blue'} />;
  }

  return status == 'success' ? (
    <div className="p-1">
      <div className="border-2 flex justify-between items-center text-center py-2">
        <h1 className="text-xl ml-8">Checklists</h1>
        <div
          className="rounded-full text-xl cursor-pointer hover:bg-gray-300 mx-3 p-1"
          onClick={() => dispatch(setShowChecklistInput(true))}
        >
          <ToolTip tooltip="Add Checklist">
            <GoPlus className="w-3 h-3" />
          </ToolTip>
        </div>
      </div>
      {showChecklistInput && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(checklistName);
          }}
          className="flex items-center justify-center"
        >
          <input
            autoFocus={true}
            type="text"
            value={checklistName}
            onChange={(e) => setChecklistName(e.target.value)}
            className="h-8 mx-5 w-2/3 rounded"
          />
          <MdCancel className="w-4 h-4 cursor-pointer" onClick={() => dispatch(setShowChecklistInput(false))} />
        </form>
      )}
      <div>
        {task_checklist?.length > 0
          ? task_checklist?.map((item: { id: string; name: string; is_done: number; items: itemProps[] }) => {
              return <SingleChecklist key={item.id} item={item} id={item.id} />;
            })
          : 'This task has no Checklist, click on the plus sign to create one'}
      </div>
    </div>
  ) : null;
}
