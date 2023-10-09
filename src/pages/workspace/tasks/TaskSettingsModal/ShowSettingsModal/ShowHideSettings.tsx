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
  THREE_SUBTASKS_LEVELS,
  TWO_SUBTASKS_LEVELS,
  setSaveSettingLocal,
  setSaveSettingOnline,
  setTriggerSaveSettings,
  setTriggerSaveSettingsModal
} from '../../../../../features/task/taskSlice';

interface IShowHideSettings {
  isActive: string;
  scrollByEachGroup: string;
  splitSubtaskTwo: string;
  splitSubtaskThree: string;
  verticalGridLines: string;
  entityLocation: string;
  subTaskParentsNames: string;
  closedSubtask: string;
  TaskInMultipleLists: string;
  subTaskInMultipleLists: string;
  emptyStatuses: string;
}

export default function ShowHideSettings({
  isActive,
  scrollByEachGroup,
  splitSubtaskTwo,
  splitSubtaskThree,
  verticalGridLines,
  entityLocation,
  subTaskParentsNames,
  closedSubtask,
  TaskInMultipleLists,
  subTaskInMultipleLists,
  emptyStatuses
}: IShowHideSettings) {
  const dispatch = useAppDispatch();

  const {
    singleLineView,
    triggerSaveSettingsModal,
    CompactView,
    verticalGrid,
    taskUpperCase,
    verticalGridlinesTask,
    saveSettingList,
    splitSubTaskState,
    splitSubTaskLevels,
    autoSave,
    saveSettingOnline
  } = useAppSelector((state) => state.task);

  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);
  const [isAnyactive, setIsAnyactive] = useState<boolean>();

  const isActiveColor = isAnyactive ? '#BF01FE' : 'black';

  const switchSettings = useSwitchSettings();

  const saveSettingsObj: { [key: string]: boolean } = {
    singleLineView,
    CompactView,
    verticalGrid,
    taskUpperCase,
    verticalGridlinesTask,
    splitSubTaskState,
    splitSubtaskTwoState: splitSubTaskLevels.includes(TWO_SUBTASKS_LEVELS),
    splitSubtaskThreeState: splitSubTaskLevels.includes(THREE_SUBTASKS_LEVELS),
    autoSave
  };

  useEffect(() => {
    dispatch(setSaveSettingLocal(saveSettingsObj));

    if (triggerSaveSettingsModal) {
      dispatch(setSaveSettingOnline(saveSettingsObj));
    }
  }, [checkedStates, triggerSaveSettingsModal]);

  const viewSettings = [
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
      label: splitSubtaskTwo
    },
    {
      id: 12,
      label: splitSubtaskThree
    },
    {
      id: 13,
      label: closedSubtask
    },
    {
      id: 14,
      label: subTaskInMultipleLists
    },
    {
      id: 15,
      label: subTaskParentsNames
    }
  ];

  useEffect(() => {
    const isAnyTrue = checkedStates.some((value) => value === true);
    setIsAnyactive(isAnyTrue);
  }, [checkedStates]);

  useEffect(() => {
    if (triggerSaveSettingsModal && !autoSave) {
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
        const singleLineIndex = viewSettings.findIndex((item) => item.label === 'Single Line mode');
        const TitleVerticalGridLineIndex = viewSettings.findIndex((item) => item.label === 'Title Vertical Grid Line');
        const CompactView = viewSettings.findIndex((item) => item.label === 'Compact mode');
        const taskUpperCase = viewSettings.findIndex((item) => item.label === 'Upper Case');
        const verticalGrid = viewSettings.findIndex((item) => item.label === 'Property Vertical Grid Line');
        const splitSubtaskTwoState = viewSettings.findIndex((item) => item.label === 'Split 2 level of subtasks');
        const splitSubtaskThreeState = viewSettings.findIndex((item) => item.label === 'Split 3 level of subtasks');

        if (saveSettingList !== undefined && saveSettingList?.view_settings !== null) {
          newState[singleLineIndex] = saveSettingOnline?.singleLineView as boolean;
          newState[TitleVerticalGridLineIndex] = saveSettingOnline?.verticalGridlinesTask as boolean;
          newState[CompactView] = saveSettingOnline?.CompactView as boolean;
          newState[taskUpperCase] = saveSettingOnline?.taskUpperCase as boolean;
          newState[verticalGrid] = saveSettingOnline?.verticalGrid as boolean;
          newState[splitSubtaskTwoState] = saveSettingOnline?.splitSubtaskTwoState as boolean;
          newState[splitSubtaskThreeState] = saveSettingOnline?.splitSubtaskThreeState as boolean;
        } else {
          newState[singleLineIndex] = true;
          newState[TitleVerticalGridLineIndex] = true;
        }
        return newState;
      });
    };

    handleCheckboxChange();
  }, [saveSettingList]);

  const handleChange = (viewMode: string, index: number) => {
    dispatch(setTriggerSaveSettingsModal(true));
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
    switchSettings(viewMode);

    if (autoSave) {
      dispatch(setTriggerSaveSettings(true));
    }
  };

  return (
    <Menu>
      <div className={`viewSettingsParent flex justify-center items-center text-${isAnyactive && 'alsoit-purple-50'}`}>
        <Menu.Button className="flex ml-1">
          <Button active={isAnyactive as boolean}>
            <ShowIcon color={isActiveColor} width="21" height="21" /> <span>{isActive}</span>{' '}
            <ArrowDrop color={isActiveColor} />
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
          className="absolute w-64 mt-3 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <p className="flex justify-center pt-3 font-bold text-alsoit-text-sm" style={{ lineHeight: '9.6px' }}>
            CUSTOMIZE THIS VIEW
          </p>
          <div className="relative flex flex-col justify-center mb-2">
            <p className="pt-3 border-b-2 "></p>
            <span
              className="absolute px-1 font-bold text-center text-gray-400 bg-white border border-gray-100 text-alsoit-text-sm left-1/3"
              style={{ lineHeight: '9.6px', top: '7px' }}
            >
              MAIN SETTINGS
            </span>
          </div>
          <div className="flex items-center justify-between mx-auto mt-4" style={{ width: '93%' }}>
            <p className="text-sm">Property Column </p>
            <BsChevronRight />
          </div>

          {viewSettings.map((view, index) => (
            <Fragment key={view.id}>
              <Menu.Item
                as="a"
                className="flex items-center w-full py-2 font-semibold text-left text-alsoit-text-lg "
                style={{ lineHeight: '15.6px' }}
              >
                <button
                  className={`flex justify-between items-center w-full group ${
                    view.label === 'Title Vertical Grid Line' && 'border-t-2 pt-4'
                  } ${view.label === 'Task In Multiple Lists' && 'border-t-2 pt-4'} ${
                    view.label === 'Split 2 level of subtasks' && 'border-t-2 pt-4'
                  }`}
                >
                  <p className="flex items-center pl-2 space-x-2 text-md whitespace-nowrap">{view.label}</p>
                  {view.label === 'Task In Multiple Lists' && (
                    <p className="relative">
                      <p
                        className="absolute text-center text-gray-400 bg-white border border-gray-100 whitespace-nowrap"
                        style={{ top: '-35px', right: '23px', fontSize: '8px' }}
                      >
                        TASKS SETTINGS
                      </p>
                    </p>
                  )}
                  {view.label === 'Title Vertical Grid Line' && (
                    <p className="relative">
                      <p
                        className="absolute text-center text-gray-400 bg-white border border-gray-100 whitespace-nowrap"
                        style={{ top: '-35px', right: '28px', fontSize: '8px' }}
                      >
                        GRID SETTINGS
                      </p>
                    </p>
                  )}
                  {view.label === 'Split 2 level of subtasks' && (
                    <p className="relative">
                      <p
                        className="absolute text-center text-gray-400 bg-white border border-gray-100 whitespace-nowrap"
                        style={{ top: '-35px', right: '20px', fontSize: '8px' }}
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
                        onChange={() => handleChange(view.label, index)}
                      />
                      <div className={`slider ${checkedStates[index] ? 'checked' : ''}`}></div>
                    </label>
                  </p>
                </button>
              </Menu.Item>
            </Fragment>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
