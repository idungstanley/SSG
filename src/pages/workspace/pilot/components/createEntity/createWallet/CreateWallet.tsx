import React, { useState } from 'react';
import { Button, Checkbox, Input } from '../../../../../../components';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import {
  getHub,
  setEntityToCreate,
  setSubDropdownMenu,
  setshowMenuDropdown
} from '../../../../../../features/hubs/hubSlice';
import { createWalletService } from '../../../../../../features/wallet/walletService';
import {
  setCreateEntityType,
  setCreateWlLink,
  setShowOverlay
} from '../../../../../../features/workspace/workspaceSlice';
import { EntityType } from '../../../../../../utils/EntityTypes/EntityType';
import ArrowDown from '../../../../../../assets/icons/ArrowDown';
import Wand from '../../../../../../assets/icons/Wand';
import Assignee from '../../../../tasks/assignTask/Assignee';
import { ListColourProps } from '../../../../../../components/tasks/ListItem';
import { createWalletManager } from '../../../../../../managers/Wallet';
import { setFilteredResults } from '../../../../../../features/search/searchSlice';
import { ErrorHasDescendant } from '../../../../../../types';
import { toast } from 'react-hot-toast';
import Toast from '../../../../../../common/Toast';
import AlsoitMenuDropdown from '../../../../../../components/DropDowns';
import ColorPalette from '../../../../../../components/ColorPalette/component/ColorPalette';

export default function CreateWallet() {
  const dispatch = useAppDispatch();
  const { createWLID, selectedTreeDetails, hub } = useAppSelector((state) => state.hub);

  const [paletteColor, setPaletteColor] = useState<string | ListColourProps | undefined | null>('');
  const [showPalette, setShowPalette] = useState<null | HTMLDivElement>(null);

  const { type, id } = selectedTreeDetails;

  const createWallet = useMutation(createWalletService, {
    onSuccess: (data) => {
      dispatch(setCreateEntityType(null));
      dispatch(setSubDropdownMenu(false));
      dispatch(setShowOverlay(false));
      dispatch(setshowMenuDropdown({ showMenuDropdown: null, showMenuDropdownType: null }));
      dispatch(setCreateWlLink(false));
      dispatch(setCreateEntityType(null));
      dispatch(setEntityToCreate(null));
      const wallet = data.data.wallet;
      const updatedTree = createWalletManager(type as string, hub, wallet);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });
  const defaultWalletFormState = {
    name: ''
  };

  const onClose = () => {
    dispatch(setCreateEntityType(null));
    dispatch(setEntityToCreate(null));
    dispatch(setShowOverlay(false));
  };
  const [formState, setFormState] = useState(defaultWalletFormState);

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handlePaletteColor = (value: string | ListColourProps | undefined | null) => {
    setPaletteColor(value);
  };
  const handleShowPalette = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowPalette((e as React.MouseEvent<HTMLDivElement, MouseEvent>).currentTarget);
  };

  const handleClosePalette = () => {
    setShowPalette(null);
  };

  const { name } = formState;
  const onSubmit = async () => {
    try {
      await createWallet.mutateAsync({
        name,
        color: paletteColor as string,
        hubID: (createWLID ? createWLID : null) || type === EntityType.hub ? id : null,
        walletId: type === EntityType.wallet ? id : null
      });
    } catch (error) {
      const errorResponse = error as ErrorHasDescendant;
      const isHasDescendant = errorResponse.data.data?.has_descendants;
      if (isHasDescendant) {
        toast.custom((t) => (
          <Toast type="error" title="Error Creating Entity" body="Parent Entity has a descendant" toastId={t.id} />
        ));
      }
    }
  };
  return (
    <div className="h-auto p-2 overflow-y-auto bg-white" style={{ maxHeight: '420px' }}>
      <div className="flex flex-col mb-2">
        <span className="font-bold">Create A Wallet</span>
        <span className="font-medium">Allows you manage all entities within the workspace</span>
      </div>
      <div className="flex flex-col p-4 space-y-2 border rounded border-alsoit-gray-200 bg-alsoit-gray-50">
        <div className="relative flex">
          <Input placeholder="Wallet Name" name="name" value={name} type="text" onChange={handleWalletChange} />
          <div
            className="absolute flex items-center cursor-pointer right-2 top-3"
            onClick={(e) => handleShowPalette(e)}
          >
            <Wand />
          </div>
        </div>
        <div className="flex items-center justify-between w-full h-10 p-1 bg-white border rounded">
          <span>Manage this Wallet with other application</span>
          <ArrowDown />
        </div>
        <div className="flex items-center justify-between w-full h-10 p-1 bg-white border rounded">
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
        <AlsoitMenuDropdown handleClose={handleClosePalette} anchorEl={showPalette}>
          <ColorPalette handleClick={handlePaletteColor} />
        </AlsoitMenuDropdown>
      </div>
      <div className="flex justify-between pt-2 space-x-3">
        <Button buttonStyle="white" onClick={onClose} loading={false} label="Cancel" width={20} height="h-7" />
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="Create Wallet"
          padding="py-2 px-2"
          height="h-7"
          width="w-fit"
        />
      </div>
    </div>
  );
}
