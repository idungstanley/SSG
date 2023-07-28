import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BsChevronRight } from 'react-icons/bs';
import { FiChevronRight } from 'react-icons/fi';
import Icons from '../../../../../components/Icons/Icons';
import DropDown from '../../../../../assets/icons/arrow_drop_down_black.svg';
import { useSwitchSettings } from './SwitchSettings';
import { Label } from '../../../../../components/TasksHeader/ui/Filter/ui/FilterItem/Label';

interface IShowHideSettings {
  scrollByEachGroup: string;
  splitSubTask: string;
  verticalGridLines: string;
  entityLocation: string;
  subTaskParentsNames: string;
  closedSubtask: string;
  TaskInMultipleLists: string;
  subTaskInMultipleLists: string;
  emptyStatuses: string;
}

export default function ShowHideSettings({
  scrollByEachGroup,
  splitSubTask,
  verticalGridLines,
  entityLocation,
  subTaskParentsNames,
  closedSubtask,
  TaskInMultipleLists,
  subTaskInMultipleLists,
  emptyStatuses
}: IShowHideSettings) {
  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);

  const switchSettings = useSwitchSettings();

  const handleChange = (viewMode: string, index: number) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
    switchSettings(viewMode);
  };

  const ViewSettings = [
    {
      id: 2,
      label: scrollByEachGroup
    },
    {
      id: 3,
      label: splitSubTask
    },
    {
      id: 4,
      label: verticalGridLines
    },
    {
      id: 5,
      label: 'Title Vertical Grid Line'
    },
    {
      id: 6,
      label: 'Upper Case'
    },
    {
      id: 7,
      label: entityLocation
    },
    {
      id: 8,
      label: subTaskParentsNames
    },
    {
      id: 9,
      label: closedSubtask
    },
    {
      id: 10,
      label: TaskInMultipleLists
    },
    {
      id: 11,
      label: subTaskInMultipleLists
    },
    {
      id: 12,
      label: emptyStatuses
    },
    {
      id: 13,
      icon: <FiChevronRight />,
      label: 'Remove Single Line mode'
    },
    {
      id: 14,
      icon: <FiChevronRight />,
      label: 'Compact mode'
    }
  ];

  return (
    <Menu>
      <div className="viewSettingsParent flex justify-center items-center">
        <Menu.Button>
          <Icons src={DropDown} />
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
        <Menu.Items
          style={{ zIndex: 61 }}
          className="origin-top-right absolute w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none -ml-8 mt-6"
        >
          <p className="text-sm flex justify-center pt-3">CUSTOMIZE THIS VIEW</p>
          <div className="relative flex justify-center flex-col mb-2">
            <p className="border-b-2 pt-3 "></p>
            <span
              className="text-xs text-gray-400 text-center absolute top-1.5 left-1/3  bg-white border border-gray-100 px-1"
              style={{ fontSize: '8px' }}
            >
              DEFAULT SETTINGS
            </span>
          </div>
          <div className="flex justify-between items-center mx-auto mt-4" style={{ width: '93%' }}>
            <p className="text-sm">Property Column </p>
            <BsChevronRight />
          </div>

          {ViewSettings.map((View, index) => (
            <Menu.Item as="a" key={View.id} className="flex items-center py-2 text-sm text-black text-left w-full ">
              {View.label !== 'Remove Single Line mode' ? (
                <button
                  className={`${
                    View.label == 'Upper Case'
                      ? ' flex justify-between items-center w-full group border-y-2 py-4'
                      : ' flex justify-between items-center w-full group '
                  }`}
                >
                  <p className="flex items-center space-x-2 pl-2 text-md whitespace-nowrap">{View.label}</p>
                  {View.label == 'Upper Case' && (
                    <p
                      className="absolute text-xs text-gray-400 text-center w-2/6 bg-white border border-gray-100 px-1"
                      style={{ top: '226px', right: '90px' }}
                    >
                      TEXT
                    </p>
                  )}
                  <p className="flex items-center pr-2 ">
                    <label className="switch" onClick={(event) => event.stopPropagation()}>
                      <input
                        className="inputShow"
                        type="checkbox"
                        checked={checkedStates[index]}
                        onChange={() => handleChange(View.label, index)}
                      />
                      <div className={`slider ${checkedStates[index] ? 'checked' : ''}`}></div>
                    </label>
                  </p>
                </button>
              ) : (
                <button className=" flex justify-between items-center w-full group border-t-2 pt-2">
                  <p className="flex items-center space-x-2 pl-2 text-md whitespace-nowrap">{View.label}</p>
                  <p className="flex items-center pr-2 ">
                    <label className="switch" onClick={(event) => event.stopPropagation()}>
                      <input
                        className="inputShow"
                        type="checkbox"
                        checked={checkedStates[index]}
                        onChange={() => handleChange(View.label, index)}
                      />
                      <div className={`slider ${checkedStates[index] ? 'checked' : ''}`}></div>
                    </label>
                  </p>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
