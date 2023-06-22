import React, { useState } from 'react';
import { Button, Input } from '../../../../../../components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setCreateListSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import { setSubDropdownMenu, setshowMenuDropdown } from '../../../../../../features/hubs/hubSlice';
import { setCreateWlLink } from '../../../../../../features/workspace/workspaceSlice';
import { createListService } from '../../../../../../features/list/listService';

export default function CreateList() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  // const { currentItemId } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown, showMenuDropdownType, SubMenuId, SubMenuType, createWLID } = useAppSelector(
    (state) => state.hub
  );
  const { createWlLink } = useAppSelector((state) => state.workspace);

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
        (showMenuDropdownType == 'hubs' ? showMenuDropdown : null) ||
        (showMenuDropdownType == 'subhub' ? showMenuDropdown : null) ||
        (SubMenuType == 'hubs' ? SubMenuId : null) ||
        (SubMenuType == 'subhub' ? SubMenuId : null),
      walletId:
        (showMenuDropdownType == 'wallet' && !createWLID ? showMenuDropdown : null) ||
        (showMenuDropdownType == 'subwallet' ? showMenuDropdown : null) ||
        (showMenuDropdownType == 'subwallet3' ? showMenuDropdown : null) ||
        (SubMenuType == 'wallet' ? SubMenuId : null) ||
        (SubMenuType == 'subwallet2' ? SubMenuId : null) ||
        (SubMenuType == 'subwallet3' ? SubMenuId : null)
    });
  };

  return (
    <div className="p-2">
      <Input
        label="Enter New List Name:"
        placeholder="Enter List Name"
        name="name"
        value={name}
        type="text"
        onChange={handleListChange}
      />
      <div className="flex justify-end space-x-3 pt-2">
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="Create List"
          padding="py-2 px-4"
          height="h-10"
          width="w-20"
        />
      </div>
    </div>
  );
}
