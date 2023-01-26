import React, { useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button } from '../../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { getListView } from '../../../../../features/task/taskSlice';
import { getTableView } from '../../../../../features/task/taskSlice';
import TaskMenu from '../../../tasks/component/taskMenu/TaskMenu';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { BsListStars } from 'react-icons/bs';
import { CiViewTable } from 'react-icons/ci';

interface ListNavProps {
  navName?: string | null;
  viewsList?: string;
  viewsList1?: string;
  viewsList2?: string;
  changeViews?: string;
  Assigned?: string;
  buttonLabel?: string;
}

function ListNav({
  navName,
  viewsList,
  viewsList1,
  viewsList2,
  changeViews,
  Assigned,
  buttonLabel,
}: ListNavProps) {
  const [listView, setListView] = useState(true);
  const { showTaskNavigation } = useAppSelector((state) => state.task);
  const [TableView, setTableView] = useState(false);

  const dispatch = useAppDispatch();

  const toggleView = () => {
    setListView((prev) => !prev);
    setTableView((prev) => !prev);

    dispatch(getListView(listView));
    dispatch(getTableView(TableView));
  };

  return (
    <>
      <div className="w-full">
        {showTaskNavigation && (
          <span className="absolute w-full transition duration-300 ease-in-out">
            <TaskMenu />
          </span>
        )}
      </div>
      <nav className="flex items-center justify-between p-3 overflow-hidden bg-white border border-gray-200" style={{height: '61px'}}>
        <section className="flex items-center justify-start space-x-2 text-gray-500">
          <span className="space-x-2">
            <span className="font-bold">{navName}</span>
          </span>
          <span className="flex items-center justify-start space-x-1">
            <span>
              <BsListStars
                className="flex-shrink-0 w-5 h-4"
                aria-hidden="true"
              />
            </span>
            <span
              className="flex items-center text-sm hover:bg-gray-100"
              onClick={toggleView}
            >
              {viewsList}
            </span>
          </span>
          <span className="flex items-center justify-start space-x-1">
            <span>
              <CiViewTable
                className="flex-shrink-0 w-5 h-4"
                aria-hidden="true"
              />
            </span>
            <span
              className="flex items-center text-sm hover:bg-gray-100"
              onClick={toggleView}
            >
              {viewsList1}
            </span>
          </span>
          <span className="flex items-center justify-start space-x-1">
            <span>
              <BsListStars
                className="flex-shrink-0 w-5 h-4"
                aria-hidden="true"
              />
            </span>
            <span className="flex items-center text-sm hover:bg-gray-100">
              {viewsList2}
            </span>
          </span>
          <span className="flex items-center justify-start space-x-1">
            <span>
              <Bars3Icon className="flex-shrink-0 w-5 h-4" aria-hidden="true" />
            </span>
            <span className="flex items-center text-sm hover:bg-gray-100">
              {changeViews}
            </span>
          </span>
        </section>
        <section className="flex items-center space-x-5 text-gray-500">
          <span>
            <Button
              buttonStyle="primary"
              label={buttonLabel}
              padding="py-2 px-4"
              height="h-6"
              width="w-full"
            />
          </span>
          <span className="px-2 py-1 text-sm rounded-full hover:bg-gray-100">
            {Assigned}
          </span>
          <span className="px-2 py-1 text-sm rounded-full hover:bg-gray-100">
            @mentions
          </span>
          <span className="flex items-center px-2 py-1 text-xl font-bold rounded-full hover:bg-gray-200">
            {' '}
            <EllipsisOutlined />
          </span>
        </section>
      </nav>
    </>
  );
}

export default ListNav;
