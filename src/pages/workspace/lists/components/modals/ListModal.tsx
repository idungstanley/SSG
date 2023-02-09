import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createListService } from '../../../../../features/list/listService';
import { Button, Input, SlideOver } from '../../../../../components';
import { useAppSelector } from '../../../../../app/hooks';
import {
  setSubDropdownMenu,
  setshowMenuDropdown,
} from '../../../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import { setCreateListSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';

function ListModal() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { currentItemId } = useAppSelector((state) => state.workspace);

  const { showMenuDropdown, showMenuDropdownType, currSubHubId } =
    useAppSelector((state) => state.hub);
  const { showCreateListSlideOver } = useAppSelector(
    (state) => state.slideOver
  );
  const createList = useMutation(createListService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setCreateListSlideOverVisibility(false));
      dispatch(setSubDropdownMenu(false));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null,
        })
      );
    },
  });

  const defaultListFormState = {
    name: '',
  };

  const [formState, setFormState] = useState(defaultListFormState);

  const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const { name } = formState;
  const onSubmit = async () => {
    await createList.mutateAsync({
      listName: name,
      hubId:
        showMenuDropdownType == 'hubs'
          ? showMenuDropdown
          : null || showMenuDropdownType == 'subhub'
          ? showMenuDropdown
          : null || currSubHubId !== null
          ? currSubHubId
          : currentItemId,
      walletId:
        showMenuDropdownType == 'wallet'
          ? showMenuDropdown
          : null || showMenuDropdownType == 'subwallet'
          ? showMenuDropdown
          : null || showMenuDropdownType == 'subwallet3'
          ? showMenuDropdown
          : null,
    });
  };
  const handleCloseSlider = () => {
    dispatch(setCreateListSlideOverVisibility(false));
    dispatch(setSubDropdownMenu(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null,
      })
    );
  };
  return (
    <SlideOver
      show={showCreateListSlideOver}
      onClose={() => handleCloseSlider()}
      headerTitle="Create List"
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="List Name"
              placeholder="Enter list name"
              name="name"
              value={name}
              type="text"
              onChange={handleListChange}
            />
          </div>
        </div>
      }
      footerButtons={
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="Create List"
          padding="py-2 px-4"
          height="h-10"
          width="w-40"
        />
      }
    />
  );
}

export default ListModal;
