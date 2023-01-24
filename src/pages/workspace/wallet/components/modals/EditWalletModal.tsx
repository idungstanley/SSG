import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseEditWalletService } from '../../../../../features/wallet/walletService';
import { Button, Input, SlideOver } from '../../../../../components';
import { useAppSelector } from '../../../../../app/hooks';
import { setEditWalletSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';
import {
  setSubDropdownMenu,
  setshowMenuDropdown,
} from '../../../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';

function EditWalletModal() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { showMenuDropdownType, showMenuDropdown } = useAppSelector(
    (state) => state.hub
  );
  const { showEditWalletSlideOver } = useAppSelector(
    (state) => state.slideOver
  );
  const editWallet = useMutation(UseEditWalletService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setEditWalletSlideOverVisibility(false));
      dispatch(setSubDropdownMenu(false));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null,
        })
      );
    },
  });

  const defaultWalletFormState = {
    name: '',
  };

  const [formState, setFormState] = useState(defaultWalletFormState);

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const { name } = formState;

  const onSubmit = async () => {
    await editWallet.mutateAsync({
      walletName: name,
      WalletId: showMenuDropdown,
    });
  };

  const handleCloseSlider = () => {
    dispatch(setEditWalletSlideOverVisibility(false));
    dispatch(setSubDropdownMenu(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null,
      })
    );
  };
  return (
    <SlideOver
      show={showEditWalletSlideOver}
      onClose={() => handleCloseSlider()}
      headerTitle={
        showMenuDropdownType === 'wallet' ? ' Edit wallet' : 'Edit subwallet'
      }
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label={
                showMenuDropdownType === 'wallet'
                  ? 'Wallet Name:'
                  : 'Subwallet Name:'
              }
              placeholder={
                showMenuDropdownType === 'wallet'
                  ? 'Enter wallet Name'
                  : 'Enter Subwallet Name'
              }
              name="name"
              value={name}
              type="text"
              onChange={handleWalletChange}
            />
          </div>
        </div>
      }
      footerButtons={
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label={
            showMenuDropdownType === 'wallet' ? 'Edit Wallet' : 'Edit Subwallet'
          }
          padding="py-2 px-4"
          height="h-10"
          width="w-40"
        />
      }
    />
  );
}

export default EditWalletModal;
