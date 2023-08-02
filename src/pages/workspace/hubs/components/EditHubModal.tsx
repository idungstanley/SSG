import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Input, SlideOver } from '../../../../components';
import { UseEditHubService } from '../../../../features/hubs/hubService';
import { useAppSelector } from '../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { getHub, setshowMenuDropdown } from '../../../../features/hubs/hubSlice';
import { setEditHubSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';
import { setFilteredResults } from '../../../../features/search/searchSlice';
import { changeHubManager } from '../../../../managers/Hub';

export default function EditHubModal() {
  const dispatch = useDispatch();

  const { showMenuDropdown, prevName, hub } = useAppSelector((state) => state.hub);

  const updateHub = useMutation(UseEditHubService, {
    onSuccess: (data) => {
      dispatch(setEditHubSlideOverVisibility(false));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null
        })
      );
      const hubData = data.data.hub;
      const updatedTree = changeHubManager(hubData.id as string, hub, hubData);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });

  const defaultHubFormState = {
    name: prevName
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
    await updateHub.mutateAsync({
      hubId: showMenuDropdown,
      name,
      currentWorkspaceId
    });
  };

  const handleCloseSlider = () => {
    dispatch(setEditHubSlideOverVisibility(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null
      })
    );
  };

  const { showEditHubSlideOver } = useAppSelector((state) => state.slideOver);
  const { showMenuDropdownType } = useAppSelector((state) => state.hub);
  return (
    <SlideOver
      show={showEditHubSlideOver}
      onClose={() => handleCloseSlider()}
      headerTitle={showMenuDropdownType === 'hubs' ? ' Edit hub' : 'Edit subhub'}
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="px-4 space-y-1 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label={showMenuDropdownType === 'hubs' ? 'Hub Name:' : 'Subhub Name:'}
              placeholder={showMenuDropdownType === 'hubs' ? 'Enter hub Name' : 'Enter SubHub Name'}
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
          label={showMenuDropdownType === 'hubs' ? 'Edit hub' : 'Edit  Subhub'}
          padding="py-2 px-4"
          height="h-10"
          width="w-40"
        />
      }
    />
  );
}
