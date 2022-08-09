import React from 'react';
import {
  Outlet,
} from 'react-router-dom';

function UnauthenticatedLayout() {
  return (
    <div className="h-full bg-gray-50">
      <Outlet />
    </div>
  );
}

export default UnauthenticatedLayout;
