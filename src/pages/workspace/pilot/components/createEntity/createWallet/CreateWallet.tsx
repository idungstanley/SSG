import React, { useState } from 'react';
import { Button, Input } from '../../../../../../components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setSubDropdownMenu, setshowMenuDropdown } from '../../../../../../features/hubs/hubSlice';
import { createWalletService } from '../../../../../../features/wallet/walletService';
import { setCreateEntityType, setCreateWlLink } from '../../../../../../features/workspace/workspaceSlice';
import { EntityType } from '../../../../../../utils/EntityTypes/EntityType';

export default function CreateWallet() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { createWLID, selectedTreeDetails } = useAppSelector((state) => state.hub);
  const { type, id } = selectedTreeDetails;
  const createWallet = useMutation(createWalletService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setCreateEntityType(null));
      dispatch(setSubDropdownMenu(false));
      dispatch(setshowMenuDropdown({ showMenuDropdown: null, showMenuDropdownType: null }));
      dispatch(setCreateWlLink(false));
    }
  });

  const defaultWalletFormState = {
    name: ''
  };

  const onClose = () => {
    dispatch(setCreateEntityType(null));
  };
  const [formState, setFormState] = useState(defaultWalletFormState);

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const { name } = formState;
  const onSubmit = async () => {
    await createWallet.mutateAsync({
      name,
      hubID: (createWLID ? createWLID : null) || type === EntityType.hub ? id : null,
      walletId: type === EntityType.wallet ? id : null
    });
  };
  return (
    <div className="p-2">
      <Input
        label="Enter New Wallet Name:"
        placeholder="Enter Wallet Name"
        name="name"
        value={name}
        type="text"
        onChange={handleWalletChange}
      />
      <div className="flex justify-between pt-2 space-x-3">
        <Button buttonStyle="white" onClick={onClose} loading={false} label="Close" width={20} />
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="Create Wallet"
          padding="py-2 px-4"
          height="h-10"
          width="w-20"
        />
      </div>
    </div>
  );
}
