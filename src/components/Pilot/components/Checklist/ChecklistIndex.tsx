import React, { useState } from 'react';
import { UseCreateChecklistService } from '../../../../features/task/checklist/checklistService';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setCreateNewChecklist, setShowChecklistInput } from '../../../../features/task/checklist/checklistSlice';
import { MdCancel } from 'react-icons/md';
import Disclosures from './Disclosure';
import { UseGetHubDetails } from '../../../../features/hubs/hubService';
import { UseGetWalletDetails } from '../../../../features/wallet/walletService';
import { UseGetListDetails } from '../../../../features/list/listService';
// import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import { getOneTaskServices } from '../../../../features/task/taskService';
import { useParams } from 'react-router-dom';

export default function ChecklistIndex() {
  const dispatch = useAppDispatch();
  const { hubId, walletId, listId, taskId } = useParams();

  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const [checklistName, setChecklistName] = useState<string>('Checklist');

  //Create Checklist
  const createChecklist = useMutation(UseCreateChecklistService, {
    onSuccess: (data) => {
      dispatch(setShowChecklistInput(false));
      dispatch(setCreateNewChecklist(data.data.checklist));
    }
  });

  const handleSubmit = async (name: string) => {
    await createChecklist.mutateAsync({
      item_id: activeItemId,
      name,
      type: activeItemType
    });
  };

  // Get Checklists
  getOneTaskServices({
    task_id: taskId
  });

  UseGetHubDetails({
    activeItemId: hubId,
    activeItemType
  });
  UseGetWalletDetails({
    activeItemId: walletId,
    activeItemType
  });
  UseGetListDetails(listId);

  const { showChecklistInput, checklists } = useAppSelector((state) => state.checklist);

  return (
    <div className="p">
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
      <Disclosures item={checklists} />
    </div>
  );
}
