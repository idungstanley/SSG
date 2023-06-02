import React from 'react';
import { Button } from '../../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { getBoardView, getCalendeView, getListView, getMapView } from '../../../../../features/task/taskSlice';
import { getTableView } from '../../../../../features/task/taskSlice';
import TaskMenu from '../../../tasks/component/taskMenu/TaskMenu';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import { BsListStars } from 'react-icons/bs';
import { RxDividerVertical } from 'react-icons/rx';
import { CiViewTable } from 'react-icons/ci';
import ListViewSettingsModal from '../../../tasks/TaskSettingsModal/ViewsModal/ListViewSettingsModal';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { BiShow } from 'react-icons/bi';
import ShowHideSettings from '../../../tasks/TaskSettingsModal/ShowSettingsModal/ShowHideSettings';
import subtaskIcon from '../../../../../assets/icons/subtaskIcon.png';

interface ListNavProps {
  navName?: string | null;
  viewsList?: string;
  viewsList1?: string;
  viewsList2?: string;
  viewsList3?: string;
  viewsList4?: string;
  changeViews?: string;
  Assigned?: string;
  buttonLabel?: string;
}

function ListNav({ viewsList, changeViews, viewsList1 }: ListNavProps) {
  const { showTaskNavigation, listView, tableView, boardView, calenderView, mapView } = useAppSelector(
    (state) => state.task
  );

  const dispatch = useAppDispatch();
  const handleBoardView = () => {
    dispatch(getBoardView(true));
    dispatch(getTableView(false));
    dispatch(getListView(false));
    dispatch(getCalendeView(false));
    dispatch(getMapView(false));
  };
  const handleTableView = () => {
    dispatch(getTableView(true));
    dispatch(getBoardView(false));
    dispatch(getListView(false));
    dispatch(getCalendeView(false));
    dispatch(getMapView(false));
  };
  const handleView = () => {
    dispatch(getListView(true));
    dispatch(getBoardView(false));
    dispatch(getTableView(false));
    dispatch(getCalendeView(false));
    dispatch(getMapView(false));
  };
  const handleCalenderView = () => {
    dispatch(getListView(false));
    dispatch(getBoardView(false));
    dispatch(getTableView(false));
    dispatch(getCalendeView(true));
    dispatch(getMapView(false));
  };
  const handleMapView = () => {
    dispatch(getListView(false));
    dispatch(getBoardView(false));
    dispatch(getTableView(false));
    dispatch(getCalendeView(false));
    dispatch(getMapView(true));
  };

  return (
    <>
      {showTaskNavigation && (
        <div className="w-full p-2">
          <span className="w-12/12 transition duration-300 ease-in-out ">
            <TaskMenu />
          </span>
        </div>
      )}
      <nav
        className="flex items-center justify-between  overflow-hidden bg-white border-b border-gray-200 h-14"
        style={{ padding: '1px 15px 2px 15px', height: '50px' }}
      >
        <section className="flex items-center justify-start">
          <div className="flex pt-3 space-x-2">
            <div className="flex items-center justify-start space-x-1 " onClick={handleView}>
              <span className="flex">
                <span className="viewSettingsParent space-x-1 flex items-center pb-2 pt-1 mb-2  text-sm  cursor-pointer bg-primary-50 rounded-sm ">
                  <span className="mt-1">
                    <BsListStars className={'flex-shrink-0 w-5 h-4'} aria-hidden="true" />
                  </span>
                  <span className="group flex items-center text-sm  cursor-pointer gap-2 font-bold">
                    {viewsList}
                    <span>
                      <ListViewSettingsModal
                        list="List"
                        table="Table"
                        board="Board"
                        calender="Calender "
                        timeChart="TimeChart "
                        map="Map "
                        gantt="Gantt"
                        team="Team"
                      />
                    </span>
                  </span>
                </span>
              </span>
            </div>

            <div className="flex items-center justify-start space-x-1">
              <span className=" space-x-1 flex items-center pb-2 pt-1 mb-2  text-sm  cursor-pointer bg-gray-200 rounded-sm">
                <span>
                  <BiShow className="flex-shrink-0 w-5 h-4" aria-hidden="true" />
                </span>
                <span className="group  flex items-center text-sm  cursor-pointer gap-2 font-bold">
                  {changeViews}
                  <span className="">
                    <ShowHideSettings
                      scrollByEachGroup="Scroll By Each Group"
                      splitSubTask="Split Sub Task"
                      verticalGridLines="Vertical Gridlines"
                      entityLocation="Entity Location"
                      subTaskParentsNames="Subtask Parent Names"
                      closedSubtask="Closed Subtask"
                      TaskInMultipleLists="Task In Multiple Lista"
                      subTaskInMultipleLists="Subtask In Multiple Lists"
                      emptyStatuses="Empty Statuses"
                    />
                  </span>
                </span>
              </span>
            </div>

            <div className="flex items-center justify-start space-x-1 w-full">
              <span className=" space-x-1 flex items-center pb-2 pt-1 mb-2  text-sm  cursor-pointer bg-gray-200 rounded-sm min-w-max px-1">
                <img src={subtaskIcon} className=" " alt="subtaskIcon" />
                <span className="flex items-center text-sm  cursor-pointer font-bold">{viewsList1}</span>
              </span>
            </div>
          </div>
        </section>
      </nav>
    </>
  );
}

export default ListNav;
