import React from 'react';
import { useGetHubList } from '../../../features/hubs/hubService';
import ItemsListInSidebar from '../../../components/ItemsListInSidebar';
import everythingIcon from '../../../assets/branding/everything-icon.png';

function Hubs() {
  const { data, status } = useGetHubList();
  return (
    <>
      <div className="pl-4 hover:bg-gray-100 flex justify-between items-center">
        <div className="flex items-center content-center self-center py-2">
          <img src={everythingIcon} alt="Hub Icon" className="h-4 mr-4" />
          <p className="tracking-wider" style={{ fontSize: '10px' }}>
            Everthing
          </p>
        </div>
      </div>
      <ItemsListInSidebar items={data?.data.hubs} status={status} type="hub" />
    </>
  );
}

export default Hubs;
