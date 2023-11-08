import { Fragment, ReactNode, useEffect, useState } from 'react';
import { BsChevronRight, BsThreeDotsVertical } from 'react-icons/bs';
import Button from '../../../Buttons/Button';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useSwitchSettings } from '../../../../pages/workspace/tasks/TaskSettingsModal/ShowSettingsModal/SwitchSettings';
import {
  THREE_SUBTASKS_LEVELS,
  TWO_SUBTASKS_LEVELS,
  setAutoSave,
  setSaveSettingLocal,
  setSaveSettingOnline,
  setTriggerAutoSave,
  setTriggerSaveSettings
} from '../../../../features/task/taskSlice';
import AlsoitMenuDropdown from '../../../DropDowns';
interface IShowHideSettings {
  itemsArray: [
    {
      label: string;
      icon?: ReactNode;
    }
  ];
}

export default function ListSettingsModal({ itemsArray }: IShowHideSettings) {
  const dispatch = useAppDispatch();

  const {
    autoSave,
    singleLineView,
    CompactView,
    verticalGrid,
    saveSettingList,
    taskUpperCase,
    saveSettingOnline,
    verticalGridlinesTask,
    splitSubTaskState,
    triggerAutoSave,
    splitSubTaskLevels
  } = useAppSelector((state) => state.task);
  const { activeItemId } = useAppSelector((state) => state.workspace);

  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);
  const [isAnyactive, setIsAnyactive] = useState<boolean>();

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
    dispatch(setSaveSettingOnline(saveSettingsObj));
  }, [checkedStates]);

  const switchSettings = useSwitchSettings();

  useEffect(() => {
    const isAnyTrue = checkedStates.some((value) => value === true);
    setIsAnyactive(isAnyTrue);
  }, [checkedStates]);

  useEffect(() => {
    const handleCheckboxChange = () => {
      if (!triggerAutoSave) {
        setCheckedStates((prev: boolean[]) => {
          const newState = [...prev];
          const AutoSaveIndex = itemsArray.findIndex((item) => item.label == 'AutoSave View');

          if (saveSettingList != undefined && saveSettingList?.view_settings != null) {
            newState[AutoSaveIndex] = saveSettingOnline?.autoSave as boolean;
          } else {
            dispatch(setAutoSave(false));
            newState[AutoSaveIndex] = false;
          }
          return newState;
        });
      }
    };

    handleCheckboxChange();
  }, [saveSettingList, activeItemId, autoSave]);

  const handleChange = (viewMode: string, index: number) => {
    dispatch(setTriggerSaveSettings(true));
    dispatch(setTriggerAutoSave(true));
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
    switchSettings(viewMode);
  };

  const [isOpen, setIsOpen] = useState<HTMLDivElement | null>(null);

  const handleCloseDropdown = () => {
    setIsOpen(null);
  };
  const handleOpenDropdown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsOpen(event.currentTarget);
  };

  return (
    <>
      <div
        className={`viewSettingsParent flex justify-center items-center text-${isAnyactive && 'alsoit-purple-50'}`}
        onClick={(e) => handleOpenDropdown(e)}
      >
        <Button active={isAnyactive as boolean}>
          <BsThreeDotsVertical />
        </Button>
      </div>

      <AlsoitMenuDropdown handleClose={handleCloseDropdown} anchorEl={isOpen}>
        <div className="flex justify-between items-center mx-auto mt-4" style={{ width: '93%' }}>
          <p className="text-sm">VIEW SETTINGS</p>
          <BsChevronRight />
        </div>

        {itemsArray.map((view, index) => (
          <Fragment key={view.label}>
            <div
              className="flex items-center py-2 text-alsoit-text-lg font-semibold text-left w-full "
              style={{ lineHeight: '15.6px' }}
            >
              <button className={'flex justify-between items-center w-full group '}>
                <div className="flex items-center space-x-2 pl-2 text-md whitespace-nowrap">
                  <p className="flex items-center space-x-2 pl-2 text-md whitespace-nowrap">{view.icon}</p>
                  <p>{view.label}</p>
                </div>
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
      </AlsoitMenuDropdown>
    </>
  );
}
