import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import {
  setShowExtendedBar,
  setShowSidebar,
  setSidebarWidth,
} from '../../../features/workspace/workspaceSlice';
import { setShowSidebarSettings } from '../../../features/hubs/hubSlice';
import MainLogo from '../../../assets/branding/main-logo.png';
import notificationIcon from '../../../assets/branding/notification-logo.png';
import NavigationItems from './components/NavigationItems';
import Places from './components/Places';
import { AvatarWithInitials } from '../../../components';
import { useAppSelector } from '../../../app/hooks';
import { RiArrowRightSLine } from 'react-icons/ri';
import WorkSpaceSelection from './components/WorkSpaceSelection';
import Modal from '../hubs/components/Modal';
import ArchiveMenu from '../hubs/components/archive/ArchiveMenu';
import Search from '../search';
import SubHubModal from '../hubs/components/SubHubModal';

export default function Sidebar() {
  const dispatch = useDispatch();
  const { showSidebar, showExtendedBar, sidebarWidth, activePlaceId } =
    useAppSelector((state) => state.workspace);
  const { sidebarSettings } = useAppSelector((state) => state.hub);
  const sidebarRef = useRef<HTMLInputElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [scrollTop, setScrollTop] = useState<string>("");
  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (sidebarRef !== undefined) {
        if (sidebarRef.current !== undefined && sidebarRef.current !== null)
          if (isResizing) {
            dispatch(
              setSidebarWidth(
                mouseMoveEvent.clientX -
                  sidebarRef?.current?.getBoundingClientRect().left
              )
            );
          }
      }
    },
    [isResizing]
  );
  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);
  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };
  if (sidebarWidth < 240) {
    dispatch(setShowSidebar(false));
  }
  const handleShowSidebar = () => {
    dispatch(setSidebarWidth(300));
    dispatch(setShowSidebar(true));
  };

  const getLocalWSName = JSON.parse(
    localStorage.getItem("currentWorkspacename") as string
  );

  const workspaceName = getLocalWSName ? getLocalWSName : "Also Workspace";

  return (
    <>
      {/* Static sidebar for desktop */}
      <div
        className="md:fixed relative transition-[width] ease-in-out duration-100 delay-300 md:inset-y-0 z-10 lg:flex max-w-xs md:flex-col pr-px border-r border-gray-300"
        ref={sidebarRef}
        style={
          showSidebar
            ? { maxWidth: 321, width: sidebarWidth, minWidth: "54px" }
            : { width: "54px", minWidth: "54px", maxWidth: 321 }
        }
      >
        <Modal />
        <SubHubModal />
        <span
          className={`absolute -right-2 top-16 z-20 bg-white rounded-full border-2 border-inherit ${
            activePlaceId === true || activePlaceId === 0 ? "hidden" : "block"
          }`}
        >
          {!showExtendedBar && (
            <RiArrowRightSLine
              className="text-xs "
              onClick={() => dispatch(setShowExtendedBar(true))}
            />
          )}
        </span>
        <div className="relative flex flex-col overflow-x-hidden overflow-y-scroll bg-white">
          <div className="sticky top-0 left-0 z-10 flex items-center justify-between flex-shrink-0 border-separate">
            <div
              className={`flex items-center justify-left border-b border-gray-300 mb-1.5 w-full py-2 bg-white w-inherit h-30 ${
                showSidebar ? "flex-row" : "flex-col space-y-1"
              }`}
            >
              <img className="w-10 ml-1 h-11" src={MainLogo} alt="Workflow" />
              <WorkSpaceSelection />
              <div
                className={`flex items-center mt-1 ${
                  showSidebar
                    ? "flex-row justify-between"
                    : "flex-col space-y-1 justify-center"
                }`}
              >
                {scrollTop > "108" ? (
                  <span className="relative h-4 w-4 mr-0.5 cursor-pointer">
                    <p
                      className="flex items-center justify-center px-0.5 h-2.5 w-min-4 absolute -right-1.5 top-0 text-white bg-red-600"
                      style={{ fontSize: "7px", borderRadius: "50px" }}
                    >
                      24
                    </p>
                    <img src={notificationIcon} alt="a" className="w-4 h-4" />
                  </span>
                ) : null}
                <div
                  className="mt-2"
                  onClick={() =>
                    dispatch(setShowSidebarSettings(!sidebarSettings))
                  }
                >
                  <ArchiveMenu />
                </div>

                <AvatarWithInitials
                  initials={workspaceName
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                  height="h-5"
                  width="w-5"
                  backgroundColour="blue"
                />
              </div>
              {showSidebar ? (
                <HiChevronDoubleLeft
                  color="blue"
                  className="mt-1 ml-1 cursor-pointer"
                  onClick={() => dispatch(setShowSidebar(false))}
                />
              ) : (
                <HiChevronDoubleRight
                  color="blue"
                  className="mt-1 ml-0 cursor-pointer"
                  onClick={() => handleShowSidebar()}
                />
              )}
            </div>
          </div>
          <div
            className="relative overflow-x-hidden overflow-y-auto"
            onScroll={(e) => handleScroll(e)}
          >
            <Search />
            <NavigationItems />
            <Places />
          </div>
        </div>
        <div
          className="absolute top-0 bottom-0 right-0 h-full justify-self-end shrink-0 grow-0 cursor-all-scroll hover:bg-green-100"
          onMouseDown={startResizing}
          style={{ cursor: "col-resize", width: "3px" }}
        ></div>
      </div>
    </>
  );
}
