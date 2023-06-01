import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button, Input, SlideOver } from '../../../../components';
import { createHubService } from '../../../../features/hubs/hubService';
import { useAppSelector } from '../../../../app/hooks';
import { setshowMenuDropdown, setSubDropdownMenu } from '../../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import { setCreateHubSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';

function Modal() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { currHubId } = useAppSelector((state) => state.hub);
  const createHub = useMutation(createHubService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['retrieve']);
      dispatch(setCreateHubSlideOverVisibility(false));
      dispatch(setSubDropdownMenu(false));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null
        })
      );
      setFormState(defaultHubFormState);
    }
  });

  const handleCloseSlider = () => {
    dispatch(setCreateHubSlideOverVisibility(false));
    dispatch(setSubDropdownMenu(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null
      })
    );
  };

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

  const currentWorkspaceId: string | undefined = JSON.parse(
    localStorage.getItem('currentWorkspaceId') || '"'
  ) as string;

  const { name } = formState;

  const onSubmit = async () => {
    await createHub.mutateAsync({
      name,
      currentWorkspaceId,
      currHubId
    });
  };

  const { showCreateHubSlideOver } = useAppSelector((state) => state.slideOver);
  return (
    <SlideOver
      show={showCreateHubSlideOver}
      onClose={() => handleCloseSlider()}
      headerTitle="Create A New Hub"
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="px-4 space-y-1 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="Hub Name:"
              placeholder="Enter Hub Name"
              name="name"
              value={name}
              type="text"
              onChange={handleHubChange}
            />
          </div>
        </div>
      }
      footerButtons={
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="Create Hub"
          padding="py-2 px-4"
          height="h-10"
          width="w-40"
        />
      }
    />
  );
}

export default Modal;
