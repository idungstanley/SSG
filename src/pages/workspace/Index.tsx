import React from 'react';
import { Outlet } from 'react-router-dom';

function Index() {
  return (
    <div className="flex flex-row w-full h-full">
      <Outlet />
    </div>
  );
}

export default Index;
