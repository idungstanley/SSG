import { ClockIcon } from '@heroicons/react/24/outline';
import React from 'react';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';

function Dashboard() {
  return (
    <>
      <PlaceItem label="Time clock" icon={<ClockIcon className="h-5 w-5" />} />
      <div>Dashboard</div>
    </>
  );
}

export default Dashboard;
