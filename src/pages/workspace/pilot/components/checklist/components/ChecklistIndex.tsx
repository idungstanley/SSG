import React, { useState } from 'react';
import {
  UseCreateClistService,
  UseGetAllClistService
} from '../../../../../../features/task/checklist/checklistService';
import { Spinner } from '../../../../../../common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import SingleChecklist from '../SingleChecklist';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setShowChecklistInput } from '../../../../../../features/task/checklist/checklistSlice';
import { MdCancel } from 'react-icons/md';
import Disclosures from './Disclosure';
import { VscChecklist } from 'react-icons/vsc';

export default function ChecklistIndex() {
  const [checklistName, setChecklistName] = useState<string>('Checklist');

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
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
  const { data: checkListData, status } = UseGetAllClistService({
    task_id: activeItemId,
    activeItemType: activeItemType
  });

  // UseDeleteChecklistService({
  //   query: clickedChecklistId,
  //   delChecklist: triggerDelChecklist,
  // });

  if (status == 'loading') {
    <Spinner size={20} color={'blue'} />;
  }

  return status == 'success' ? (
    <div className="p-1">
      <div className="border-2 flex items-center text-center py-2 bg-white">
        <VscChecklist className="w-6 h-6 ml-2" />
        <h1 className="text-xl mx-6">Checklists</h1>
        <button
          className="p-0.5 border-blue-400 border-solid border-2 rounded-lg"
          onClick={() => dispatch(setShowChecklistInput(true))}
        >
          ADD
        </button>
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
        {checkListData?.data.task.checklists.length > 0
          ? checkListData?.data.task.checklists.map((item) => {
              return (
                <>
                  {/* <SingleChecklist key={item.id} item={item} id={item.id} /> */}
                  <Disclosures item={item} />
                </>
              );
            })
          : 'This task has no Checklist, click on the plus sign to create one'}
      </div>
    </div>
  ) : null;
}
