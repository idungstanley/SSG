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
    console.log(checklistId);
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
        <Menu.Items className="origin-top-right absolute z-20 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none -ml-20">
          {options.map((option) =>
            option.name === "New Item" ? (
              <Disclosure.Button key={option.id} className="w-full">
                <Menu.Button className="flex text-sm text-gray-400 w-full">
                  {() => (
                    <div className="flex items-center hover:bg-gray-300 text-gray-600 w-full">
                      <button
                        type="button"
                        className="flex items-center px-4 py-2 text-sm  text-left space-x-2 w-11/12"
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
                  <div className="flex items-center hover:bg-gray-300 text-gray-600">
                    <button
                      type="button"
                      className="flex items-center px-4 py-2 text-sm  text-left space-x-2 w-11/12"
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
