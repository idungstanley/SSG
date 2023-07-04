import React, { useState } from 'react';
import { Button, Input } from '../../../../../../components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { createHubService } from '../../../../../../features/hubs/hubService';
import { setSubDropdownMenu, setshowMenuDropdown } from '../../../../../../features/hubs/hubSlice';
import { setCreateEntityType } from '../../../../../../features/workspace/workspaceSlice';
import { EntityType } from '../../../../../../utils/EntityTypes/EntityType';
import { avatarBg } from '../../../../createWorkspace/colors';

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

  const handleColourSelection = (colour?: string) => {
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
    <div className="p-2">
      <Input
        label="Enter New Hub Name:"
        placeholder="Enter Hub Name"
        name="name"
        value={name}
        type="text"
        onChange={handleHubChange}
      />
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
                onClick={() => handleColourSelection(colour)}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between pt-2 space-x-3">
        <Button buttonStyle="white" onClick={onClose} loading={false} label="Close" width={20} />
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="Create Hub"
          padding="py-2 px-4"
          height="h-10"
          width="w-20"
        />
      </div>
    </div>
  );
}
