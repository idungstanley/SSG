import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import TopMenu from './TopMenu';
import MyWorkspacesSlideOver from '../../../pages/account/components/MyWorkspacesSlideOver';
import Chat from '../../../components/Chat';

function MainLayout() {
  const progressBarRef = useRef<LoadingBarRef>(null);

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  useEffect(() => {
    if (isFetching !== 0 || isMutating !== 0) {
      progressBarRef.current?.staticStart();
      progressBarRef.current?.continuousStart(65, 500);
    } else {
      progressBarRef.current?.complete();
    }
  }, [isFetching, isMutating]);

  return (
    <div className="h-full flex flex-col">
      <LoadingBar
        color="#EF4444"
        height={2.5}
        waitingTime={100}
        loaderSpeed={250}
        ref={progressBarRef}
      />
      <TopMenu />
      <div className="flex">
        <div className="flex-1 w-full h-full overflow-hidden">
          <Outlet />
        </div>
        <Chat />
      </div>

      <MyWorkspacesSlideOver />
    </div>
  );
}

export default MainLayout;
