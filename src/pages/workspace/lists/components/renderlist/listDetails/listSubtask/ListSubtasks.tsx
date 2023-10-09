import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Button from '../../../../../../../components/Buttons/Button';
import SubtaskIcon from '../../../../../../../assets/icons/SubtaskIcon';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import {
  setSeparateSubtasksMode,
  setToggleAllSubtask,
  setToggleAllSubtaskSplit
} from '../../../../../../../features/task/taskSlice';
import ArrowDownFilled from '../../../../../../../assets/icons/ArrowDownFilled';

export const COLLAPSE_ALL_TWO = 'collapse_all_two';
export const COLLAPSE_ALL_THREE = 'collapse_all_three';
export const EXPAND_ALL_TWO = 'expand_all_two';
export const EXPAND_ALL_THREE = 'expand_all_three';
export const COLLAPSE = 'collapse_';
export const EXPAND = 'expand_';

interface IOption {
  id: string;
  value: string;
}

const dropdownItems = [
  {
    id: 'all',
    value: 'all'
  },
  {
    id: 'level_2',
    value: 'level 2'
  },
  {
    id: 'level_3',
    value: 'level 3'
  },
  {
    id: 'level_4',
    value: 'level 4'
  },
  {
    id: 'level_5',
    value: 'level 5'
  },
  {
    id: 'level_6',
    value: 'level 6'
  },
  {
    id: 'level_7',
    value: 'level 7'
  },
  {
    id: 'level_8',
    value: 'level 8'
  },
  {
    id: 'level_9',
    value: 'level 9'
  }
];

export const findExpandedLevels = (id: string) => {
  return id.split('_')[2];
};

export default function ListSubtasks({ subtasksTitle }: { subtasksTitle: string }) {
  const dispatch = useAppDispatch();

  const { toggleAllSubtask, splitSubTaskState } = useAppSelector((state) => state.task);

  const [listView] = useState<boolean>(true);
  const [collapseDropdownId, setCollapseDropdownId] = useState<IOption>(dropdownItems[0]);
  const [expandDropdownId, setExpandDropdownId] = useState<IOption>(dropdownItems[0]);

  const viewSettings = [
    {
      id: 'collapse_all',
      label: 'Collapse all',
      subLabel: '(Default)',
      handleClick: () => {
        dispatch(setToggleAllSubtask(false));
      },
      isShow: !splitSubTaskState
    },
    {
      id: COLLAPSE,
      label: 'Collapse',
      isUseDropdown: true,
      handleClick: (id: string) => {
        dispatch(setToggleAllSubtaskSplit(id === 'all' ? '' : `${EXPAND}${id}`));
      },
      isShow: splitSubTaskState
    },
    {
      id: 'expand_all',
      label: 'Expand all',
      handleClick: () => {
        dispatch(setToggleAllSubtask(true));
      },
      isShow: !splitSubTaskState
    },
    {
      id: EXPAND,
      label: 'Expand',
      isUseDropdown: true,
      handleClick: (id: string) => {
        dispatch(setToggleAllSubtaskSplit(id === 'all' ? `${EXPAND}level_9` : `${EXPAND}${id}`));
      },
      isShow: splitSubTaskState
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
                          : listView && view.id === activeViewId && !splitSubTaskState
                          ? 'flex items-center text-sm text-gray-600 text-left w-full bg-primary-200'
                          : 'flex items-center text-sm text-gray-600 text-left w-full'
                      }`}
                      onClick={() => {
                        setActiveLabel(view.label);
                        setActiveViewId(view.id);
                      }}
                    >
                      <button
                        onClick={view.isUseDropdown ? () => null : (view.handleClick as () => void)}
                        className="flex items-center w-full py-2 group"
                      >
                        <p className="flex items-center pl-2 space-x-2 text-md">
                          <span>{view.label}</span>
                          {view?.subLabel ? <span className="text-xs italic">{view.subLabel}</span> : null}
                        </p>

                        {view.isUseDropdown ? (
                          <Menu>
                            <div className="flex items-center justify-center viewSettingsParent ml-1">
                              <Menu.Button>
                                <Button active={false} withoutBg={true}>
                                  <span className="whitespace-nowrap">
                                    {view.id === COLLAPSE ? collapseDropdownId.value : expandDropdownId.value}
                                  </span>
                                  <ArrowDownFilled active={false} />
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
                                style={{ zIndex: 61, top: '-15px' }}
                                className="absolute w-48 mt-3 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                {dropdownItems.map((option) => (
                                  <Fragment key={view.id}>
                                    {view.isShow ? (
                                      <Menu.Item
                                        as="div"
                                        className="flex items-center text-sm text-gray-600 text-left w-full hover:bg-gray-300"
                                      >
                                        <button
                                          onClick={() => {
                                            if (view.id === COLLAPSE) {
                                              setCollapseDropdownId(option);
                                            } else {
                                              setExpandDropdownId(option);
                                            }
                                            view.handleClick(option.id);
                                          }}
                                          className="flex items-center justify-between w-full py-2 group"
                                        >
                                          <p className="flex items-center pl-2 space-x-2 text-md">
                                            <span>{option.value}</span>
                                          </p>
                                        </button>
                                      </Menu.Item>
                                    ) : null}
                                  </Fragment>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        ) : null}
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
