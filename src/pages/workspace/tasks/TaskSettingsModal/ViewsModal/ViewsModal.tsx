import React, { useState } from 'react';
import { Menu as HeadMenu } from '@headlessui/react';
import { BsPinAngle, BsThreeDots } from 'react-icons/bs';
import { useAppDispatch } from '../../../../../app/hooks';
import { getCompactView } from '../../../../../features/task/taskSlice';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiChevronRight } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import listIcon from '../../../../../assets/icons/listIcon.png';
import tableIcon from '../../../../../assets/icons/tableIcon.png';
import boardIcon from '../../../../../assets/icons/boardIcon.png';
import calenderIcon from '../../../../../assets/icons/calenderIcon.png';
import timeChartIcon from '../../../../../assets/icons/timeChartIcon.png';
import mapIcon from '../../../../../assets/icons/mapIcon.png';
import gantIcon from '../../../../../assets/icons/gantIcon.png';
import teamIcon from '../../../../../assets/icons/teamIcon.png';
import Button from '../../../../../components/Buttons/Button';
import Icons from '../../../../../components/Icons/Icons';
import List from '../../../../../assets/icons/list.svg';
import ArrowDrop from '../../../../../assets/icons/ArrowDrop';
import { Menu } from '@mui/material';
import ViewListThreeDots from './ViewListThreeDots';
import CreateNewViewModal from './CreateNewViewModal';

export default function ViewsModal({
  isActive,
  list,
  table,
  board,
  calender,
  timeChart,
  map,
  gantt,
  team
}: {
  isActive: string;
  list: string;
  table: string;
  board: string;
  calender: string;
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

  const viewSettings = [
    {
      id: list,
      icon: <img src={listIcon} alt="listIcon" />,
      label: list,
      handleClick: () => null,
      handleThreeDotsClick: (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        setThreeDotsEl(e.currentTarget);
        setThreeDotsId(list);
      }
    },
    {
      id: table,
      icon: <img src={tableIcon} alt="tableIcon" />,
      label: table,
      handleClick: () => {
        dispatch(getCompactView(false));
      },
      unusing: true
    },
    {
      id: board,
      icon: <img src={boardIcon} alt="boardIcon" />,
      label: board,
      handleClick: () => {
        dispatch(getCompactView(false));
      },
      unusing: true
    },
    {
      id: calender,
      icon: <img src={calenderIcon} alt="calenderIcon" />,
      label: calender,
      handleClick: () => {
        dispatch(getCompactView(false));
      },
      unusing: true
    },
    {
      id: timeChart,
      icon: <img src={timeChartIcon} alt="timeChartIcon" />,
      label: timeChart,
      handleClick: () => {
        dispatch(getCompactView(true));
      },
      unusing: true
    },
    {
      id: map,
      icon: <img src={mapIcon} alt="mapIcon" />,
      label: map,
      handleClick: () => {
        dispatch(getCompactView(false));
      },
      unusing: true
    },
    {
      id: gantt,
      icon: <img src={gantIcon} alt="gantIcon" />,
      label: gantt,
      handleClick: () => {
        dispatch(getCompactView(false));
      },
      unusing: true
    },
    {
      id: team,
      icon: <img src={teamIcon} alt="teamIcon" />,
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
              <Icons src={List} />
              <span className="ml-1 mr-2">View:</span>
              <span>{isActive}</span>
              <ArrowDrop color="black" />
            </Button>
          </HeadMenu.Button>
        </HeadMenu>
      </div>

      <Menu anchorEl={dropdownEl} open={!!dropdownEl} onClose={() => setDropdownEl(null)} style={{ marginTop: '10px' }}>
        <div style={{ zIndex: 61 }} className="w-48">
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
                    <div className="flex items-center pl-2 space-x-2 text-md" onClick={() => setActiveView(view.id)}>
                      <span
                        className="p-0.5"
                        style={{ background: view.unusing ? 'orange' : '', opacity: view.unusing ? '0.5' : '1' }}
                      >
                        {view.icon}
                      </span>
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
        {renderThreeDotsMenu(threeDotsId)}
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
        <CreateNewViewModal closeAllModal={handleCloseAllModal} />
      </Menu>
    </>
  );
}
