import React, { useState } from 'react';
import { Button, Checkbox, Input } from '../../../../../../components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { createHubService } from '../../../../../../features/hubs/hubService';
import { setSubDropdownMenu, setshowMenuDropdown } from '../../../../../../features/hubs/hubSlice';
import { setCreateEntityType } from '../../../../../../features/workspace/workspaceSlice';
import { EntityType } from '../../../../../../utils/EntityTypes/EntityType';
import { avatarBg } from '../../../../createWorkspace/colors';
import Assignee from '../../../../tasks/assignTask/Assignee';
import Wand from '../../../../../../assets/icons/Wand';

interface formProps {
  name: string;
  color: string | undefined;
}

export default function CreateHub() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const [activeColour, setActiveColour] = useState<string | undefined>('');
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

  const handleColourSelection = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
    colour?: string
  ) => {
    e.stopPropagation();
    console.log('stan');
    setFormState({ ...formState, color: colour });
    setActiveColour(colour);
  };

  const currentWorkspaceId: string | undefined = JSON.parse(
    localStorage.getItem('currentWorkspaceId') || '"'
  ) as string;

  const { name, color } = formState;

  const onSubmit = async () => {
    await createHub.mutateAsync({
      name,
      color,
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
      <div className="flex flex-col border border-gray-200 bg-gray-200 p-4 rounded space-y-2">
        <Input
          placeholder="Hub Name"
          name="name"
          value={name}
          type="text"
          onChange={handleHubChange}
          trailingIcon={
            <div className="cursor-pointer flex items-center" onClick={(e) => handleColourSelection(e)}>
              <Wand />
            </div>
          }
        />
        <div className="flex h-10 p-1 w-full border bg-white rounded justify-between items-center">
          <span>Manage this Hub with other application</span>
          <Assignee option="share" />
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
        <div className="grid grid-cols-7 gap-6 my-4 border border-inherit p-2">
          {avatarBg.map(({ colour }) => {
            return (
              <div
                key={colour}
                className={`w-6 h-6 flex items-center justify-center ${
                  activeColour === colour ? 'border border-gray-600 rounded' : ''
                }`}
              >
                <button
                  type="button"
                  className="rounded w-5 h-5"
                  style={{ backgroundColor: colour }}
                  onClick={(e) => handleColourSelection(e, colour)}
                />
              </div>
            );
          })}
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
