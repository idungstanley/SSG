import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BsListUl, BsPinAngle, BsThreeDots } from 'react-icons/bs';
import { useAppDispatch } from '../../../../app/hooks';
import {
  getCompactView,
  getCompactViewWrap,
  getComfortableView,
  getComfortableViewWrap
} from '../../../../features/task/taskSlice';
import { AiOutlineCaretDown, AiOutlineLineChart, AiOutlinePlus } from 'react-icons/ai';
import { HiOutlineTable } from 'react-icons/hi';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { BiCalendar } from 'react-icons/bi';
import { RiMapPin5Line } from 'react-icons/ri';
import { CgViewComfortable } from 'react-icons/cg';
import { GiChart } from 'react-icons/gi';
import { FiChevronRight } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';

export default function ListViewSettingsModal({
  list,
  table,
  board,
  calender,
  timeChart,
  map,
  gantt,
  team
}: {
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
  const [listView, setListView] = useState<boolean | null>(true);
  const [activeView, setActiveView] = useState<number | null>(1);

  const ViewSettings = [
    {
      id: 1,
      icon: <BsListUl />,
      label: list,
      handleClick: () => dispatch(getComfortableView(true))
    },
    {
      id: 2,
      icon: <HiOutlineTable />,
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
      icon: <MdOutlineSpaceDashboard />,
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
      icon: <BiCalendar />,
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
      icon: <AiOutlineLineChart />,
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
      icon: <RiMapPin5Line />,
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
      icon: <CgViewComfortable />,
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
      icon: <GiChart />,
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
      <div className="viewSettingsParent flex justify-center items-center">
        <Menu.Button>
          <AiOutlineCaretDown className="text-pink-500" />
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
          className="origin-top-right absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none "
        >
          {ViewSettings.map((View) => (
            <Menu.Item
              as="a"
              key={View.id}
              className={`${
                View.id == viewId && View.id !== activeView
                  ? 'flex items-center py-2 text-sm text-gray-600 text-left w-full hover:bg-gray-300'
                  : listView && View.id == activeView
                  ? 'flex items-center py-2 text-sm text-gray-600 text-left w-full bg-primary-200'
                  : 'flex items-center py-2 text-sm text-gray-600 text-left w-full '
              }`}
              onClick={() => setActiveView(View.id)}
              onMouseEnter={() => setViewId(View.id)}
            >
              {View.label !== 'Create New View' ? (
                <button onClick={View.handleClick} className=" flex justify-between items-center w-full group ">
                  <p className="flex items-center space-x-2 pl-2 text-md">
                    <span className="p-0.5">{View.icon}</span> <span>{View.label}</span>
                  </p>
                  <p
                    className={`${
                      View.id == viewId
                        ? 'flex items-center pr-2 opacity-0 group-hover:opacity-100'
                        : 'flex items-center pr-2 opacity-0'
                    }`}
                  >
                    <BsPinAngle />
                    <CiEdit />
                    <BsThreeDots />
                  </p>
                </button>
              ) : (
                <button onClick={View.handleClick}>
                  <p className="flex items-center space-x-2 border-t-2 pl-2 py-2">
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
