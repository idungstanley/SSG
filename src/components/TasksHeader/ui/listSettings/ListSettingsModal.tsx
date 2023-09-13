import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BsChevronRight, BsThreeDotsVertical } from 'react-icons/bs';
import ShowIcon from '../../../../assets/icons/ShowIcon';
import ArrowDrop from '../../../../assets/icons/ArrowDrop';
import Button from '../../../Buttons/Button';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useSwitchSettings } from '../../../../pages/workspace/tasks/TaskSettingsModal/ShowSettingsModal/SwitchSettings';
import {
  setAutoSave,
  setSaveSettingLocal,
  setSaveSettingOnline,
  setTriggerAutoSave,
  setTriggerSaveSettings,
  setTriggerSaveSettingsModal
} from '../../../../features/task/taskSlice';
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
    splitSubTaskState
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

  return (
    <Menu>
      <div className={`viewSettingsParent flex justify-center items-center text-${isAnyactive && 'alsoit-purple-50'}`}>
        <Menu.Button className="flex ml-1">
          <Button active={isAnyactive as boolean}>
            <BsThreeDotsVertical />
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
          style={{ zIndex: 61, height: '300px', width: '247px', overflow: 'auto' }}
          className="origin-top-right absolute w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none  mt-3"
        >
          <div className="flex justify-between items-center mx-auto mt-4" style={{ width: '93%' }}>
            <p className="text-sm">VIEW SETTINGS</p>
            <BsChevronRight />
          </div>

          {itemsArray.map((view, index) => (
            <Fragment key={view.label}>
              <Menu.Item
                as="a"
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
              </Menu.Item>
            </Fragment>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
