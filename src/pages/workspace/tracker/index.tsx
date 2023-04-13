import React from 'react';
import { SiPivotaltracker } from 'react-icons/si';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import { cl } from '../../../utils';

function Tracker() {
  const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <>
      <PlaceItem label="TRACKER" id="7" icon={<SiPivotaltracker className="w-4 h-4" />} />
      <div className={cl('mb-2', !showSidebar && 'overflow-x-hidden w-12')}>TRACKER</div>
    </>
  );
}

export default Tracker;
