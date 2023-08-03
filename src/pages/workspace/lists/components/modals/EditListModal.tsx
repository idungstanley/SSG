import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UseEditListService } from '../../../../../features/list/listService';
import { Button, Input, SlideOver } from '../../../../../components';
import { useAppSelector } from '../../../../../app/hooks';
import { getHub, setSubDropdownMenu, setshowMenuDropdown } from '../../../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import { setEditListSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';
import { changeListManager } from '../../../../../managers/List';
import { setFilteredResults } from '../../../../../features/search/searchSlice';

function EditListModal() {
  const dispatch = useDispatch();

  const { showMenuDropdown, prevName, hub } = useAppSelector((state) => state.hub);
  const { showEditListSlideOver } = useAppSelector((state) => state.slideOver);

  const updateList = useMutation(UseEditListService, {
    onSuccess: (data) => {
      dispatch(setEditListSlideOverVisibility(false));
      dispatch(setSubDropdownMenu(false));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null
        })
      );
      const list = data.data.list;
      const updatedTree = changeListManager(list.id as string, hub, list);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });

  const defaultListFormState = {
    name: prevName
  };

  const [formState, setFormState] = useState(defaultListFormState);

  const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const { name } = formState;
  const onSubmit = async () => {
    await updateList.mutateAsync({
      listName: name,
      listId: showMenuDropdown
    });
  };
  const handleCloseSlider = () => {
    dispatch(setEditListSlideOverVisibility(false));
    dispatch(setSubDropdownMenu(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null
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
