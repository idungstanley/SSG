import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BsThreeDots } from 'react-icons/bs';
import {
  setClickChecklistId,
  setClickChecklistItemId,
  setOpenedDisclosureId,
  setShowChecklistItemInput,
  setToggleAssignChecklistItemId
} from '../../../../features/task/checklist/checklistSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useDeleteChecklist, useDeleteChecklistItem } from '../../../../features/task/checklist/checklistService';

interface ChecklistModalProps {
  checklistId: string;
  checklistItemId?: string;
  focus: () => void;
  options: {
    id: number;
    handleClick: () => void;
    name: string;
    icon: JSX.Element;
  }[];
}

export default function ChecklistModal({ options, checklistId, checklistItemId, focus }: ChecklistModalProps) {
  const dispatch = useAppDispatch();

  const { mutate: onChecklistDelete } = useDeleteChecklist();
  const { mutate: onChecklistItemDelete } = useDeleteChecklistItem();

  const { openedDisclosureId } = useAppSelector((state) => state.checklist);

  const handleDelChecklist = () => {
    onChecklistDelete({
      query: checklistId
    });
  };

  const handleChecklistItemDel = () => {
    onChecklistItemDelete({
      query: checklistId,
      itemId: checklistItemId
    });
  };

  const handleOptions = (option: { name: string }) => {
    if (option.name === 'Delete Checklist') {
      handleDelChecklist();
    } else if (option.name === 'Delete Item') {
      handleChecklistItemDel();
    } else if (option.name === 'Assign to' || option.name === 'Unassign') {
      dispatch(setToggleAssignChecklistItemId(checklistItemId));
      dispatch(setClickChecklistId(checklistId));
      dispatch(setClickChecklistItemId(checklistItemId));
    } else if (option.name === 'Rename') {
      focus();
    } else if (option.name === 'New Item') {
      dispatch(setClickChecklistId(checklistId));
      dispatch(setShowChecklistItemInput(true));
      if (!openedDisclosureId.includes(checklistId)) {
        dispatch(setOpenedDisclosureId(checklistId));
      }
    }
  };

  return (
    <Menu as="div" className="group relative inline-block text-left">
      <div>
        <Menu.Button className="flex text-sm text-gray-400">
          <BsThreeDots className="cursor-pointer opacity-0 group-hover:opacity-100" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="fixed right-8 z-50 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((option) => (
            <Menu.Item key={option.id}>
              {() => (
                <div className="flex items-center text-gray-600 hover:bg-gray-300">
                  <button
                    type="button"
                    className="flex items-center w-11/12 px-4 py-2 space-x-2 text-sm text-left"
                    onClick={() => {
                      handleOptions(option);
                    }}
                  >
                    <span className="w-4 h-4">{option.icon}</span>
                    <p>{option.name}</p>
                  </button>
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
