import React from 'react';
// import { useGetHubWallet } from '../../../features/hubs/hubService';
// import MenuDropdown from '../../Dropdown/MenuDropdown';
// import { useAppSelector } from '../../../app/hooks';
// import ListItem from '../../tasks/ListItem';
import { getListService } from '../../../features/list/listService';

interface ListIndexProps {
  showHubList: boolean;
  getCurrentHubId: string | null | undefined;
  paddingLeft?: string;
}

function ListIndex({ showHubList, getCurrentHubId, paddingLeft = '26' }: ListIndexProps) {
  const { data } = getListService({ getCurrentHubId });
  console.log(getCurrentHubId);
  console.log(data);
  console.log(paddingLeft);
  // const { showMenuDropdown } = useAppSelector((state) => state.hub);

  return (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {/* {data?.data?.lists &&
        data?.data?.lists.map((list) => (
          <div key={list.id}>
            <ListItem paddingLeft={paddingLeft} list={list} />
            {showMenuDropdown === list.id ? <MenuDropdown /> : null}
          </div>
        ))} */}
    </div>
  );
}

export default ListIndex;
