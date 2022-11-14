import React, { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import LoadingBar from 'react-top-loading-bar';
import TopMenu from './TopMenu';
import MyWorkspacesSlideOver from '../../../pages/account/components/MyWorkspacesSlideOver';
import { selectCurrentWorkspaceId } from '../../../features/auth/authSlice';

function MainLayout() {
  const progressBarRef = useRef(null);
  const workspaceId = useSelector(selectCurrentWorkspaceId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!workspaceId) {
      navigate('/workspace/onboarding');
    }
  }, []);

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  useEffect(() => {
    if (isFetching !== 0 || isMutating !== 0) {
      progressBarRef.current.staticStart();
      progressBarRef.current.continuousStart(65, 500);
    } else {
      progressBarRef.current.complete();
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
        continuousStart
      />
      <TopMenu />
      <div className="h-full overflow-hidden">
        <Outlet />
      </div>
      <MyWorkspacesSlideOver />
    </div>
  );
}

export default MainLayout;
