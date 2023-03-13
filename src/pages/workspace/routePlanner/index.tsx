import React from 'react';
import { FaRoute } from 'react-icons/fa';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import { cl } from '../../../utils';

export default function RoutePlanner() {
  const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <div>
      <PlaceItem label="ROUTE PLANNER" icon={<FaRoute className="w-4 h-4" />} />
      <div className={cl('mb-2', !showSidebar && 'overflow-x-hidden w-12')}>ROUTE PLANNER</div>
    </div>
  );
}
