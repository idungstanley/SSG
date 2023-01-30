import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button, Input, SlideOver } from '../../../../components';
import { createHubService } from '../../../../features/hubs/hubService';
import { useAppSelector } from '../../../../app/hooks';
import {
  setshowMenuDropdown,
  setSubDropdownMenu,
} from '../../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import { setCreateSubHubSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';

function SubHubModal() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { currHubId } = useAppSelector((state) => state.hub);
  const createHub = useMutation(createHubService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setCreateSubHubSlideOverVisibility(false));
      dispatch(setSubDropdownMenu(false));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null,
        })
      );
    },
  });

  const handleCloseSlider = () => {
    dispatch(setCreateSubHubSlideOverVisibility(false));
    dispatch(setSubDropdownMenu(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null,
      })
    );
  };

  const defaultHubFormState = {
    name: '',
  };

  const [formState, setFormState] = useState(defaultHubFormState);

  const handleHubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const currentWorkspaceId = JSON.parse(
    localStorage.getItem('currentWorkspaceId') || '"'
  );

  const { name } = formState;

  const onSubmit = async () => {
    await createHub.mutateAsync({
      name,
      currentWorkspaceId,
      currHubId,
    });
  };

  const { showCreateSubHubSlideOver } = useAppSelector(
    (state) => state.slideOver
  );
  return (
    <SlideOver
      show={showCreateSubHubSlideOver}
      onClose={() => handleCloseSlider()}
      headerTitle="Create A New Sub Hub"
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="px-4 space-y-1 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="Sub Hub Name:"
              placeholder="Enter Sub Hub Name"
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
          label="Create  Sub Hub"
          padding="py-2 px-4"
          height="h-10"
          width="w-40"
        />
      }
    />
  );
}

export default SubHubModal;