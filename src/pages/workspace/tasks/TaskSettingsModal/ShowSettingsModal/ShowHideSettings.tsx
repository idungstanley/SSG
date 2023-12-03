import React, { Fragment, useEffect, useState } from 'react';
import { Menu as HeadMenu } from '@headlessui/react';
import { BsChevronRight } from 'react-icons/bs';
import { FiChevronRight } from 'react-icons/fi';
import { useSwitchSettings } from './SwitchSettings';
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
import { Menu } from '@mui/material';
import DropdownTitle from '../../../../../components/DropDowns/DropdownTitle';
import DropdownSubtitle from '../../../../../components/DropDowns/DropdownSubtitle';
import ArrowOpenDown from '../../../../../assets/icons/ArrowOpenDown';
import ShowmenuswitchOn from '../../../../../assets/icons/ShowmenuswitchOn';
import { VerticalScroll } from '../../../../../components/ScrollableContainer/VerticalScroll';

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
    scrollGroupView,
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
  const [dropdownEl, setDropdownEl] = useState<null | HTMLElement>(null);

  const isActiveColor = isAnyactive ? '#BF01FE' : 'black';

  const switchSettings = useSwitchSettings();

  const saveSettingsObj: { [key: string]: boolean } = {
    scrollGroupView,
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
      id: scrollByEachGroup,
      label: scrollByEachGroup
    },
    {
      id: emptyStatuses,
      label: emptyStatuses
    },
    {
      id: 'single_line_mode',
      icon: <FiChevronRight />,
      label: 'Single Line mode'
    },
    {
      id: 'compact_mode',
      icon: <FiChevronRight />,
      label: 'Compact mode'
    },
    {
      id: TaskInMultipleLists,
      label: TaskInMultipleLists
    },
    {
      id: 'upper_case',
      label: 'Upper Case'
    },
    {
      id: entityLocation,
      label: entityLocation
    },
    {
      id: 'title_vertical_grid_line',
      label: 'Title Vertical Grid Line'
    },
    {
      id: verticalGridLines,
      label: verticalGridLines
    },
    {
      id: splitSubtaskTwo,
      label: splitSubtaskTwo
    },
    {
      id: splitSubtaskThree,
      label: splitSubtaskThree
    },
    {
      id: closedSubtask,
      label: closedSubtask
    },
    {
      id: subTaskInMultipleLists,
      label: subTaskInMultipleLists
    },
    {
      id: subTaskParentsNames,
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
        const scrollGroupViewIndex = viewSettings.findIndex((item) => item.label === 'Scroll By Each Group');
        const singleLineIndex = viewSettings.findIndex((item) => item.label === 'Single Line mode');
        const TitleVerticalGridLineIndex = viewSettings.findIndex((item) => item.label === 'Title Vertical Grid Line');
        const CompactView = viewSettings.findIndex((item) => item.label === 'Compact mode');
        const taskUpperCase = viewSettings.findIndex((item) => item.label === 'Upper Case');
        const verticalGrid = viewSettings.findIndex((item) => item.label === 'Property Vertical Grid Line');
        const splitSubtaskTwoState = viewSettings.findIndex((item) => item.label === 'Split 2 level of subtasks');
        const splitSubtaskThreeState = viewSettings.findIndex((item) => item.label === 'Split 3 level of subtasks');

        if (saveSettingList !== undefined && saveSettingList?.view_settings !== null) {
          newState[scrollGroupViewIndex] = saveSettingOnline?.scrollGroupView as boolean;
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
    <>
      <div
        className="flex items-center justify-center viewSettingsParent"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => setDropdownEl(e.currentTarget)}
      >
        <HeadMenu>
          <div
            className={`viewSettingsParent flex justify-center items-center text-${isAnyactive && 'alsoit-purple-50'}`}
          >
            <HeadMenu.Button className="flex">
              <Button active={isAnyactive as boolean}>
                {/* <Icons src={showmenuswitchOn} /> */}
                <ShowmenuswitchOn isActive={isAnyactive as boolean} />
                <span className="pl-1 text-xs">{isActive}</span>
                <span className="px-1">
                  <ArrowOpenDown color={isActiveColor} />
                </span>
              </Button>
            </HeadMenu.Button>
          </div>
        </HeadMenu>
      </div>

      <Menu anchorEl={dropdownEl} open={!!dropdownEl} onClose={() => setDropdownEl(null)} style={{ marginTop: '10px' }}>
        <VerticalScroll>
          <div key="showHideSettings" style={{ zIndex: 61, width: '247px' }} className="w-64 h-96 relative">
            <DropdownTitle content="CUSTOMIZE THIS VIEW" />
            <DropdownSubtitle content="MAIN SETTINGS" />
            <div className="flex items-center justify-between mx-auto mt-4" style={{ width: '93%' }}>
              <p className="text-sm">Property Column </p>
              <BsChevronRight />
            </div>
            {viewSettings.map((view, index) => (
              <Fragment key={view.id}>
                <div
                  className="flex items-center w-full py-2 font-semibold text-left text-alsoit-text-lg"
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
                </div>
              </Fragment>
            ))}
          </div>
        </VerticalScroll>
      </Menu>
    </>
  );
}
