import React from 'react';
import { useGetHubList } from '../../../features/hubs/hubService';
import ItemsListInSidebar from '../../../components/ItemsListInSidebar';
import { useDispatch } from 'react-redux';
import { getHub } from '../../../features/hubs/hubSlice';
import everythingIcon from '../../../assets/branding/everything-icon.png';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../sidebar/components/PlaceItem';
import hubIcon from '../../../assets/branding/hub.png';
import { setCreateHubSlideOverVisibility } from '../../../features/general/slideOver/slideOverSlice';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';
import Dropdown from '../../../components/Dropdown/index';

function Hubs() {
  const dispatch = useDispatch();
  const { toggleArchive } = useAppSelector((state) => state.hub);
  const { showSidebar } = useAppSelector((state) => state.workspace);
  const { data, status } = useGetHubList({
    query: toggleArchive,
  });
  if (status === 'success') {
    dispatch(getHub(data?.data.hubs));
  }

  const configForDropdown = [
    {
      label: 'Folder',
      icon: <CubeTransparentIcon className="w-5 h-5" aria-hidden="true" />,
      onClick: () => dispatch(setCreateHubSlideOverVisibility(true)),
    },
  ];

  return (
    <>
      <PlaceItem
        label="TASK"
        icon={<img src={hubIcon} alt="Hub Icon" className="w-4 h-4" />}
        rightContent={
          <div className="flex gap-2"
          onClick={(e) => e.stopPropagation()}
          >
            <Dropdown config={configForDropdown} iconType="plus" />
          </div>
        }
      />
      <div className={`${showSidebar ? 'pl-4' : 'pl-3'} hover:bg-gray-100 flex justify-between items-center`}>
        <div className="flex items-center content-center self-center py-2">
          <img
            src={everythingIcon}
            alt="Hub Icon"
            className={`${showSidebar ? 'h-4 mr-4' : 'h-6 w-6'} `}
          />
          <p
            className={`${
              showSidebar ? 'block' : 'hidden'
            } tracking-wider capitalize truncate`}
            style={{ fontSize: '12px' }}
          >
            Everything
          </p>
        </div>
      </div>
      <ItemsListInSidebar items={data?.data.hubs} status={status} type="hub" />
    </>
  );
}

export default Hubs;
