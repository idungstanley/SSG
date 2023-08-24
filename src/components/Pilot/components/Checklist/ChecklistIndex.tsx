import React, { useState } from 'react';
import { UseCreateChecklistService, UseGetAllClistService } from '../../../../features/task/checklist/checklistService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowChecklistInput } from '../../../../features/task/checklist/checklistSlice';
import { MdCancel } from 'react-icons/md';
import Disclosures from './Disclosure';
import { VscChecklist } from 'react-icons/vsc';
import { UseGetHubDetails } from '../../../../features/hubs/hubService';
import { UseGetWalletDetails } from '../../../../features/wallet/walletService';
import { UseGetListDetails } from '../../../../features/list/listService';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';

export default function ChecklistIndex() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const [checklistName, setChecklistName] = useState<string>('Checklist');

  //Create Checklist
  const createChecklist = useMutation(UseCreateChecklistService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setShowChecklistInput(false));
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
  const { data: checkListData } = UseGetAllClistService({
    task_id: activeItemId,
    activeItemType: activeItemType
  });

  const { data: hub } = UseGetHubDetails({
    activeItemId,
    activeItemType
  });
  const { data: wallet } = UseGetWalletDetails({
    activeItemId,
    activeItemType
  });
  const { data: list } = UseGetListDetails(activeItemId);

  const { showChecklistInput } = useAppSelector((state) => state.checklist);

  return (
    <div className="p">
      <div className="border-2 flex items-center text-center py-1 bg-white">
        <VscChecklist className="w-4 h-4 ml-2" />
        <h1 className="text-base-xl mx-4">Checklists</h1>
        <button
          className="p-0.5 border-blue-400 border-solid border-2 rounded-lg text-xs"
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
      {activeItemType === EntityType.task && (
        <div>
          <Disclosures item={checkListData?.data.task.checklists} />
        </div>
      )}
      {activeItemType === EntityType.hub && (
        <div>
          <Disclosures item={hub?.data.hub.checklists} />
        </div>
      )}
      {activeItemType === EntityType.wallet && (
        <div>
          <Disclosures item={wallet?.data.wallet.checklists} />
        </div>
      )}
      {activeItemType === EntityType.list && (
        <div>
          <Disclosures item={list?.data.list.checklists} />
        </div>
      )}
    </div>
  );
}
