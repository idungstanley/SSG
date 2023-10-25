import React, { useState } from 'react';
import { Button, Input } from '../../../../../../components';
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
import {
  setActiveItem,
  setCreateEntityType,
  setShowOverlay
} from '../../../../../../features/workspace/workspaceSlice';
import { EntityType } from '../../../../../../utils/EntityTypes/EntityType';
import Wand from '../../../../../../assets/icons/Wand';
import { ListColourProps } from '../../../../../../components/tasks/ListItem';
import { displayPrompt, setVisibility } from '../../../../../../features/general/prompt/promptSlice';
import { createHubManager } from '../../../../../../managers/Hub';
import { setFilteredResults } from '../../../../../../features/search/searchSlice';
import AlsoitMenuDropdown from '../../../../../../components/DropDowns';
import ColorPalette from '../../../../../../components/ColorPalette/component/ColorPalette';
import { useNavigate } from 'react-router-dom';

interface formProps {
  name: string;
  color: string | undefined;
}

export default function CreateHub() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedTreeDetails, currHubId, hub } = useAppSelector((state) => state.hub);
  const { activeView } = useAppSelector((state) => state.workspace);
  const { currentWorkspaceId: workSpaceId } = useAppSelector((state) => state.auth);

  const [paletteColor, setPaletteColor] = useState<string | ListColourProps | undefined | null>('blue');
  const [showPalette, setShowPalette] = useState<null | HTMLDivElement>(null);

  const { type, id } = selectedTreeDetails;
  const { data } = useGetHubChildren({
    query: type === EntityType.hub ? id : currHubId
  });

  const isCreateAllowed = !!data && (data?.data.wallets?.length > 0 || data?.data?.lists?.length > 0);

  const createHub = useMutation(createHubService, {
    onSuccess: (data) => {
      const listDetails = data?.data.hub;
      const routeVariable = id ? 'tasks/sh' : 'tasks/h';
      navigate(`/${workSpaceId}/${routeVariable}/${listDetails.id}/v/${activeView?.id}`, {
        replace: true
      });
      dispatch(
        setActiveItem({
          activeItemType: EntityType.hub,
          activeItemId: listDetails.id,
          activeItemName: listDetails.name
        })
      );
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

  const currentWorkspaceId: string | undefined = JSON.parse(
    localStorage.getItem('currentWorkspaceId') || '"'
  ) as string;

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
    <div className="w-full h-auto p-2 overflow-y-auto bg-white" style={{ maxHeight: '420px' }}>
      <div className="flex flex-col mb-2">
        <span className="font-bold">Create A Hub</span>
        <span className="font-medium">Allows you manage all entities within the workspace</span>
      </div>
      <div className="flex flex-col p-4 space-y-2 border border-gray-200 rounded bg-alsoit-gray-50">
        <div className="relative flex">
          <Input
            placeholder="Hub Name"
            name="name"
            value={name}
            type="text"
            onChange={handleHubChange}
            leadingIcon={
              <span className="w-6 h-6 p-2 rounded" style={{ backgroundColor: paletteColor as string }}></span>
            }
          />
          <div
            className="absolute flex items-center cursor-pointer right-2 top-3"
            onClick={(e) => handleShowPalette(e)}
          >
            <Wand />
          </div>
        </div>
        <AlsoitMenuDropdown handleClose={handleClosePalette} anchorEl={showPalette}>
          <ColorPalette handleClick={handlePaletteColor} />
        </AlsoitMenuDropdown>
      </div>
      <div className="flex justify-between pt-2 space-x-3">
        <Button
          buttonStyle="white"
          onClick={onClose}
          loading={false}
          label="Cancel"
          width={20}
          height="h-7"
          labelSize="text-sm"
        />
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="Create Hub"
          padding="py-2 px-2"
          height="h-7"
          width="w-fit"
          labelSize="text-sm"
        />
      </div>
    </div>
  );
}
