import React, { useState } from 'react';
import { Button, Input } from '../../../../../../components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setCreateWalletSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import { setSubDropdownMenu, setshowMenuDropdown } from '../../../../../../features/hubs/hubSlice';
import { createWalletService } from '../../../../../../features/wallet/walletService';
import { setCreateWlLink } from '../../../../../../features/workspace/workspaceSlice';

export default function CreateWallet() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { showMenuDropdownType, showMenuDropdown, SubMenuId, SubMenuType, createWLID } = useAppSelector(
    (state) => state.hub
  );
  const createWallet = useMutation(createWalletService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setCreateWalletSlideOverVisibility(false));
      dispatch(setSubDropdownMenu(false));
      dispatch(setshowMenuDropdown({ showMenuDropdown: null, showMenuDropdownType: null }));
      dispatch(setCreateWlLink(false));
    }
  });

  const defaultWalletFormState = {
    name: ''
  };

  const [formState, setFormState] = useState(defaultWalletFormState);

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const { name } = formState;
  const onSubmit = async () => {
    await createWallet.mutateAsync({
      name,
      hubID:
        (createWLID ? createWLID : null) ||
        (showMenuDropdownType == 'hubs' ? showMenuDropdown : null) ||
        (showMenuDropdownType == 'subhub' ? showMenuDropdown : null) ||
        (SubMenuType == 'hubs' ? SubMenuId : null) ||
        (SubMenuType == 'subhub' ? SubMenuId : null),
      walletId:
        (showMenuDropdownType == 'wallet' && !createWLID ? showMenuDropdown : null) ||
        (showMenuDropdownType == 'subwallet2' ? showMenuDropdown : null) ||
        (SubMenuType == 'wallet' ? SubMenuId : null) ||
        (SubMenuType == 'subwallet2' ? SubMenuId : null)
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
      <div className="flex justify-end space-x-3 pt-2">
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
