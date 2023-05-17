import React from 'react';
import { IoTimeOutline } from 'react-icons/io5';
import { MdInsights } from 'react-icons/md';
import { SiPivotaltracker } from 'react-icons/si';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import { cl } from '../../../utils';

function WorkInsights() {
  const { showSidebar } = useAppSelector((state) => state.account);

  const workInsightsType = [
    {
      id: '1',
      label: 'TIME CLOCK',
      icon: <IoTimeOutline />
    },
    {
      id: '2',
      label: 'Tracker',
      icon: <SiPivotaltracker />
    }
  ];

  return (
    <>
      <PlaceItem label="WORK INSIGHTS" id="6" icon={<MdInsights className="w-4 h-4" />} />
      <div className={cl('mb-2', !showSidebar && 'overflow-x-hidden w-12')}>
        <div className="flex flex-col">
          {workInsightsType.map((item) => (
            <span key={item.id} className="flex items-center h-8 pl-6 gap-7 hover:bg-gray-100">
              {item.icon}
              <p>{item.label}</p>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default WorkInsights;
