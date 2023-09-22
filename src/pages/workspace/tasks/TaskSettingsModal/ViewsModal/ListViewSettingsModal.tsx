import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BsPinAngle, BsThreeDots } from 'react-icons/bs';
import { useAppDispatch } from '../../../../../app/hooks';
import {
  getCompactView,
  getCompactViewWrap,
  getComfortableView,
  getComfortableViewWrap
} from '../../../../../features/task/taskSlice';
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
import ArrowDownFilled from '../../../../../assets/icons/ArrowDownFilled';
import Button from '../../../../../components/Buttons/Button';
import Icons from '../../../../../components/Icons/Icons';
import List from '../../../../../assets/icons/list.svg';

export default function ListViewSettingsModal({
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
  const [viewId, setViewId] = useState<number | null>(null);
  const [listView] = useState<boolean | null>(true);
  const [activeView, setActiveView] = useState<number | null>(1);

  const ViewSettings = [
    {
      id: 1,
      icon: <img src={listIcon} alt="listIcon" />,
      label: list,
      handleClick: () => dispatch(getComfortableView(true))
    },
    {
      id: 2,
      icon: <img src={tableIcon} alt="tableIcon" />,
      label: table,
      handleClick: () => {
        dispatch(getComfortableView(true));
        dispatch(getComfortableViewWrap(false));
        dispatch(getCompactView(false));
        dispatch(getCompactViewWrap(false));
      }
    },
    {
      id: 3,
      icon: <img src={boardIcon} alt="boardIcon" />,
      label: board,
      handleClick: () => {
        dispatch(getComfortableView(true));
        dispatch(getComfortableViewWrap(false));
        dispatch(getCompactView(false));
        dispatch(getCompactViewWrap(false));
      }
    },
    {
      id: 4,
      icon: <img src={calenderIcon} alt="calenderIcon" />,
      label: calender,
      handleClick: () => {
        dispatch(getComfortableView(false));
        dispatch(getComfortableViewWrap(true));
        dispatch(getCompactView(false));
        dispatch(getCompactViewWrap(false));
      }
    },
    {
      id: 5,
      icon: <img src={timeChartIcon} alt="timeChartIcon" />,
      label: timeChart,
      handleClick: () => {
        dispatch(getComfortableView(false));
        dispatch(getComfortableViewWrap(false));
        dispatch(getCompactView(true));
        dispatch(getCompactViewWrap(false));
      }
    },
    {
      id: 6,
      icon: <img src={mapIcon} alt="mapIcon" />,
      label: map,
      handleClick: () => {
        dispatch(getComfortableView(false));
        dispatch(getComfortableViewWrap(false));
        dispatch(getCompactView(false));
        dispatch(getCompactViewWrap(true));
      }
    },
    {
      id: 7,
      icon: <img src={gantIcon} alt="gantIcon" />,
      label: gantt,
      handleClick: () => {
        dispatch(getComfortableView(false));
        dispatch(getComfortableViewWrap(false));
        dispatch(getCompactView(false));
        dispatch(getCompactViewWrap(true));
      }
    },
    {
      id: 8,
      icon: <img src={teamIcon} alt="teamIcon" />,
      label: team,
      handleClick: () => {
        dispatch(getComfortableView(false));
        dispatch(getComfortableViewWrap(false));
        dispatch(getCompactView(false));
        dispatch(getCompactViewWrap(true));
      }
    },
    {
      id: 9,
      icon: <FiChevronRight />,
      label: 'Create New View',
      handleClick: () => {
        dispatch(getComfortableView(false));
        dispatch(getComfortableViewWrap(false));
        dispatch(getCompactView(false));
        dispatch(getCompactViewWrap(true));
      }
    }
  ];

  return (
    <Menu>
      <div className="flex items-center justify-center viewSettingsParent">
        <Menu.Button>
          <Button active={true}>
            <Icons src={List} /> <span>{isActive}</span> <ArrowDownFilled active={true} />
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
          {ViewSettings.map((View) => (
            <Menu.Item
              as="a"
              key={View.id}
              className={`${
                View.id === viewId && View.id !== activeView
                  ? 'flex items-center py-2 text-sm text-gray-600 text-left w-full hover:bg-gray-300'
                  : listView && View.id === activeView
                  ? 'flex items-center py-2 text-sm text-gray-600 text-left w-full bg-primary-200'
                  : 'flex items-center py-2 text-sm text-gray-600 text-left w-full '
              }`}
              onClick={() => setActiveView(View.id)}
              onMouseEnter={() => setViewId(View.id)}
            >
              {View.label !== 'Create New View' ? (
                <button onClick={View.handleClick} className="flex items-center justify-between w-full  group">
                  <p className="flex items-center pl-2 space-x-2 text-md">
                    <span className="p-0.5">{View.icon}</span> <span>{View.label}</span>
                  </p>
                  <p
                    className={`${
                      View.id === viewId
                        ? 'flex items-center pr-2 opacity-0 group-hover:opacity-100'
                        : 'flex items-center pr-2 opacity-0'
                    }`}
                  >
                    <BsPinAngle onClick={(event) => event.stopPropagation()} />
                    <CiEdit onClick={(event) => event.stopPropagation()} />
                    <BsThreeDots onClick={(event) => event.stopPropagation()} />
                  </p>
                </button>
              ) : (
                <button onClick={View.handleClick}>
                  <p className="flex items-center py-2 pl-2 space-x-2 border-t-2">
                    <span className="bg-primary-200 p-0.5 ">
                      <AiOutlinePlus className=" text-primary-500" />
                    </span>
                    <span className="whitespace-nowrap">{View.label}</span> <span className="p-0.5">{View.icon}</span>
                  </p>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
