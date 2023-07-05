import React, { useState } from 'react';
import { Button, Checkbox, Input } from '../../../../../../components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setSubDropdownMenu, setshowMenuDropdown } from '../../../../../../features/hubs/hubSlice';
import { createWalletService } from '../../../../../../features/wallet/walletService';
import { setCreateEntityType, setCreateWlLink } from '../../../../../../features/workspace/workspaceSlice';
import { EntityType } from '../../../../../../utils/EntityTypes/EntityType';
import ArrowDown from '../../../../../../assets/icons/ArrowDown';
import Wand from '../../../../../../assets/icons/Wand';
import Assignee from '../../../../tasks/assignTask/Assignee';
import Palette from '../../../../../../components/ColorPalette';
import { ListColourProps } from '../../../../../../components/tasks/ListItem';

export default function CreateWallet() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { createWLID, selectedTreeDetails } = useAppSelector((state) => state.hub);
  const [paletteColor, setPaletteColor] = useState<string | ListColourProps | undefined>('');
  const [showPalette, setShowPalette] = useState<boolean>(false);
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
  const handleShowPalette = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowPalette((prev) => !prev);
  };

  const { name } = formState;
  const onSubmit = async () => {
    await createWallet.mutateAsync({
      name,
      color: paletteColor as string,
      hubID: (createWLID ? createWLID : null) || type === EntityType.hub ? id : null,
      walletId: type === EntityType.wallet ? id : null
    });
  };
  return (
    <div className="p-2 overflow-y-auto h-auto" style={{ maxHeight: '420px' }}>
      <div className="flex flex-col mb-2">
        <span className="font-bold">Create A Wallet</span>
        <span className="font-medium">Allows you manage all entities within the workspace</span>
      </div>
      <div className="flex flex-col border border-gray-200 bg-alsoit-gray-bg p-4 rounded space-y-2">
        <div className="flex relative">
          <Input placeholder="Wallet Name" name="name" value={name} type="text" onChange={handleWalletChange} />
          <div
            className="absolute cursor-pointer flex items-center right-2 top-3"
            onClick={(e) => handleShowPalette(e)}
          >
            <Wand />
          </div>
        </div>
        <div className="flex h-10 p-1 w-full border bg-white rounded justify-between items-center">
          <span>Manage this Wallet with other application</span>
          <ArrowDown />
        </div>
        <div className="flex h-10 p-1 w-full border bg-white rounded justify-between items-center">
          <span>Share with public</span>
          <Assignee option="share" />
        </div>
        <div className="flex flex-col space-y-2">
          <span className="font-bold">Entity Description</span>
          <Checkbox
            checked={true}
            onChange={() => ({})}
            description="Host other entities list sub wallets and lists"
            height="5"
            width="5"
          />
          <Checkbox checked={false} onChange={() => ({})} description="Host other entities" height="5" width="5" />
          <Checkbox checked={false} onChange={() => ({})} description="Host other entities" height="5" width="5" />
        </div>
        <div className="relative ml-24 mt-32">
          {showPalette ? <Palette title="Wallet Colour" setPaletteColor={setPaletteColor} /> : null}
        </div>
      </div>
      <div className="flex justify-between pt-2 space-x-3">
        <Button buttonStyle="white" onClick={onClose} loading={false} label="Close" width={20} height="h-7" />
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="Create Wallet"
          padding="py-2 px-2"
          height="h-7"
          width="w-28"
        />
      </div>
    </div>
  );
}
