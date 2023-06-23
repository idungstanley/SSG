import React, { useState } from 'react';
import { Button, Input } from '../../../../../../components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../../../../../../app/hooks';
import { createHubService } from '../../../../../../features/hubs/hubService';
import { setCreateHubSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import { setSubDropdownMenu, setshowMenuDropdown } from '../../../../../../features/hubs/hubSlice';
import { setCreateEntityType } from '../../../../../../features/workspace/workspaceSlice';

export default function CreateHub() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
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
    name: ''
  };

  const [formState, setFormState] = useState(defaultHubFormState);

  const handleHubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  const onClose = () => {
    dispatch(setCreateEntityType(null));
  };

  const currentWorkspaceId: string | undefined = JSON.parse(
    localStorage.getItem('currentWorkspaceId') || '"'
  ) as string;

  const { name } = formState;

  const onSubmit = async () => {
    await createHub.mutateAsync({
      name,
      currentWorkspaceId
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
