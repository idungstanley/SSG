import React, { memo, useRef, useState } from "react";
import { FaWpforms } from "react-icons/fa";
import Dashboard from "../pages/workspace/dashboard";
import Favourites from "../pages/workspace/favorites";
import Files from "../pages/workspace/files";
import Inbox from "../pages/workspace/inbox";
import {
  setActivePlaceId,
  setExtendedSidebarWidth,
  setIsExtSearchActive,
  setShowExtendedBar,
  setShowModal,
} from "../features/workspace/workspaceSlice";
import emailIcon from "../assets/branding/email-icon.png";
import hubIcon from "../assets/branding/hub.png";
import InboxIcon from "../assets/branding/inbox.png";
import timeClockIcon from "../assets/branding/timeclock.png";
import trackerIcon from "../assets/branding/tracker-icon.png";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { BsPlusLg } from "react-icons/bs";
import { RiArrowLeftSLine } from "react-icons/ri";
import ActiveHub from "./ActiveParents/ActiveHub";
import { IoMdCloseCircle } from "react-icons/io";
import Extendedbar from "../pages/explorer/components/Sidebar";
import { BiCabinet } from "react-icons/bi";
import { IoSearchCircleOutline } from "react-icons/io5";
import ResizeBorder from "../components/ResizeBorder";
import { any } from "prop-types";

const secondaryNavigation = [
  {
    name: "email",
    id: 1,
    place: <Favourites />,
    source: emailIcon,
  },
  {
    name: "hubs",
    id: 2,
    place: <ActiveHub />,
    source: hubIcon,
  },
  {
    name: "In-tray",
    id: 3,
    place: <Inbox />,
    source: InboxIcon,
  },
  {
    name: "Cabinet",
    id: 4,
    place: <Extendedbar />,
    icon: <BiCabinet className="h-4 mr-4" />,
  },
  {
    name: "forms",
    id: 5,
    place: <Files />,
    icon: <FaWpforms className="h-4 mr-4" />,
  },
  {
    name: "time clock",
    id: 6,
    place: <Dashboard />,
    source: timeClockIcon,
  },
  {
    name: "tracker",
    id: 7,
    place: <Favourites />,
    source: trackerIcon,
  },
];

function ExpandedNav() {
  const dispatch = useDispatch();
  const {
    activePlaceId,
    showExtendedBar,
    extendedSidebarWidth,
    isExtSearchActive,
  } = useAppSelector((state) => state.workspace);
  const sidebarRef = useRef<HTMLInputElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const MIN_SIDEBAR_WIDTH = 230;
  const MAX_SIDEBAR_WIDTH = 320;
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
              setExtendedSidebarWidth(
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
  if (activePlaceId === (0 || true)) {
    dispatch(setShowExtendedBar(false));
    dispatch(setExtendedSidebarWidth(240));
  }
  return (
    <div
      className="relative flex-none"
      ref={sidebarRef}
      style={
        showExtendedBar
          ? {
              maxWidth: `${MAX_SIDEBAR_WIDTH}px`,
              width: extendedSidebarWidth,
              minWidth: `${MIN_SIDEBAR_WIDTH}px`,
            }
          : { width: "1px", minWidth: "1px" }
      }
    >
      <span className="absolute z-50 bg-green-400 border-2 border-green-400 rounded-full cursor-pointer -right-2 top-2">
        {showExtendedBar && (
          <RiArrowLeftSLine
            className="text-sm text-white"
            onClick={() => dispatch(setShowExtendedBar(false))}
          />
        )}
      </span>
      <section
        className={`z-10 h-screen overflow-x-hidden overflow-y-auto border-r ${
          isResizing ? "border-gray-500" : "border-gray-300"
        }`}
      >
        <div aria-labelledby="projects-headline">
          {secondaryNavigation.map(
            (item) =>
              activePlaceId === item.id && (
                <div key={item.id} className="">
                  <div className="relative top-0 flex items-center h-8 p-2 text-gray-600 border-b cursor-pointer border-gray">
                    <button
                      className={`${
                        isExtSearchActive ? "hidden" : "flex"
                      } items-center justify-between w-full`}
                      type="button"
                      onClick={() => dispatch(setActivePlaceId(item.id))}
                    >
                      <span className="flex items-center content-center self-center">
                        {item.icon ? (
                          item.icon
                        ) : (
                          <img
                            src={item.source}
                            alt="Hub Icon"
                            className="h-4 mr-4"
                          />
                        )}
                        <span
                          className={` font-semibold leading-3 uppercase truncate tracking-wider ${
                            activePlaceId === item.id && "text-black font-bold"
                          }`}
                          style={{ fontSize: "11px" }}
                        >
                          {item.name}
                        </span>
                      </span>
                      <span className="flex mr-1 space-x-2 flex-end">
                        <BsPlusLg
                          className="w-2.5 h-2.5"
                          aria-hidden="true"
                          color="black"
                          onClick={() => dispatch(setShowModal(true))}
                        />
                        <IoSearchCircleOutline
                          className="w-2.5 mr-1 h-4"
                          aria-hidden="true"
                          onClick={() =>
                            dispatch(setIsExtSearchActive("TOGGLE"))
                          }
                        />
                      </span>
                    </button>
                    {activePlaceId === item.id && (
                      <div
                        className={`w-full ${
                          isExtSearchActive ? "flex" : "hidden"
                        } relative`}
                      >
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="Filter List, Hubs, & Wallets"
                          className="w-full pl-5 bg-gray-200 border-transparent border-none h-14 hover:bg-gray-100 focus:border-transparent focus:ring-0"
                        />
                        <IoMdCloseCircle
                          className="absolute right-0 w-6 h-4 text-green-500 top-5"
                          onClick={() =>
                            dispatch(setIsExtSearchActive("TOGGLE"))
                          }
                        />
                        <IoSearchCircleOutline
                          className="absolute left-0 w-6 h-4 text-green-500 top-5"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                  <div>{item.place}</div>
                </div>
              )
          )}
        </div>
        <span className="group">
          <div
            className={`absolute top-0 bottom-0 z-40 h-full justify-self-end shrink-0 grow-0 cursor-all-scroll ${
              extendedSidebarWidth >= 230 && "group-hover:bg-green-100"
            }`}
            onMouseDown={startResizing}
            style={{
              cursor: "col-resize",
              width: `${extendedSidebarWidth > 320 ? "4px" : "2px"}`,
              right: "0.5px",
            }}
          ></div>
          <div
            className={`absolute top-0 bottom-0 h-full z-40 justify-self-end shrink-0 grow-0 cursor-all-scroll ${
              extendedSidebarWidth <= 320 && "group-hover:bg-green-100"
            }`}
            style={{
              cursor: "col-resize",
              width: `${extendedSidebarWidth < 230 ? "4px" : "2px"}`,
              right: `${extendedSidebarWidth < 230 ? "-4px" : "-2px"}`,
            }}
            onMouseDown={startResizing}
          ></div>
        </span>
        <ResizeBorder
          width={extendedSidebarWidth}
          minWidth={MIN_SIDEBAR_WIDTH}
          maxWidth={MAX_SIDEBAR_WIDTH}
          startResizing={startResizing}
        />
      </section>
    </div>
  );
}
export default memo(ExpandedNav);
