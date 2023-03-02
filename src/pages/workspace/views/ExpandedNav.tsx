import React, { memo, useRef, useState } from "react";
import { FaHandsHelping, FaRoute, FaWpforms } from "react-icons/fa";
import Dashboard from "../dashboard";
import Favourites from "../favorites";
import Files from "../files";
import Inbox from "../inbox";
import {
  setActivePlaceId,
  setActivePlaceName,
  setExtendedSidebarWidth,
  setIsExtSearchActive,
  setShowExtendedBar,
  setShowModal,
} from "../../../features/workspace/workspaceSlice";
import libraryIcon from "../../../assets/icons/library.svg";
import favoriteIcon from "../../../assets/branding/Favourite-icon.svg";
import emailIcon from "../../../assets/branding/email-icon.png";
import hubIcon from "../../../assets/branding/hub.png";
import InboxIcon from "../../../assets/branding/inbox.png";
import timeClockIcon from "../../../assets/branding/timeclock.png";
import trackerIcon from "../../../assets/branding/tracker-icon.png";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { BsPlusLg } from "react-icons/bs";
import { RiArrowLeftSLine } from "react-icons/ri";
import ActiveHub from "./ActiveParents/ActiveHub";
import { IoMdCloseCircle } from "react-icons/io";
import Extendedbar from "../../explorer/components/Sidebar";
import { BiCabinet } from "react-icons/bi";
import { IoBusinessOutline, IoSearchCircleOutline } from "react-icons/io5";
import ResizeBorder from "../../../components/ResizeBorder";
import Sidebar from "../../directory/components/Sidebar";
import { ImBackward2 } from "react-icons/im";
import RoutePlanner from "../routePlanner";
import AlsoHr from "../alsoHr";
import Commerce from "../commerce";

export const secondaryNavigation = [
  {
    name: "Email",
    id: 1,
    place: <Favourites />,
    source: emailIcon,
  },
  {
    name: "TASKS",
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
  {
    name: "Route Planner",
    id: 8,
    place: <RoutePlanner />,
    icon: <FaRoute className="w-4 h-4" />,
  },
  {
    name: "Also HR",
    id: 9,
    place: <AlsoHr />,
    icon: <FaHandsHelping className="w-4 h-4" />,
  },
  {
    name: "Commerce",
    id: 10,
    place: <Commerce />,
    icon: <IoBusinessOutline className="w-4 h-4" />,
  },
  {
    name: "Library",
    id: 11,
    place: <Sidebar />,
    source: libraryIcon,
    link: "directory",
  },
  {
    name: "Favorites",
    id: 12,
    place: <Favourites />,
    source: favoriteIcon,
    link: "favorite",
  },
];

function ExpandedNav() {
  const dispatch = useDispatch();
  const {
    activePlaceName,
    showExtendedBar,
    extendedSidebarWidth,
    isExtSearchActive,
    activePlaceIdForNavigation,
    activePlaceNameForNavigation,
  } = useAppSelector((state) => state.workspace);
  const activePlaceInfo = secondaryNavigation.filter((elem) => {
    return (
      elem.name.toLowerCase() === activePlaceNameForNavigation?.toLowerCase()
    );
  });

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
    (mouseMoveEvent: MouseEvent) => {
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

  if (activePlaceName === null) {
    dispatch(setShowExtendedBar(false));
    dispatch(setExtendedSidebarWidth(240));
  }

  const handleBack = () => {
    dispatch(setShowExtendedBar(false));
    dispatch(setActivePlaceName(null));
    dispatch(setActivePlaceId(activePlaceIdForNavigation));
    dispatch(setActivePlaceName(activePlaceNameForNavigation));
  };

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
            onClick={() => {
              dispatch(setShowExtendedBar(false));
              dispatch(setActivePlaceName(null));
            }}
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
              activePlaceName?.toLowerCase() === item.name.toLowerCase() && (
                <div key={item.id} className="">
                  <div className="relative top-0 flex w-full items-center h-8 p-2 text-gray-600 border-b cursor-pointer border-gray">
                    {item.name !== "Favorites" && (
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
                              activePlaceName === item.name &&
                              "text-black font-bold"
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
                    )}
                    {item.name === "Favorites" && (
                      <div className="w-11/12">
                        {activePlaceNameForNavigation !== null ? (
                          <div className="flex justify-between w-full">
                            <span className="flex items-center content-center self-center">
                              {activePlaceInfo[0].icon ? (
                                activePlaceInfo[0].icon
                              ) : (
                                <img
                                  src={activePlaceInfo[0].source}
                                  alt="Hub Icon"
                                  className="h-4 mr-4"
                                />
                              )}
                              <span
                                className={` font-semibold leading-3 uppercase truncate tracking-wider ${
                                  activePlaceName === item.name &&
                                  "text-black font-bold"
                                }`}
                                style={{ fontSize: "11px" }}
                              >
                                {activePlaceInfo[0].name}
                              </span>
                            </span>
                            <ImBackward2 onClick={handleBack} />
                          </div>
                        ) : (
                          <h1>Favorites</h1>
                        )}
                      </div>
                    )}
                    {activePlaceName === item.name && (
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
