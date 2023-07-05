import React, { useState } from 'react';
import { Button, Checkbox, Input } from '../../../../../../components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { createHubService } from '../../../../../../features/hubs/hubService';
import { setSubDropdownMenu, setshowMenuDropdown } from '../../../../../../features/hubs/hubSlice';
import { setCreateEntityType } from '../../../../../../features/workspace/workspaceSlice';
import { EntityType } from '../../../../../../utils/EntityTypes/EntityType';
import Assignee from '../../../../tasks/assignTask/Assignee';
import Wand from '../../../../../../assets/icons/Wand';
import ArrowDown from '../../../../../../assets/icons/ArrowDown';
import Palette from '../../../../../../components/ColorPalette';
import { ListColourProps } from '../../../../../../components/tasks/ListItem';

interface formProps {
  name: string;
  color: string | undefined;
}

export default function CreateHub() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const [paletteColor, setPaletteColor] = useState<string | ListColourProps | undefined>('');
  const [showPalette, setShowPalette] = useState<boolean>(false);
  const { selectedTreeDetails } = useAppSelector((state) => state.hub);

  const { type, id } = selectedTreeDetails;
  const createHub = useMutation(createHubService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['retrieve']);
      dispatch(setCreateEntityType(null));
      dispatch(setSubDropdownMenu(false));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null
        })
      );
      setFormState(defaultHubFormState);
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
  };

  const handleShowPalette = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowPalette((prev) => !prev);
  };

  const currentWorkspaceId: string | undefined = JSON.parse(
    localStorage.getItem('currentWorkspaceId') || '"'
  ) as string;

  const { name } = formState;

  const onSubmit = async () => {
    await createHub.mutateAsync({
      name,
      color: paletteColor as string,
      currentWorkspaceId,
      currHubId: type === EntityType.hub ? id : null
    });
  };
  return (
    <div className="p-2 overflow-y-auto h-auto" style={{ maxHeight: '420px' }}>
      <div className="flex flex-col mb-2">
        <span className="font-bold">Create A Hub</span>
        <span className="font-medium">Allows you manage all entities within the workspace</span>
      </div>
      <div className="flex flex-col border border-gray-200 bg-alsoit-gray-bg p-4 rounded space-y-2">
        <div className="flex relative">
          <Input placeholder="Hub Name" name="name" value={name} type="text" onChange={handleHubChange} />
          <div
            className="absolute cursor-pointer flex items-center right-2 top-3"
            onClick={(e) => handleShowPalette(e)}
          >
            <Wand />
          </div>
        </div>
        <div className="flex h-10 p-1 w-full border bg-white rounded justify-between items-center">
          <span>Manage this Hub with other application</span>
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
            description="Host other entities list wallets and lists"
            height="5"
            width="5"
          />
          <Checkbox checked={false} onChange={() => ({})} description="Host other entities" height="5" width="5" />
          <Checkbox checked={false} onChange={() => ({})} description="Host other entities" height="5" width="5" />
        </div>
        <div className="relative ml-24 mt-32">
          {showPalette ? <Palette title="Hub Colour" setPaletteColor={setPaletteColor} /> : null}
        </div>
      </div>
      <div className="flex justify-between pt-2 space-x-3">
        <Button buttonStyle="white" onClick={onClose} loading={false} label="Close" width={20} height="h-7" />
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="Create Hub"
          padding="py-2 px-2"
          height="h-7"
          width="w-24"
        />
      </div>
    </div>
  );
}
