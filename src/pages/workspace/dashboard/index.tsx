import { ClockIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import { cl } from '../../../utils';

function Dashboard() {
  const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <>
      <PlaceItem label="Time clock" id={6} icon={<ClockIcon className="w-4 h-4" />} />
      <div className={cl('mb-2', !showSidebar && 'overflow-x-hidden w-12')}>Dashboard</div>
    </>
  );
}

export default Dashboard;
