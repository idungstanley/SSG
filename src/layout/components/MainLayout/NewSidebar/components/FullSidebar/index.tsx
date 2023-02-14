import React from 'react';
import WorkSpaceSelection from '../../../sidebar/components/WorkSpaceSelection';
import MainLogo from '../../../../../../assets/branding/main-logo.png';
import notificationIcon from '../../../../../../assets/branding/notification-logo.png';
import { useAppDispatch } from '../../../../../../app/hooks';
import { setShowSidebarSettings } from '../../../../../../features/hubs/hubSlice';
import ArchiveMenu from '../../../../../../pages/workspace/hubs/components/archive/ArchiveMenu';
import { AvatarWithInitials } from '../../../../../../components';
import { HiChevronDoubleLeft } from 'react-icons/hi';
import Search from '../../../../../../pages/workspace/search';
import NavigationItems from '../../../sidebar/components/NavigationItems';
import Places from '../../../sidebar/components/Places';
import FooterTabs from '../../../sidebar/components/FooterTabs';
import { setShowSidebar } from '../../../../../../features/workspace/workspaceSlice';

export default function FullSidebar() {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="relative flex flex-col bg-white">
        <div className="sticky top-0 left-0 z-10 flex items-center justify-between flex-shrink-0 border-separate">
          <div className="flex items-center justify-left border-b border-gray-300 mb-1.5 w-full bg-white w-inherit h-30 flex-row ">
            <img className="w-10 ml-1 h-11" src={MainLogo} alt="Workflow" />
            <WorkSpaceSelection />
            <div className="flex items-center mt-1 flex-row justify-between">
              <span className="relative h-4 w-4 mr-0.5 cursor-pointer">
                <p
                  className="flex items-center justify-center px-0.5 h-2.5 w-min-4 absolute -right-1.5 top-0 text-white bg-red-600"
                  style={{ fontSize: '7px', borderRadius: '50px' }}
                >
                  24
                </p>
                <img src={notificationIcon} alt="a" className="w-4 h-4" />
              </span>

              <div
                className="mt-2"
                onClick={() => dispatch(setShowSidebarSettings(true))}
              >
                <ArchiveMenu />
              </div>

              <AvatarWithInitials
                initials="Also Workspace"
                height="h-5"
                width="w-5"
                backgroundColour="blue"
              />
            </div>

            <HiChevronDoubleLeft
              color="blue"
              className="mt-1 ml-1 cursor-pointer"
              onClick={() => dispatch(setShowSidebar(false))}
            />
          </div>
        </div>
        <div className="pr-0.5">
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
    </>
  );
}
