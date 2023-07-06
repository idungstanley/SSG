import React, { useState } from 'react';
import { Button, Checkbox, Input } from '../../../../../../components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setCreateListSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import { setEntityToCreate, setSubDropdownMenu, setshowMenuDropdown } from '../../../../../../features/hubs/hubSlice';
import {
  setCreateEntityType,
  setCreateWlLink,
  setShowOverlay
} from '../../../../../../features/workspace/workspaceSlice';
import { createListService } from '../../../../../../features/list/listService';
import { EntityType } from '../../../../../../utils/EntityTypes/EntityType';
import Palette from '../../../../../../components/ColorPalette';
import Assignee from '../../../../tasks/assignTask/Assignee';
import ArrowDown from '../../../../../../assets/icons/ArrowDown';
import Wand from '../../../../../../assets/icons/Wand';
import { ListColourProps } from '../../../../../../components/tasks/ListItem';

export default function CreateList() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  // const { currentItemId } = useAppSelector((state) => state.workspace);
  const { selectedTreeDetails, createWLID } = useAppSelector((state) => state.hub);
  const [paletteColor, setPaletteColor] = useState<string | ListColourProps | undefined>('');
  const [showPalette, setShowPalette] = useState<boolean>(false);
  const { type, id } = selectedTreeDetails;
  const { createWlLink } = useAppSelector((state) => state.workspace);

  const createList = useMutation(createListService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setCreateListSlideOverVisibility(false));
      dispatch(setShowOverlay(false));
      dispatch(setSubDropdownMenu(false));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null,
          showMenuDropdownType: null
        })
      );
      dispatch(setCreateWlLink(false));
      dispatch(setCreateEntityType(null));
      dispatch(setEntityToCreate(null));
    }
  });

  const defaultListFormState = {
    name: ''
  };
  const onClose = () => {
    dispatch(setShowOverlay(false));
    dispatch(setCreateEntityType(null));
    dispatch(setEntityToCreate(null));
  };

  const [formState, setFormState] = useState(defaultListFormState);

  const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleShowPalette = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowPalette((prev) => !prev);
  };
  const jsonColorString = JSON.stringify({ outerColour: paletteColor as string, innerColour: undefined });
  const { name } = formState;
  const onSubmit = async () => {
    await createList.mutateAsync({
      listName: name,
      color: jsonColorString,
      hubId: (createWlLink ? createWLID : null) || type === EntityType.hub ? id : null,
      walletId: type === EntityType.wallet ? id : null
    });
  };

  return (
    <div className="h-auto p-2 overflow-y-auto" style={{ maxHeight: '420px' }}>
      <div className="flex flex-col mb-2">
        <span className="font-bold">Create A List</span>
        <span className="font-medium">Allows you manage all entities within the workspace</span>
      </div>
      <div className="flex flex-col p-4 space-y-2 border border-gray-200 rounded bg-alsoit-gray-bg">
        <div className="relative flex">
          <Input placeholder="List Name" name="name" value={name} type="text" onChange={handleListChange} />
          <div
            className="absolute flex items-center cursor-pointer right-2 top-3"
            onClick={(e) => handleShowPalette(e)}
          >
            <Wand />
          </div>
        </div>
        <div className="flex items-center justify-between w-full h-10 p-1 bg-white border rounded">
          <span>Manage this List with other application</span>
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
            description="Host other entities list wallets and lists"
            height="5"
            width="5"
          />
          <Checkbox
            checked={false}
            onChange={() => ({})}
            description="Ability for all team members to create task"
            height="5"
            width="5"
          />
          <Checkbox checked={false} onChange={() => ({})} description="Show list to everyone" height="5" width="5" />
        </div>
        <div className="relative mt-32 ml-24">
          {showPalette ? <Palette title="List Colour" setPaletteColor={setPaletteColor} /> : null}
        </div>
      </div>
      <div className="flex justify-between pt-2 space-x-3">
        <Button buttonStyle="white" onClick={onClose} loading={false} label="Close" width={20} height="h-7" />
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="Create List"
          padding="py-2 px-2"
          height="h-7"
          width="w-24"
        />
      </div>
    </div>
  );
}
