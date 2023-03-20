import React from 'react';
import { Button } from '../../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { getBoardView, getListView } from '../../../../../features/task/taskSlice';
import { getTableView } from '../../../../../features/task/taskSlice';
import TaskMenu from '../../../tasks/component/taskMenu/TaskMenu';
import { Bars3Icon, EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import { BsListStars } from 'react-icons/bs';
import { RxDividerVertical } from 'react-icons/rx';
import { CiViewTable } from 'react-icons/ci';
import ListViewSettingsModal from '../../../tasks/viewSettingsModal/ListViewSettingsModal';

interface ListNavProps {
  navName?: string | null;
  viewsList?: string;
  viewsList1?: string;
  viewsList2?: string;
  changeViews?: string;
  Assigned?: string;
  buttonLabel?: string;
}

function ListNav({ navName, viewsList, viewsList1, viewsList2, changeViews, Assigned, buttonLabel }: ListNavProps) {
  const { showTaskNavigation, listView, tableView, boardView } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();
  const handleBoardView = () => {
    dispatch(getBoardView(true));
    dispatch(getTableView(false));
    dispatch(getListView(false));
  };
  const handleTableView = () => {
    dispatch(getTableView(true));
    dispatch(getBoardView(false));
    dispatch(getListView(false));
  };
  const handleListView = () => {
    dispatch(getListView(true));
    dispatch(getBoardView(false));
    dispatch(getTableView(false));
  };

  return (
    <>
      <div className="w-full p-2">
        {showTaskNavigation && (
          <span className="w-12/12 transition duration-300 ease-in-out ">
            <TaskMenu />
          </span>
        )}
      </div>
      <nav
        className="flex items-center justify-between  overflow-hidden bg-white border-b border-gray-200 h-30"
        style={{ padding: '15px' }}
      >
        <section className="flex items-center justify-start">
          <span className="space-x-2">
            <span className="font-bold font-bold pr-2">{navName}</span>
          </span>
          <div className="flex pt-3">
            <p className="flex items-center justify-start space-x-1 " onClick={handleListView}>
              <span className="flex">
                <span
                  className={`${
                    listView
                      ? 'border-b-4 rounded border-purple-600 viewSettingsParent gap-2 pb-3  flex items-center text-sm hover:bg-gray-100 cursor-pointer'
                      : 'viewSettingsParent gap-2 flex items-center pb-3  text-sm hover:bg-gray-100 cursor-pointer'
                  }`}
                >
                  <span>
                    <BsListStars
                      className={`${listView ? 'flex-shrink-0 w-5 text-purple-600 h-4' : 'flex-shrink-0 w-5 h-4'}`}
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className={`${
                      listView
                        ? 'group viewSettingsParent text-purple-600 flex items-center text-sm hover:bg-gray-100 cursor-pointer gap-2 font-bold'
                        : 'group viewSettingsParent flex items-center text-sm hover:bg-gray-100 cursor-pointer gap-2 font-bold'
                    }`}
                  >
                    {viewsList}
                    <span>
                      <ListViewSettingsModal
                        viewSettings="List Settings"
                        comfortableView="Comfortable View"
                        comfortableViewWrap="Comfortable Wrap"
                        compactViews="Compact View"
                        compactViewsWrap="Compact Wrap"
                      />
                    </span>
                  </span>
                </span>
                <RxDividerVertical className="mt-0.5" />
              </span>
            </p>

            <p className="flex items-center justify-start space-x-1" onClick={handleTableView}>
              <span className="flex">
                <span
                  className={`${
                    tableView
                      ? 'border-b-4 rounded border-purple-600 viewSettingsParent gap-2 pb-3  flex items-center text-sm hover:bg-gray-100 cursor-pointer'
                      : 'viewSettingsParent gap-2 flex items-center pb-3  text-sm hover:bg-gray-100 cursor-pointer'
                  }`}
                >
                  <span>
                    <CiViewTable
                      className={`${tableView ? 'flex-shrink-0 w-5 text-purple-600 h-4' : 'flex-shrink-0 w-5 h-4'}`}
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className={`${
                      tableView
                        ? 'group viewSettingsParent text-purple-600 flex items-center text-sm hover:bg-gray-100 cursor-pointer gap-2 font-bold'
                        : 'group viewSettingsParent flex items-center text-sm hover:bg-gray-100 cursor-pointer gap-2 font-bold'
                    }`}
                  >
                    {viewsList1}
                    <span className="">
                      <ListViewSettingsModal
                        viewSettings="Table Settings"
                        comfortableView=""
                        comfortableViewWrap=""
                        compactViews=""
                        compactViewsWrap=""
                      />
                    </span>
                  </span>
                </span>
                <RxDividerVertical className="mt-0.5" />
              </span>
            </p>

            <p className="flex items-center justify-start space-x-1" onClick={handleBoardView}>
              <span className="flex">
                <span
                  className={`${
                    boardView
                      ? 'border-b-4 rounded border-purple-600 viewSettingsParent gap-2 pb-3  flex items-center text-sm hover:bg-gray-100 cursor-pointer'
                      : 'viewSettingsParent gap-2 flex items-center pb-3  text-sm hover:bg-gray-100 cursor-pointer'
                  }`}
                >
                  <span>
                    <BsListStars
                      className={`${boardView ? 'flex-shrink-0 w-5 text-purple-600 h-4' : 'flex-shrink-0 w-5 h-4'}`}
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className={`${
                      boardView
                        ? 'group viewSettingsParent text-purple-600 flex items-center text-sm hover:bg-gray-100 cursor-pointer gap-2 font-bold'
                        : 'group viewSettingsParent flex items-center text-sm hover:bg-gray-100 cursor-pointer gap-2 font-bold'
                    }`}
                  >
                    {viewsList2}
                    <span className="">
                      <ListViewSettingsModal
                        viewSettings="Board Settings"
                        comfortableView=""
                        comfortableViewWrap=""
                        compactViews=""
                        compactViewsWrap=""
                      />
                    </span>
                  </span>
                </span>
                <RxDividerVertical className="mt-0.5" />
              </span>
            </p>

            <p className="flex items-center justify-start space-x-1">
              <span className="viewSettingsParent gap-2 flex items-center pb-3  text-sm hover:bg-gray-100 cursor-pointer">
                <span>
                  <Bars3Icon className="flex-shrink-0 w-5 h-4" aria-hidden="true" />
                </span>
                <span className="group viewSettingsParent flex items-center text-sm hover:bg-gray-100 cursor-pointer gap-2 font-bold">
                  {changeViews}
                  <span className="">
                    <ListViewSettingsModal
                      viewSettings="Change View"
                      comfortableView=""
                      comfortableViewWrap=""
                      compactViews=""
                      compactViewsWrap=""
                    />
                  </span>
                </span>
              </span>
            </p>
          </div>
        </section>
        <section className="flex items-center space-x-5 text-gray-500">
          <span>
            <Button buttonStyle="primary" label={buttonLabel} padding="py-2 px-4" height="h-6" width="w-full" />
          </span>
          <span className="px-2 py-1 text-sm rounded-full hover:bg-gray-100">{Assigned}</span>
          <span className="px-2 py-1 text-sm rounded-full hover:bg-gray-100">@mentions</span>
          <span className="flex items-center px-2 py-1 text-xl font-bold rounded-full hover:bg-gray-200">
            <EllipsisHorizontalCircleIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        </section>
      </nav>
    </>
  );
}

export default ListNav;
