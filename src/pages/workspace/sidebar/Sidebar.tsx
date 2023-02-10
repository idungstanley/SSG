import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
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
import FooterTabs from './components/FooterTabs';
import ResizeBorder from '../../../components/ResizeBorder';

export default function Sidebar() {
  const dispatch = useDispatch();
  const { showSidebar, showExtendedBar, sidebarWidth, activePlaceId } =
    useAppSelector((state) => state.workspace);
  const { sidebarSettings } = useAppSelector((state) => state.hub);
  const sidebarRef = useRef<HTMLInputElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [scrollTop, setScrollTop] = useState<number | null>(null);
  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);
  const MIN_SIDEBAR_WIDTH = 230;
  const MAX_SIDEBAR_WIDTH = 320;

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent: MouseEvent): void => {
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
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing, sidebarWidth]);
  const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    setScrollTop(event.currentTarget.scrollTop);
  };
  const handleShowSidebar = () => {
    dispatch(setSidebarWidth(300));
    dispatch(setShowSidebar(true));
  };

  const getLocalWSName = JSON.parse(
    localStorage.getItem('currentWorkspacename') as string
  );
  const workspaceName = getLocalWSName ? getLocalWSName : 'Also Workspace';

  return (
    <>
      {/* Static sidebar for desktop */}
      <div
        className={`relative z-10 max-w-xs pr-px border-r border-gray-300 md:fixed md:inset-y-0 lg:flex md:flex-col ${
          isResizing ? 'border-gray-500' : 'border-gray-300'
        }`}
        ref={sidebarRef}
        style={
          showSidebar
            ? {
                maxWidth: `${MAX_SIDEBAR_WIDTH}px`,
                width: sidebarWidth,
                minWidth: `${MIN_SIDEBAR_WIDTH}px`,
              }
            : {
                width: '54px',
                minWidth: '54px',
                maxWidth: `${MAX_SIDEBAR_WIDTH}px`,
              }
        }
      >
        <Modal />
        <SubHubModal />
        <span
          className={`absolute -right-2 top-16 z-30 bg-white rounded-full border-2 border-inherit ${
            !activePlaceId ? 'hidden' : 'block'
          }`}
        >
          {!showExtendedBar && (
            <RiArrowRightSLine
              className="text-xs "
              onClick={() => dispatch(setShowExtendedBar(true))}
            />
          )}
        </span>
        <div className="relative flex flex-col bg-white">
          <div className="sticky top-0 left-0 z-10 flex items-center justify-between flex-shrink-0 border-separate">
            <div
              className={`flex items-center justify-left border-b border-gray-300 mb-1.5 w-full py-2 bg-white w-inherit h-30 ${
                showSidebar ? 'flex-row' : 'flex-col space-y-1'
              }`}
            >
              <img className="w-10 ml-1 h-11" src={MainLogo} alt="Workflow" />
              <WorkSpaceSelection />
              <div
                className={`flex items-center mt-1 ${
                  showSidebar
                    ? 'flex-row justify-between'
                    : 'flex-col space-y-1 justify-center'
                }`}
              >
                {scrollTop != null && scrollTop > 108 ? (
                  <span className="relative h-4 w-4 mr-0.5 cursor-pointer">
                    <p
                      className="flex items-center justify-center px-0.5 h-2.5 w-min-4 absolute -right-1.5 top-0 text-white bg-red-600"
                      style={{ fontSize: '7px', borderRadius: '50px' }}
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
                    .split(' ')
                    .slice(0, 2)
                    .map((word: string) => word[0])
                    .join('')
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
          <div onScroll={(e) => handleScroll(e)} className="pr-0.5">
            <section
              className="w-full h-full pr-1 overflow-x-hidden overflow-y-auto"
              style={{ minHeight: '0', maxHeight: '80vh' }}
            >
              <Search />
              <NavigationItems />
              <Places />
            </section>
          </div>
        </div>
        <FooterTabs />
        <ResizeBorder
          width={sidebarWidth}
          minWidth={MIN_SIDEBAR_WIDTH}
          maxWidth={MAX_SIDEBAR_WIDTH}
          startResizing={startResizing}
        />
      </div>
    </>
  );
}
