import React, { useState } from 'react';
import { Menu as HeadMenu } from '@headlessui/react';
import { BsPinAngle, BsThreeDots } from 'react-icons/bs';
import { useAppDispatch } from '../../../../../app/hooks';
import { getCompactView } from '../../../../../features/task/taskSlice';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiChevronRight } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import Button from '../../../../../components/Buttons/Button';
import Icons from '../../../../../components/Icons/Icons';
import List from '../../../../../assets/icons/list.svg';
import view from '../../../../../assets/icons/view.svg';
// import ArrowDrop from '../../../../../assets/icons/ArrowDrop';
import { Menu } from '@mui/material';
import ViewListThreeDots from './ViewListThreeDots';
import CreateNewViewModal from './CreateNewViewModal';
import TeamIcon from '../../../../../assets/icons/TeamIcon';
import GanttIcon from '../../../../../assets/icons/GanttIcon';
import MapIcon from '../../../../../assets/icons/MapIcon';
import TimeChartIcon from '../../../../../assets/icons/TimeChartIcon';
import CalendarViewIcon from '../../../../../assets/icons/CalendarViewIcon';
import BoardIcon from '../../../../../assets/icons/BoardIcon';
import TableIcon from '../../../../../assets/icons/TableIcon';
import ListViewIcon from '../../../../../assets/icons/ListViewIcon';
import DropdownTitle from '../../../../../components/DropDowns/DropdownTitle';
import DropdownSubtitle from '../../../../../components/DropDowns/DropdownSubtitle';
import ArrowRightPilot from '../../../../../assets/icons/ArrowRightPilot';
import ArrowOpenDown from '../../../../../assets/icons/ArrowOpenDown';
import { ACTIVE_BUTTON, DEFAULT_BUTTON } from '../../../../../utils/Constants/ButtonInteractions';

export default function ViewsModal({
  isActive,
  list,
  table,
  board,
  calendar,
  timeChart,
  map,
  gantt,
  team
}: {
  isActive: string;
  list: string;
  table: string;
  board: string;
  calendar: string;
  timeChart: string;
  map: string;
  gantt: string;
  team: string;
}) {
  const dispatch = useAppDispatch();
  const [viewId, setViewId] = useState<string | null>(null);
  const [listView] = useState<boolean | null>(true);
  const [activeView, setActiveView] = useState<string | null>(list);
  const [threeDotsId, setThreeDotsId] = useState<string>('');
  // modals state
  const [dropdownEl, setDropdownEl] = useState<null | HTMLElement>(null);
  const [createNewViewEl, setCreateNewViewEl] = useState<null | HTMLDivElement>(null);
  const [threeDotsEl, setThreeDotsEl] = useState<null | SVGElement>(null);

  const activeStyle = isActive ? ACTIVE_BUTTON.color : DEFAULT_BUTTON.color;

  const viewSettings = [
    {
      id: list,
      icon: <ListViewIcon color="orange" />,
      label: list,
      handleClick: () => null,
      handleThreeDotsClick: (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        setThreeDotsEl(e.currentTarget);
        setThreeDotsId(list);
      }
    },
    {
      id: table,
      icon: <TableIcon color="orange" />,
      label: table,
      handleClick: () => {
        dispatch(getCompactView(false));
      },
      unusing: true
    },
    {
      id: board,
      icon: <BoardIcon color="orange" />,
      label: board,
      handleClick: () => {
        dispatch(getCompactView(false));
      },
      unusing: true
    },
    {
      id: calendar,
      icon: <CalendarViewIcon color="orange" />,
      label: calendar,
      handleClick: () => {
        dispatch(getCompactView(false));
      },
      unusing: true
    },
    {
      id: timeChart,
      icon: <TimeChartIcon color="orange" />,
      label: timeChart,
      handleClick: () => {
        dispatch(getCompactView(true));
      },
      unusing: true
    },
    {
      id: map,
      icon: <MapIcon color="orange" />,
      label: map,
      handleClick: () => {
        dispatch(getCompactView(false));
      },
      unusing: true
    },
    {
      id: gantt,
      icon: <GanttIcon color="orange" />,
      label: gantt,
      handleClick: () => {
        dispatch(getCompactView(false));
      },
      unusing: true
    },
    {
      id: team,
      icon: <TeamIcon color="orange" />,
      label: team,
      handleClick: () => {
        dispatch(getCompactView(false));
      },
      unusing: true
    },
    {
      id: 'create_new_view',
      icon: <FiChevronRight />,
      label: 'Create New View',
      handleClick: (e: React.MouseEvent<HTMLDivElement>) => {
        setCreateNewViewEl(e.currentTarget);
      }
    }
  ];

  const handleCloseAllModal = () => {
    setDropdownEl(null);
    setThreeDotsEl(null);
    setCreateNewViewEl(null);
  };

  const renderThreeDotsMenu = (id: string) => {
    switch (id) {
      case list:
        return <ViewListThreeDots closeAllModal={handleCloseAllModal} />;
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center viewSettingsParent"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => setDropdownEl(e.currentTarget)}
      >
        <HeadMenu>
          <HeadMenu.Button>
            <Button active={true}>
              <Icons src={view} />
              <span className="ml-1 mr-2 text-xs">View</span>
              <span>
                <ArrowRightPilot active={false} />
              </span>

              <span className="pl-2">
                <Icons src={List} />
              </span>
              <span className=" text-xs">{isActive}</span>
              <span className="px-1">
                <ArrowOpenDown color={activeStyle} />
              </span>
            </Button>
          </HeadMenu.Button>
        </HeadMenu>
      </div>

      <Menu anchorEl={dropdownEl} open={!!dropdownEl} onClose={() => setDropdownEl(null)} style={{ marginTop: '10px' }}>
        <div className="w-48" key="viewTypes">
          <DropdownTitle content="VIEW TYPES" />
          <DropdownSubtitle content="CHANGE VIEW" />
          {viewSettings.map((view) => (
            <div key={view.id} style={{ color: view.unusing ? 'orange' : '' }}>
              {view.label !== 'Create New View' ? (
                <div
                  className={`flex items-center py-2 pl-2 space-x-2 cursor-pointer ${
                    view.id === viewId && view.id !== activeView
                      ? 'hover:bg-gray-300'
                      : listView && view.id === activeView
                      ? 'bg-primary-200'
                      : ''
                  }`}
                >
                  <div
                    className="flex items-center justify-between w-full group"
                    onMouseEnter={() => setViewId(view.id)}
                  >
                    <div className="flex items-center space-x-2 text-md" onClick={() => setActiveView(view.id)}>
                      <span>{view.icon}</span>
                      <span>{view.label}</span>
                    </div>
                    <div
                      className={`${
                        view.id === viewId
                          ? 'flex items-center pr-2 opacity-0 group-hover:opacity-100'
                          : 'flex items-center pr-2 opacity-0'
                      }`}
                    >
                      <BsPinAngle color="orange" onClick={(event) => event.stopPropagation()} />
                      <CiEdit color="orange" onClick={(event) => event.stopPropagation()} />
                      <BsThreeDots
                        onClick={view.handleThreeDotsClick ? (e) => view.handleThreeDotsClick(e) : () => null}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div onClick={(e) => view.handleClick(e)} onMouseEnter={() => setViewId(view.id)}>
                  <div
                    className={`flex items-center py-2 pl-2 space-x-2 border-t-2 cursor-pointer ${
                      view.id === viewId && view.id !== activeView
                        ? 'hover:bg-gray-300'
                        : listView && view.id === activeView
                        ? 'bg-primary-200'
                        : ''
                    }`}
                  >
                    <span className="bg-primary-200 p-0.5 ">
                      <AiOutlinePlus className=" text-primary-500" />
                    </span>
                    <span className="whitespace-nowrap">{view.label}</span> <span className="p-0.5">{view.icon}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Menu>
      {/* three dots menu */}
      <Menu anchorEl={threeDotsEl} open={!!threeDotsEl} onClose={() => setThreeDotsEl(null)}>
        <div key="threeDotsEl">{renderThreeDotsMenu(threeDotsId)}</div>
      </Menu>
      {/* create new menu */}
      <Menu
        open={!!createNewViewEl}
        onClose={() => setCreateNewViewEl(null)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <div key="CreateNewViewModal">
          <CreateNewViewModal closeAllModal={handleCloseAllModal} />
        </div>
      </Menu>
    </>
  );
}
