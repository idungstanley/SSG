import React from 'react';
import { IoBusinessOutline } from 'react-icons/io5';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import { cl } from '../../../utils';

export default function Commerce() {
  const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <div>
      <PlaceItem label="Commerce" id="10" icon={<IoBusinessOutline className="w-4 h-4" />} />
      <div className={cl('mb-2', !showSidebar && 'overflow-x-hidden w-12')}>Commerce</div>
    </div>
  );
}
