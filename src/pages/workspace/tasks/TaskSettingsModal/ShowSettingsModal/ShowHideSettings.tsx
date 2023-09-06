import React, { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BsChevronRight } from 'react-icons/bs';
import { FiChevronRight } from 'react-icons/fi';
import { useSwitchSettings } from './SwitchSettings';
import ShowIcon from '../../../../../assets/icons/ShowIcon';
import ArrowDrop from '../../../../../assets/icons/ArrowDrop';
import Button from '../../../../../components/Buttons/Button';
import toast from 'react-hot-toast';
import SaveSettingsModal from '../SaveSettingsModal/SaveSettingsModal';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  setSaveSettingLocal,
  setSaveSettingOnline,
  setTriggerSaveSettingsModal
} from '../../../../../features/task/taskSlice';

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
  const [isAnyactive, setIsAnyactive] = useState<boolean>();
  const isActiveColor = isAnyactive ? '#BF01FE' : 'black';
  const {
    singleLineView,
    triggerSaveSettingsModal,
    CompactView,
    verticalGrid,
    taskUpperCase,
    verticalGridlinesTask,
    saveSettingLocal
  } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();

  const switchSettings = useSwitchSettings();

  const saveSettingsOnj: { [key: string]: boolean } = {
    singleLineView,
    CompactView,
    verticalGrid,
    taskUpperCase,
    verticalGridlinesTask
  };
  const handleChange = (viewMode: string, index: number) => {
    dispatch(setTriggerSaveSettingsModal(true));
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
    switchSettings(viewMode);
  };

  useEffect(() => {
    dispatch(setSaveSettingLocal(saveSettingsOnj));

    if (triggerSaveSettingsModal) {
      dispatch(setSaveSettingOnline(saveSettingsOnj));
    }
  }, [checkedStates, triggerSaveSettingsModal]);

  const ViewSettings = [
    {
      id: 2,
      label: scrollByEachGroup
    },
    {
      id: 3,
      label: emptyStatuses
    },
    {
      id: 4,
      icon: <FiChevronRight />,
      label: 'Single Line mode'
    },
    {
      id: 5,
      icon: <FiChevronRight />,
      label: 'Compact mode'
    },
    {
      id: 6,
      label: TaskInMultipleLists
    },
    {
      id: 7,
      label: 'Upper Case'
    },
    {
      id: 8,
      label: entityLocation
    },
    {
      id: 9,
      label: 'Title Vertical Grid Line'
    },
    {
      id: 10,
      label: verticalGridLines
    },
    {
      id: 11,
      label: splitSubTask
    },
    {
      id: 12,
      label: closedSubtask
    },
    {
      id: 13,
      label: subTaskInMultipleLists
    },
    {
      id: 14,
      label: subTaskParentsNames
    }
  ];

  useEffect(() => {
    const isAnyTrue = checkedStates.some((value) => value === true);
    setIsAnyactive(isAnyTrue);
  }, [checkedStates]);

  useEffect(() => {
    if (triggerSaveSettingsModal) {
      toast.custom((t) => <SaveSettingsModal title="This view has unsaved changes" toastId={t.id} />, {
        position: 'bottom-right',
        duration: Infinity
      });
    }
  }, [triggerSaveSettingsModal]);

  useEffect(() => {
    const handleCheckboxChange = () => {
      setCheckedStates((prev: boolean[]) => {
        const newState = [...prev];
        const singleLineIndex = ViewSettings.findIndex((item) => item.label === 'Single Line mode');
        const TitleVerticalGridLineIndex = ViewSettings.findIndex((item) => item.label === 'Title Vertical Grid Line');

        newState[singleLineIndex] = true;
        newState[TitleVerticalGridLineIndex] = true;

        return newState;
      });
    };

    handleCheckboxChange();
  }, []);

  return (
    <Menu>
      <div className={`viewSettingsParent flex justify-center items-center text-${isAnyactive && 'alsoit-purple-50'}`}>
        <Menu.Button className="flex ml-1">
          <Button active={isAnyactive as boolean}>
            <ShowIcon color={isActiveColor} /> <span>Show</span> <ArrowDrop color={isActiveColor} />
          </Button>
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
          style={{ zIndex: 61, height: '372px', width: '247px', overflow: 'auto' }}
          className="origin-top-right absolute w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none  mt-3"
        >
          <p className="text-alsoit-text-sm font-bold flex justify-center pt-3" style={{ lineHeight: '9.6px' }}>
            CUSTOMIZE THIS VIEW
          </p>
          <div className="relative flex justify-center flex-col mb-2">
            <p className="border-b-2 pt-3 "></p>
            <span
              className="text-alsoit-text-sm font-bold text-gray-400 text-center absolute  left-1/3  bg-white border border-gray-100 px-1"
              style={{ lineHeight: '9.6px', top: '7px' }}
            >
              MAIN SETTINGS
            </span>
          </div>
          <div className="flex justify-between items-center mx-auto mt-4" style={{ width: '93%' }}>
            <p className="text-sm">Property Column </p>
            <BsChevronRight />
          </div>

          {ViewSettings.map((View, index) => (
            <Menu.Item
              as="a"
              key={View.id}
              className="flex items-center py-2 text-alsoit-text-lg font-semibold text-left w-full "
              style={{ lineHeight: '15.6px' }}
            >
              <button
                className={`flex justify-between items-center w-full group ${
                  View.label == 'Title Vertical Grid Line' && 'border-t-2 pt-4'
                } ${View.label == 'Task In Multiple Lists' && 'border-t-2 pt-4'} ${
                  View.label == 'Split Sub Task' && 'border-t-2 pt-4'
                }`}
              >
                <p className="flex items-center space-x-2 pl-2 text-md whitespace-nowrap">{View.label}</p>
                {View.label == 'Task In Multiple Lists' && (
                  <p className="relative">
                    <p
                      className="absolute whitespace-nowrap text-gray-400 text-center bg-white border border-gray-100"
                      style={{ top: '-35px', right: '23px', fontSize: '8px' }}
                    >
                      TASKS SETTINGS
                    </p>
                  </p>
                )}
                {View.label == 'Title Vertical Grid Line' && (
                  <p className="relative">
                    <p
                      className="absolute whitespace-nowrap text-gray-400 text-center bg-white border border-gray-100"
                      style={{ top: '-35px', right: '28px', fontSize: '8px' }}
                    >
                      GRID SETTINGS
                    </p>
                  </p>
                )}
                {View.label == 'Split Sub Task' && (
                  <p className="relative">
                    <p
                      className="absolute whitespace-nowrap text-gray-400 text-center bg-white border border-gray-100"
                      style={{ top: '-35px', right: '-4px', fontSize: '8px' }}
                    >
                      SUB TASK SETTINGS
                    </p>
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
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
