import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createListService } from '../../../../../features/list/listService';
import { Button, Input, SlideOver } from '../../../../../components';
import { useAppSelector } from '../../../../../app/hooks';
import { setSubDropdownMenu, setshowMenuDropdown } from '../../../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import { setCreateListSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';
import { setCreateWlLink } from '../../../../../features/workspace/workspaceSlice';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';

function ListModal() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { showMenuDropdown, showMenuDropdownType, SubMenuId, SubMenuType, createWLID } = useAppSelector(
    (state) => state.hub
  );
  const { createWlLink } = useAppSelector((state) => state.workspace);
  const { showCreateListSlideOver } = useAppSelector((state) => state.slideOver);

  const createList = useMutation(createListService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      dispatch(setCreateListSlideOverVisibility(false));
      dispatch(setSubDropdownMenu(false));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null,
          showMenuDropdownType: null
        })
      );
      dispatch(setCreateWlLink(false));
    }
  });

  const defaultListFormState = {
    name: ''
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
    await createList.mutateAsync({
      listName: name,
      hubId:
        (createWlLink ? createWLID : null) ||
        (SubMenuType === EntityType.hub ? SubMenuId : null) ||
        (SubMenuType === EntityType.subHub ? SubMenuId : null) ||
        (showMenuDropdownType === EntityType.hub ? showMenuDropdown : null) ||
        (showMenuDropdownType === EntityType.subHub ? showMenuDropdown : null),
      walletId:
        (showMenuDropdownType === EntityType.wallet && !createWLID ? showMenuDropdown : null) ||
        (showMenuDropdownType === EntityType.subWallet ? showMenuDropdown : null) ||
        (showMenuDropdownType?.includes(EntityType.subWallet) ? showMenuDropdown : null) ||
        (SubMenuType?.includes(EntityType.wallet) ? SubMenuId : null)
    });
  };
  const handleCloseSlider = () => {
    dispatch(setCreateListSlideOverVisibility(false));
    dispatch(setSubDropdownMenu(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null
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
          <div className="px-4 space-y-1 sm:space-y-0 sm:px-6 sm:py-5">
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
