import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseEditListService } from '../../../../../features/list/listService';
import { Button, Input, SlideOver } from '../../../../../components';
import { useAppSelector } from '../../../../../app/hooks';
import {
  setSubDropdownMenu,
  setshowMenuDropdown,
} from '../../../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import { setEditListSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';

function EditListModal() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { showMenuDropdown } = useAppSelector((state) => state.hub);
  const { showEditListSlideOver } = useAppSelector((state) => state.slideOver);
  const createList = useMutation(UseEditListService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setEditListSlideOverVisibility(false));
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
      listId: showMenuDropdown,
    });
  };
  const handleCloseSlider = () => {
    dispatch(setEditListSlideOverVisibility(false));
    dispatch(setSubDropdownMenu(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null,
      })
    );
  };
  return (
    <SlideOver
      show={showEditListSlideOver}
      onClose={() => handleCloseSlider()}
      headerTitle="Edit List"
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="Edit List Name"
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
          label="Edit List"
          padding="py-2 px-4"
          height="h-10"
          width="w-40"
        />
      }
    />
  );
}

export default EditListModal;
