import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UseEditWalletService } from '../../../../../features/wallet/walletService';
import { Button, Input, SlideOver } from '../../../../../components';
import { useAppSelector } from '../../../../../app/hooks';
import { setEditWalletSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';
import { getHub, setSubDropdownMenu, setshowMenuDropdown } from '../../../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import { changeWalletManager } from '../../../../../managers/Wallet';
import { setFilteredResults } from '../../../../../features/search/searchSlice';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';

function EditWalletModal() {
  const dispatch = useDispatch();

  const { showMenuDropdownType, showMenuDropdown, prevName, hub } = useAppSelector((state) => state.hub);
  const { showEditWalletSlideOver } = useAppSelector((state) => state.slideOver);

  const editWallet = useMutation(UseEditWalletService, {
    onSuccess: (data) => {
      dispatch(setEditWalletSlideOverVisibility(false));
      dispatch(setSubDropdownMenu(false));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null
        })
      );
      const wallet = data.data.wallet;
      const updatedTree = changeWalletManager(wallet.id as string, hub, wallet);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });

  const defaultWalletFormState = {
    name: prevName
  };

  const [formState, setFormState] = useState(defaultWalletFormState);

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const { name } = formState;

  const onSubmit = async () => {
    await editWallet.mutateAsync({
      walletName: name,
      walletId: showMenuDropdown
    });
  };

  const handleCloseSlider = () => {
    dispatch(setEditWalletSlideOverVisibility(false));
    dispatch(setSubDropdownMenu(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null
      })
    );
  };
  return (
    <SlideOver
      show={showEditWalletSlideOver}
      onClose={() => handleCloseSlider()}
      headerTitle={showMenuDropdownType === EntityType.wallet ? ' Edit wallet' : 'Edit subwallet'}
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label={showMenuDropdownType === EntityType.wallet ? 'Wallet Name:' : 'Subwallet Name:'}
              placeholder={showMenuDropdownType === EntityType.wallet ? 'Enter wallet Name' : 'Enter Subwallet Name'}
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
          label={showMenuDropdownType === EntityType.wallet ? 'Edit Wallet' : 'Edit Subwallet'}
          padding="py-2 px-4"
          height="h-10"
          width="w-40"
        />
      }
    />
  );
}

export default EditWalletModal;
