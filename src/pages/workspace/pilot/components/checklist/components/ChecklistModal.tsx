import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BsThreeDots } from "react-icons/bs";
import {
  setClickChecklistId,
  setClickChecklistItemId,
  setToggleAssignChecklistItemId,
  setTriggerDelChecklist,
  setTriggererChecklistItemDel,
} from "../../../../../../features/task/checklist/checklistSlice";
import { useAppDispatch } from "../../../../../../app/hooks";
import { Disclosure } from "@headlessui/react";

interface ChecklistModalProps {
  checklistId: string;
  checklistItemId?: string;
  options: {
    id: number;
    handleClick: () => void;
    name: string;
  }[];
}

export default function ChecklistModal({
  options,
  checklistId,
  checklistItemId,
}: ChecklistModalProps) {
  const dispatch = useAppDispatch();
  const handleDelChecklist = () => {
    dispatch(setClickChecklistId(checklistId));
    dispatch(setTriggerDelChecklist(true));
  };

  const handleChecklistItemDel = () => {
    dispatch(setClickChecklistId(checklistId));
    dispatch(setClickChecklistItemId(checklistItemId));
    dispatch(setTriggererChecklistItemDel(true));
  };
  const handleOptions = (option: { name: string }) => {
    if (option.name === "Delete Checklist") {
      handleDelChecklist();
    } else if (option.name === "Delete Item") {
      handleChecklistItemDel();
    } else if (option.name == "Assign to") {
      dispatch(setToggleAssignChecklistItemId(checklistItemId));
    }
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex text-sm text-gray-400">
          <BsThreeDots className="cursor-pointer" />
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
        <Menu.Items className="absolute z-20 w-40 mt-2 -ml-20 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((option) =>
            option.name === "New Item" ? (
              <Disclosure.Button key={option.id} className="w-full">
                <Menu.Button className="flex w-full text-sm text-gray-400">
                  {() => (
                    <div className="flex items-center w-full text-gray-600 hover:bg-gray-300">
                      <button
                        type="button"
                        className="flex items-center w-11/12 px-4 py-2 space-x-2 text-sm text-left"
                        onClick={() => {
                          handleOptions(option);
                        }}
                      >
                        <p>{option.name}</p>
                      </button>
                    </div>
                  )}
                </Menu.Button>
              </Disclosure.Button>
            ) : (
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
                      <p>{option.name}</p>
                    </button>
                  </div>
                )}
              </Menu.Item>
            )
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
