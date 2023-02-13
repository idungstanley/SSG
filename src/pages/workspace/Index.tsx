import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Outlet } from 'react-router-dom';
import ExpandedNav from '../../views/ExpandedNav';

function Index() {
  const { showExtendedBar } = useAppSelector((state) => state.workspace);

  return (
    <div className="flex flex-row w-full">
      {showExtendedBar && <ExpandedNav />}

      <Outlet />
    </div>
  );
}

export default Index;
