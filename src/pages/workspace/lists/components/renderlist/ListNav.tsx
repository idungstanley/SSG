import React from "react";
import { Button } from "../../../../../components";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  getBoardView,
  getListView,
} from "../../../../../features/task/taskSlice";
import { getTableView } from "../../../../../features/task/taskSlice";
import TaskMenu from "../../../tasks/component/taskMenu/TaskMenu";
import {
  Bars3Icon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import { BsListStars } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";
import { CiViewTable } from "react-icons/ci";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import ListViewSettingsModal from "../../../tasks/viewSettingsModal/ListViewSettingsModal";

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
  const { showTaskNavigation } = useAppSelector((state) => state.task);

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
        style={{ padding: "15px" }}
      >
        <section className="flex items-center justify-start text-gray-500">
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
              className="group gap-2 flex items-center text-sm hover:bg-gray-100 cursor-pointer"
              onClick={handleListView}
            >
              {viewsList}
              <span className="opacity-0 group-hover:opacity-100 z-100">
                <ListViewSettingsModal />
              </span>
              <RxDividerVertical />
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
              className="group flex items-center text-sm hover:bg-gray-100 cursor-pointer gap-2"
              onClick={handleTableView}
            >
              {viewsList1}
              <span className="opacity-0 group-hover:opacity-100">
                <BiDotsHorizontalRounded />
              </span>
            </span>
            <RxDividerVertical />
          </span>
          <span
            className="flex items-center justify-start space-x-1 cursor-pointer"
            onClick={handleBoardView}
          >
            <span>
              <BsListStars
                className="flex-shrink-0 w-5 h-4"
                aria-hidden="true"
              />
            </span>
            <span className="group gap-2 flex items-center text-sm hover:bg-gray-100 cursor-pointer">
              {viewsList2}
              <span className="opacity-0 group-hover:opacity-100">
                <BiDotsHorizontalRounded />
              </span>
              <RxDividerVertical />
            </span>
          </span>
          <span className="flex items-center justify-start space-x-1">
            <span>
              <Bars3Icon className="flex-shrink-0 w-5 h-4" aria-hidden="true" />
            </span>
            <span className="group gap-2 flex items-center text-sm hover:bg-gray-100 cursor-pointer">
              {changeViews}
              <span className="opacity-0 group-hover:opacity-100">
                <BiDotsHorizontalRounded />
              </span>
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
            <EllipsisHorizontalCircleIcon
              className="h-5 w-5"
              aria-hidden="true"
            />
          </span>
        </section>
      </nav>
    </>
  );
}

export default ListNav;
