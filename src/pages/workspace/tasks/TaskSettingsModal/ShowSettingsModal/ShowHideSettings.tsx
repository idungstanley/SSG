import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BsChevronRight, BsListUl, BsPinAngle, BsThreeDots } from 'react-icons/bs';
import { useAppDispatch } from '../../../../../app/hooks';
import {
  getCompactView,
  getCompactViewWrap,
  getComfortableView,
  getComfortableViewWrap
} from '../../../../../features/task/taskSlice';
import { AiOutlineCaretDown, AiOutlineLineChart, AiOutlinePlus } from 'react-icons/ai';
import { HiOutlineTable } from 'react-icons/hi';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { BiCalendar, BiChevronRight } from 'react-icons/bi';
import { RiMapPin5Line } from 'react-icons/ri';
import { CgViewComfortable } from 'react-icons/cg';
import { GiChart } from 'react-icons/gi';
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

export default function ShowHideSettings({
  scrollByEachGroup,
  splitSubTask,
  verticalGridLines,
  entityLocation,
  subTaskParentsNames,
  closedSubtask,
  TaskInMultipleLists,
  subTaskInMultipleLists,
  emptyStatuses
}: {
  scrollByEachGroup: string;
  splitSubTask: string;
  verticalGridLines: string;
  entityLocation: string;
  subTaskParentsNames: string;
  closedSubtask: string;
  TaskInMultipleLists: string;
  subTaskInMultipleLists: string;
  emptyStatuses: string;
}) {
  const dispatch = useAppDispatch();
  const [viewId, setViewId] = useState<number | null>(null);
  const [listView, setListView] = useState<boolean | null>(true);
  const [activeView, setActiveView] = useState<number | null>(1);
  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);

  const handleChange = (index: number) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  const ViewSettings = [
    {
      id: 2,
      icon: <img src={tableIcon} alt="tableIcon" />,
      label: scrollByEachGroup,
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
      label: splitSubTask,
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
      label: verticalGridLines,
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
      label: entityLocation,
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
      label: subTaskParentsNames,
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
      label: closedSubtask,
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
      label: TaskInMultipleLists,
      handleClick: () => {
        dispatch(getComfortableView(false));
        dispatch(getComfortableViewWrap(false));
        dispatch(getCompactView(false));
        dispatch(getCompactViewWrap(true));
      }
    },
    {
      id: 9,
      icon: <img src={teamIcon} alt="teamIcon" />,
      label: subTaskInMultipleLists,
      handleClick: () => {
        dispatch(getComfortableView(false));
        dispatch(getComfortableViewWrap(false));
        dispatch(getCompactView(false));
        dispatch(getCompactViewWrap(true));
      }
    },
    {
      id: 10,
      icon: <img src={teamIcon} alt="teamIcon" />,
      label: emptyStatuses,
      handleClick: () => {
        dispatch(getComfortableView(false));
        dispatch(getComfortableViewWrap(false));
        dispatch(getCompactView(false));
        dispatch(getCompactViewWrap(true));
      }
    },
    {
      id: 11,
      icon: <FiChevronRight />,
      label: 'Wrap text',
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
          <AiOutlineCaretDown className="text-gray-500 h-2.5 w-3" />
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
          className="origin-top-right absolute w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none -ml-8 mt-6 "
        >
          <p className="text-sm flex justify-center">CUSTOMIZE THIS VIEW</p>
          <div className="relative flex justify-center flex-col mb-2">
            <p className="border-b-2 pt-3 "></p>
            <span
              className="text-xs text-gray-400 text-center absolute top-1.5 left-1/3  bg-white border border-gray-100 px-1"
              style={{ fontSize: '8px' }}
            >
              DEFAULT SETTINGS
            </span>
          </div>
          <div className="flex justify-between items-center mx-auto mt-4" style={{ width: '93%' }}>
            <p className="text-sm">Property Column </p>
            <BsChevronRight />
          </div>

          {ViewSettings.map((View, index) => (
            <Menu.Item
              as="a"
              key={View.id}
              className="flex items-center py-2 text-sm text-black text-left w-full "
              onClick={() => setActiveView(View.id)}
              onMouseEnter={() => setViewId(View.id)}
            >
              {View.label !== 'Wrap text' ? (
                <button
                  onClick={View.handleClick}
                  className={`${
                    View.id == 4
                      ? ' flex justify-between items-center w-full group border-b-2 pb-4'
                      : ' flex justify-between items-center w-full group '
                  }`}
                >
                  <p className="flex items-center space-x-2 pl-2 text-md whitespace-nowrap">{View.label}</p>
                  <p className="flex items-center pr-2 ">
                    <label className="switch" onClick={(event) => event.stopPropagation()}>
                      <input
                        className="inputShow"
                        type="checkbox"
                        checked={checkedStates[index]}
                        onChange={() => handleChange(index)}
                      />
                      <div className={`slider ${checkedStates[index] ? 'checked' : ''}`}></div>
                    </label>
                  </p>
                </button>
              ) : (
                <button
                  onClick={View.handleClick}
                  className=" flex justify-between items-center w-full group border-t-2 pt-2"
                >
                  <p className="flex items-center space-x-2 pl-2 text-md whitespace-nowrap">{View.label}</p>
                  <p className="flex items-center pr-2 ">
                    <label className="switch" onClick={(event) => event.stopPropagation()}>
                      <input
                        className="inputShow"
                        type="checkbox"
                        checked={checkedStates[index]}
                        onChange={() => handleChange(index)}
                      />
                      <div className={`slider ${checkedStates[index] ? 'checked' : ''}`}></div>
                    </label>
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
