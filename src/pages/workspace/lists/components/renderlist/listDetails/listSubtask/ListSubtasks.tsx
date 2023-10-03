import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Button from '../../../../../../../components/Buttons/Button';
import SubtaskIcon from '../../../../../../../assets/icons/SubtaskIcon';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import {
  THREE_SUBTASKS_LEVELS,
  TWO_SUBTASKS_LEVELS,
  setSeparateSubtasksMode,
  setToggleAllSubtask,
  setToggleAllSubtaskSplit
} from '../../../../../../../features/task/taskSlice';
import ArrowDownFilled from '../../../../../../../assets/icons/ArrowDownFilled';

export const COLLAPSE_ALL_TWO = 'collapse_all_two';
export const COLLAPSE_ALL_THREE = 'collapse_all_three';
export const EXPAND_ALL_TWO = 'expand_all_two';
export const EXPAND_ALL_THREE = 'expand_all_three';

export default function ListSubtasks({ subtasksTitle }: { subtasksTitle: string }) {
  const dispatch = useAppDispatch();

  const { toggleAllSubtask, toggleAllSubtaskSplit, splitSubTaskState, splitSubTaskLevels } = useAppSelector(
    (state) => state.task
  );

  const [listView] = useState<boolean>(true);

  const viewSettings = [
    {
      id: 'collapse_all',
      label: 'Collapse all',
      subLabel: '(Default)',
      handleClick: () => {
        dispatch(setToggleAllSubtask(false));
      },
      isShow: true
    },
    {
      id: COLLAPSE_ALL_TWO,
      label: 'Collapse all',
      subLabel: '(2 level)',
      handleClick: () => {
        if (toggleAllSubtaskSplit.includes(EXPAND_ALL_TWO)) {
          dispatch(setToggleAllSubtaskSplit(toggleAllSubtaskSplit.filter((id) => id !== EXPAND_ALL_TWO)));
        }
      },
      isShow: splitSubTaskState && splitSubTaskLevels.includes(TWO_SUBTASKS_LEVELS)
    },
    {
      id: COLLAPSE_ALL_THREE,
      label: 'Collapse all',
      subLabel: '(3 level)',
      handleClick: () => {
        if (toggleAllSubtaskSplit.includes(EXPAND_ALL_THREE)) {
          dispatch(setToggleAllSubtaskSplit(toggleAllSubtaskSplit.filter((id) => id !== EXPAND_ALL_THREE)));
        }
      },
      isShow: splitSubTaskState && splitSubTaskLevels.includes(THREE_SUBTASKS_LEVELS)
    },
    {
      id: 'expand_all',
      label: 'Expand all',
      handleClick: () => {
        dispatch(setToggleAllSubtask(true));
      },
      isShow: true
    },
    {
      id: EXPAND_ALL_TWO,
      label: 'Expand all',
      subLabel: '(2 level)',
      handleClick: () => {
        dispatch(setToggleAllSubtaskSplit([...toggleAllSubtaskSplit, EXPAND_ALL_TWO]));
      },
      isShow: splitSubTaskState && splitSubTaskLevels.includes(TWO_SUBTASKS_LEVELS)
    },
    {
      id: EXPAND_ALL_THREE,
      label: 'Expand all',
      subLabel: '(3 level)',
      handleClick: () => {
        dispatch(setToggleAllSubtaskSplit([...toggleAllSubtaskSplit, EXPAND_ALL_THREE]));
      },
      isShow: splitSubTaskState && splitSubTaskLevels.includes(THREE_SUBTASKS_LEVELS)
    },
    {
      id: 'separate_tasks',
      label: 'As separate tasks',
      handleClick: () => {
        dispatch(setSeparateSubtasksMode(true));
      },
      isShow: true
    }
  ];

  const [activeViewId, setActiveViewId] = useState<string>(viewSettings[0].id);
  const [activeLabel, setActiveLabel] = useState<string>(viewSettings[0].label);

  return (
    <div className="flex items-center justify-start space-x-1 ">
      <span className="group cursor-pointer gap-2">
        <Menu>
          <div className="flex items-center justify-center viewSettingsParent">
            <Menu.Button>
              <Button active={toggleAllSubtask}>
                <SubtaskIcon color={toggleAllSubtask ? '#BF01FE' : '#424242'} />
                <span className="whitespace-nowrap">
                  {subtasksTitle}: {activeLabel}
                </span>
                <ArrowDownFilled active={toggleAllSubtask} />
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
              style={{ zIndex: 61 }}
              className="absolute w-48 mt-3 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {viewSettings.map((view) => (
                <Fragment key={view.id}>
                  {view.isShow ? (
                    <Menu.Item
                      as="div"
                      className={`${
                        view.id !== activeViewId
                          ? 'flex items-center text-sm text-gray-600 text-left w-full hover:bg-gray-300'
                          : listView && view.id === activeViewId
                          ? 'flex items-center text-sm text-gray-600 text-left w-full bg-primary-200'
                          : 'flex items-center text-sm text-gray-600 text-left w-full'
                      }`}
                      onClick={() => {
                        setActiveLabel(view.label);
                        setActiveViewId(view.id);
                      }}
                    >
                      <button
                        onClick={view.handleClick}
                        className="flex items-center justify-between w-full py-2 group"
                      >
                        <p className="flex items-center pl-2 space-x-2 text-md">
                          <span>{view.label}</span>
                          {view?.subLabel ? <span className="text-xs italic">{view.subLabel}</span> : null}
                        </p>
                      </button>
                    </Menu.Item>
                  ) : null}
                </Fragment>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </span>
    </div>
  );
}
