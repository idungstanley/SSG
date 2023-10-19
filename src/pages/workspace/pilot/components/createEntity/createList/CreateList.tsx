import React, { useState } from 'react';
import { Button, Checkbox, Input } from '../../../../../../components';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setCreateListSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import {
  getHub,
  setEntityToCreate,
  setSubDropdownMenu,
  setshowMenuDropdown
} from '../../../../../../features/hubs/hubSlice';
import {
  setActiveItem,
  setCreateEntityType,
  setCreateWlLink,
  setShowOverlay
} from '../../../../../../features/workspace/workspaceSlice';
import { createListService } from '../../../../../../features/list/listService';
import { EntityType } from '../../../../../../utils/EntityTypes/EntityType';
import Assignee from '../../../../tasks/assignTask/Assignee';
import ArrowDown from '../../../../../../assets/icons/ArrowDown';
import Wand from '../../../../../../assets/icons/Wand';
import { ListColourProps } from '../../../../../../components/tasks/ListItem';
import { createListManager } from '../../../../../../managers/List';
import { setFilteredResults } from '../../../../../../features/search/searchSlice';
import { ErrorHasDescendant } from '../../../../../../types';
import Toast from '../../../../../../common/Toast';
import { toast } from 'react-hot-toast';
import AlsoitMenuDropdown from '../../../../../../components/DropDowns';
import ColorPalette from '../../../../../../components/ColorPalette/component/ColorPalette';
import { useNavigate } from 'react-router-dom';
import { FaFolder } from 'react-icons/fa';
import ListIconComponent from '../../../../../../components/ItemsListInSidebar/components/ListIconComponent';

export default function CreateList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedTreeDetails, createWLID, hub } = useAppSelector((state) => state.hub);
  const { createWlLink } = useAppSelector((state) => state.workspace);
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const [paletteColor, setPaletteColor] = useState<string | ListColourProps | undefined | null>('black');
  const [showPalette, setShowPalette] = useState<null | HTMLDivElement>(null);
  const { type, id } = selectedTreeDetails;
  const createList = useMutation(createListService, {
    onSuccess: (data) => {
      const listDetails = data?.data.list;
      navigate(`/${currentWorkspaceId}/tasks/l/${listDetails.id}`, {
        replace: true
      });
      dispatch(
        setActiveItem({
          activeItemType: EntityType.list,
          activeItemId: listDetails.id,
          activeItemName: listDetails.name
        })
      );
      dispatch(setCreateListSlideOverVisibility(false));
      dispatch(setShowOverlay(false));
      dispatch(setSubDropdownMenu(false));
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: null,
          showMenuDropdownType: null
        })
      );
      dispatch(setCreateWlLink(false));
      dispatch(setCreateEntityType(null));
      dispatch(setEntityToCreate(null));
      const list = data.data.list;
      const updatedTree = createListManager(type as string, hub, list);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });

  const defaultListFormState = {
    name: ''
  };
  const onClose = () => {
    dispatch(setShowOverlay(false));
    dispatch(setCreateEntityType(null));
    dispatch(setEntityToCreate(null));
  };

  const [formState, setFormState] = useState(defaultListFormState);

  const handleListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handlePaletteColor = (value: string | ListColourProps | undefined | null) => {
    setPaletteColor(value);
  };
  const handleShowPalette = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowPalette((e as React.MouseEvent<HTMLDivElement, MouseEvent>).currentTarget);
  };

  const handleClosePalette = () => {
    setShowPalette(null);
  };
  const jsonColorString = JSON.stringify({ outerColour: paletteColor as string, innerColour: undefined });
  const { name } = formState;
  const onSubmit = async () => {
    try {
      await createList.mutateAsync({
        listName: name,
        color: jsonColorString,
        hubId: (createWlLink ? createWLID : null) || type === EntityType.hub ? id : null,
        walletId: type === EntityType.wallet ? id : null
      });
    } catch (error) {
      const errorResponse = error as ErrorHasDescendant;
      if (errorResponse.data) {
        const isHasDescendant = errorResponse.data.data.has_descendants;
        if (isHasDescendant) {
          toast.custom((t) => (
            <Toast type="error" title="Error Creating List" body="Parent Entity has a descendant" toastId={t.id} />
          ));
        }
      }
    }
  };

  return (
    <div className="h-auto p-2 overflow-y-auto bg-white" style={{ maxHeight: '420px' }}>
      <div className="flex flex-col mb-2">
        <span className="font-bold">Create A List</span>
        <span className="font-medium">Allows you manage all entities within the workspace</span>
      </div>
      <div className="flex flex-col p-4 space-y-2 border border-gray-200 rounded bg-alsoit-gray-50">
        <div className="relative flex">
          <Input
            placeholder="List Name"
            name="name"
            value={name}
            type="text"
            onChange={handleListChange}
            leadingIcon={<ListIconComponent shape="solid-circle" outterColour={paletteColor as string} />}
          />
          <div
            className="absolute flex items-center cursor-pointer right-2 top-3"
            onClick={(e) => handleShowPalette(e)}
          >
            <Wand />
          </div>
        </div>
        <AlsoitMenuDropdown handleClose={handleClosePalette} anchorEl={showPalette}>
          <ColorPalette handleClick={handlePaletteColor} />
        </AlsoitMenuDropdown>
      </div>
      <div className="flex justify-between pt-2 space-x-3">
        <Button
          buttonStyle="white"
          onClick={onClose}
          loading={false}
          label="Cancel"
          width={20}
          height="h-7"
          labelSize="text-sm"
        />
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          label="Create List"
          padding="py-2 px-2"
          height="h-7"
          width="w-fit"
          labelSize="text-sm"
        />
      </div>
    </div>
  );
}
