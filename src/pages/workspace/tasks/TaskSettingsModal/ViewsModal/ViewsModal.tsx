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
import { FaSquareCaretRight, FaSquareCaretDown } from "react-icons/fa6";
import { IoAddCircle, IoToggle } from 'react-icons/io5';

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

  const [expandedViews, setExpandedViews] = useState<string[]>([]);

  const viewSettings = [
    {
      id: list,
      icon: <ListViewIcon color="#424242" />,
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
      icon: <IoToggle />,
      label: 'Create New View',
      handleClick: (e: React.MouseEvent<HTMLDivElement>) => {
        setCreateNewViewEl(e.currentTarget);
      }
    }
  ];

  // fake data list dropdown
  const exampleListViews = [
    {
      id: 1,
      title: "Default List",
    },
    {
      id: 2,
      title: "Customized List",
    },
    {
      id: 3,
      title: "Custom List",
    },
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

  // function for expanding list view
  const handleToggleExpansion = (viewId: string) => {
    setExpandedViews((prevExpandedViews) => {
      if (prevExpandedViews.includes(viewId)) {
        return prevExpandedViews.filter((id) => id !== viewId);
      } else {
        return [...prevExpandedViews, viewId];
      }
    });
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
              <span className="ml-1 mr-2">View</span>
              <span>
                <ArrowRightPilot active={false} />
              </span>

              <span className="pl-2">
                <Icons src={List} />
              </span>
              <span>{isActive}</span>
              <span className="px-1">
                <ArrowOpenDown color="black" />
              </span>
            </Button>
          </HeadMenu.Button>
        </HeadMenu>
      </div>

      <Menu anchorEl={dropdownEl} open={!!dropdownEl} onClose={() => setDropdownEl(null)} style={{ marginTop: '10px' }}>
        <div className="w-56" key="viewTypes">
          <DropdownTitle content="VIEW TYPES" />
          <DropdownSubtitle content="CHANGE VIEW" />
          {viewSettings.map((view) => (
            <div key={view.id} style={{ color: view.unusing ? 'orange' : '' }}>
              {view.label !== 'Create New View' ? (
                <div
                  className={`flex items-center mx-2 rounded-md py-2 pl-2 space-x-2 cursor-pointer ${view.id === viewId && view.id !== activeView
                    ? 'hover:bg-[#F4F4F4]'
                    : listView && view.id === activeView
                      ? 'bg-primary-200'
                      : ''
                    }`}
                >
                  <div
                    className="flex items-center justify-between w-full group"
                    onMouseEnter={() => setViewId(view.id)}
                  >
                    <div className="flex items-center space-x-2 text-[13px] font-[600] "
                      onClick={() => { setActiveView(view.id); handleToggleExpansion(view.id) }}>
                      <span className='relative'>
                        {view.icon}
                        <span
                          className={`absolute top-0 left-0 right-0 bottom-0 text-[8px] justify-center ${listView && view.id === activeView ? "flex" : "hidden hover:flex"} items-center `}
                        >
                          {expandedViews.includes(view.id) ? <FaSquareCaretDown color="black" /> : <FaSquareCaretRight color="black" />}
                        </span>
                      </span>
                      <span>{view.label}</span>
                    </div>
                    <div
                      className={`${view.id === viewId
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
                    className={`flex items-center py-2 pl-4 space-x-2 border-t-2 cursor-pointer ${view.id === viewId && view.id !== activeView
                      ? 'hover:bg-[#F4F4F4]'
                      : listView && view.id === activeView
                        ? 'bg-primary-200'
                        : ''
                      }`}
                  >
                    <span className=" ">
                      <IoAddCircle className=" text-[#424242] text-[20px]" />
                    </span>
                    <span className="whitespace-nowrap">{view.label}</span> <span className="text-[20px] text-[#A5A5A5]">{view.icon}</span>
                  </div>
                </div>
              )}
              {view.id === activeView && expandedViews.includes(view.id) && (
                // sample text display for list items
                <ul className='pl-8 leading-8 text-[orange]'>
                  {
                    exampleListViews.map((list) => (
                      <li key={list.id} className='flex items-center gap-2'>
                        <ListViewIcon color="orange" />
                        <span>{list.title}</span>
                      </li>
                    ))
                  }
                </ul>
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