import React, { useState } from 'react';
import { Button, Checkbox, Input } from '../../../../../../components';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { createHubService, useGetHubChildren } from '../../../../../../features/hubs/hubService';
import {
  getCurrHubId,
  getHub,
  getSubMenu,
  setEntityToCreate,
  setSubDropdownMenu,
  setshowMenuDropdown
} from '../../../../../../features/hubs/hubSlice';
import { setCreateEntityType, setShowOverlay } from '../../../../../../features/workspace/workspaceSlice';
import { EntityType } from '../../../../../../utils/EntityTypes/EntityType';
import Assignee from '../../../../tasks/assignTask/Assignee';
import Wand from '../../../../../../assets/icons/Wand';
import ArrowDown from '../../../../../../assets/icons/ArrowDown';
import Palette from '../../../../../../components/ColorPalette';
import { ListColourProps } from '../../../../../../components/tasks/ListItem';
import { displayPrompt, setVisibility } from '../../../../../../features/general/prompt/promptSlice';
import { createHubManager } from '../../../../../../managers/Hub';
import { setFilteredResults } from '../../../../../../features/search/searchSlice';

interface formProps {
  name: string;
  color: string | undefined;
}

export default function CreateHub() {
  const dispatch = useAppDispatch();

  const { selectedTreeDetails, currHubId, hub } = useAppSelector((state) => state.hub);

  const [paletteColor, setPaletteColor] = useState<string | ListColourProps | undefined>('');
  const [showPalette, setShowPalette] = useState<boolean>(false);

  const { type, id } = selectedTreeDetails;
  const createHub = useMutation(createHubService, {
    onSuccess: (data) => {
      dispatch(setCreateEntityType(null));
      dispatch(setSubDropdownMenu(false));
      dispatch(setShowOverlay(false));
      dispatch(
        getSubMenu({
          SubMenuId: null
        })
      );
      dispatch(getCurrHubId(null));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null
        })
      );
      dispatch(setVisibility(false));
      dispatch(setCreateEntityType(null));
      dispatch(setEntityToCreate(null));
      setFormState(defaultHubFormState);
      const hubFromResponse = data.data.hub;
      const updatedTree = createHubManager(hub, hubFromResponse);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });

  const defaultHubFormState = {
    name: '',
    color: ''
  };

  const [formState, setFormState] = useState<formProps>(defaultHubFormState);

  const handleHubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  const onClose = () => {
    dispatch(setCreateEntityType(null));
    dispatch(setShowOverlay(false));
    dispatch(setEntityToCreate(null));
  };

  const handleShowPalette = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowPalette((prev) => !prev);
  };

  const currentWorkspaceId: string | undefined = JSON.parse(
    localStorage.getItem('currentWorkspaceId') || '"'
  ) as string;
  const { data } = useGetHubChildren({
    query: type === EntityType.hub ? id : currHubId
  });

  const isCreateAllowed = !!data && (data?.data.wallets?.length > 0 || data?.data?.lists?.length > 0);
  const { name } = formState;

  const onSubmit = async () => {
    try {
      await createHub.mutateAsync({
        name,
        color: paletteColor as string,
        currentWorkspaceId,
        currHubId: type === EntityType.hub ? id : null
      });
    } catch {
      if (isCreateAllowed) {
        dispatch(
          displayPrompt('Create Subhub', 'Would move all entities in Hub to Subhub. Do you want to proceed?', [
            {
              label: 'Create Subhub',
              style: 'danger',
              callback: async () => {
                await createHub.mutateAsync({
                  name,
                  currentWorkspaceId,
                  currHubId: id,
                  confirmAction: 1
                });
              }
            },
            {
              label: 'Cancel',
              style: 'plain',
              callback: () => {
                dispatch(setVisibility(false));
              }
            }
          ])
        );
      }
    }
  };
  return (
    <div className="w-full h-auto p-2 overflow-y-auto" style={{ maxHeight: '420px' }}>
      <div className="flex flex-col mb-2">
        <span className="font-bold">Create A Hub</span>
        <span className="font-medium">Allows you manage all entities within the workspace</span>
      </div>
      <div className="flex flex-col p-4 space-y-2 border border-gray-200 rounded bg-alsoit-gray-50">
        <div className="relative flex">
          <Input placeholder="Hub Name" name="name" value={name} type="text" onChange={handleHubChange} />
          <div
            className="absolute flex items-center cursor-pointer right-2 top-3"
            onClick={(e) => handleShowPalette(e)}
          >
            <Wand />
          </div>
        </div>
        <div className="flex items-center justify-between w-full h-10 p-1 bg-white border rounded">
          <span>Manage this Hub with other application</span>
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
          <Checkbox checked={false} onChange={() => ({})} description="Host other entities" height="5" width="5" />
          <Checkbox checked={false} onChange={() => ({})} description="Host other entities" height="5" width="5" />
        </div>
        <div className="relative mt-32 ml-24">
          {showPalette ? <Palette title="Hub Colour" setPaletteColor={setPaletteColor} /> : null}
        </div>
      </div>
      <div className="flex justify-between pt-2 space-x-3">
        <Button buttonStyle="white" onClick={onClose} loading={false} label="Cancel" width={20} height="h-7" />
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="Create Hub"
          padding="py-2 px-2"
          height="h-7"
          width="w-28"
        />
      </div>
    </div>
  );
}
