import { Fragment, useState } from 'react';
import { Menu as HeadMenu } from '@headlessui/react';
import Button from '../../../../../../../components/Buttons/Button';
import SubtaskIcon from '../../../../../../../assets/icons/SubtaskIcon';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import {
  setSeparateSubtasksMode,
  setToggleAllSubtask,
  setToggleAllSubtaskSplit
} from '../../../../../../../features/task/taskSlice';
import ArrowDownFilled from '../../../../../../../assets/icons/ArrowDownFilled';
import { Menu } from '@mui/material';
import ArrowOpenDown from '../../../../../../../assets/icons/ArrowOpenDown';

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

interface IViewSetting {
  id: string;
  label: string;
  isUseDropdown: boolean;
  handleClick: (id: string) => void;
  isShow: boolean;
  subLabel?: undefined;
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

  const toggleStyle = toggleAllSubtask ? '#BF01FE' : '#424242';

  const [listView] = useState<boolean>(true);
  const [collapseDropdownId, setCollapseDropdownId] = useState<IOption>(dropdownItems[0]);
  const [expandDropdownId, setExpandDropdownId] = useState<IOption>(dropdownItems[0]);
  const [dropdownEl, setDropdownEl] = useState<null | HTMLElement>(null);
  const [dropdownLevelsEl, setDropdownLevelsEl] = useState<null | HTMLElement>(null);

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
  // const [activeLabel, setActiveLabel] = useState<string>(viewSettings[0].label);
  const [activeViewSetting, setActiveViewSetting] = useState<IViewSetting>();

  return (
    <>
      <div
        className="flex items-center justify-center viewSettingsParent"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => setDropdownEl(e.currentTarget)}
      >
        <HeadMenu>
          <HeadMenu.Button>
            <Button active={toggleAllSubtask}>
              <SubtaskIcon color={toggleStyle} />
              <span className="whitespace-nowrap text-xs">{subtasksTitle}</span>
              <span className="px-1">
                <ArrowOpenDown color={toggleStyle} />
              </span>
            </Button>
          </HeadMenu.Button>
        </HeadMenu>
      </div>

      <Menu anchorEl={dropdownEl} open={!!dropdownEl} onClose={() => setDropdownEl(null)} style={{ marginTop: '10px' }}>
        <div className="w-48" key="viewSettings">
          {viewSettings.map((view) => (
            <Fragment key={view.id}>
              {view.isShow ? (
                <div
                  className={`${
                    view.id !== activeViewId
                      ? 'flex items-center text-sm text-gray-600 text-left w-full hover:bg-gray-300'
                      : listView && view.id === activeViewId && !splitSubTaskState
                      ? 'flex items-center text-sm text-gray-600 text-left w-full bg-primary-200'
                      : 'flex items-center text-sm text-gray-600 text-left w-full'
                  }`}
                  onClick={() => {
                    // setActiveLabel(view.label);
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
                      <div
                        className="flex items-center justify-center ml-1 viewSettingsParent"
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                          setDropdownLevelsEl(e.currentTarget);
                          setActiveViewSetting(view);
                        }}
                      >
                        <HeadMenu>
                          <HeadMenu.Button>
                            <Button active={false} withoutBg={true}>
                              <span className="mr-2 whitespace-nowrap">
                                {view.id === COLLAPSE ? collapseDropdownId.value : expandDropdownId.value}
                              </span>
                              <ArrowDownFilled active={false} />
                            </Button>
                          </HeadMenu.Button>
                        </HeadMenu>
                      </div>
                    ) : null}
                  </button>
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </Menu>

      <Menu
        anchorEl={dropdownLevelsEl}
        open={!!dropdownLevelsEl && !!activeViewSetting}
        onClose={() => setDropdownLevelsEl(null)}
      >
        <div className="w-20" key="ListSubtaks">
          {dropdownItems.map((option) => (
            <div key={option.id} className="flex items-center w-full text-sm text-left text-gray-600 hover:bg-gray-300">
              <button
                onClick={() => {
                  if (activeViewSetting?.id === COLLAPSE) {
                    setCollapseDropdownId(option);
                  } else {
                    setExpandDropdownId(option);
                  }
                  activeViewSetting?.handleClick(option.id);
                  setDropdownLevelsEl(null);
                }}
                className="flex items-center justify-between w-full py-2 group"
              >
                <p className="flex items-center pl-2 space-x-2 text-md">
                  <span>{option.value}</span>
                </p>
              </button>
            </div>
          ))}
        </div>
      </Menu>
    </>
  );
}
