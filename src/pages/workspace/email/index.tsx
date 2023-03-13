import React from 'react';
import { MdAlternateEmail } from 'react-icons/md';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import { cl } from '../../../utils';

export default function Email() {
  const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <div>
      <PlaceItem label="EMAIL" icon={<MdAlternateEmail className="w-4 h-4 " />} />
      <div className={cl('mb-2', !showSidebar && 'overflow-x-hidden w-12')}>EMAIL</div>
    </div>
  );
}
