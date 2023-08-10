import React from 'react';
// import { useGetHubWallet } from '../../../features/hubs/hubService';
import MenuDropdown from '../../Dropdown/MenuDropdown';
import { useAppSelector } from '../../../app/hooks';
import ListItem from '../../tasks/ListItem';
import { getListService } from '../../../features/list/listService';
import { IList } from '../../../features/hubs/hubs.interfaces';

interface ListIndexProps {
  showHubList: boolean;
  getCurrentHubId: string | null;
  paddingLeft?: string;
}

function ListIndex({ showHubList, getCurrentHubId, paddingLeft = '26' }: ListIndexProps) {
  const { showMenuDropdown } = useAppSelector((state) => state.hub);

  const { data } = getListService({ getCurrentHubId });

  return (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {data?.data.lists.map((list: IList) => (
        <div key={list.id}>
          <ListItem paddingLeft={paddingLeft} list={list} />
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </div>
  );
}

export default ListIndex;
