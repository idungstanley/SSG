import React from 'react';
import MenuDropdown from '../../Dropdown/MenuDropdown';
import { useAppSelector } from '../../../app/hooks';
import ListItem from '../../tasks/ListItem';
import { getListService } from '../../../features/list/listService';
import { IList } from '../../../features/hubs/hubs.interfaces';

interface ListIndexProps {
  showHubList: boolean;
  paddingLeft?: string;
}

function ListIndex({ showHubList, paddingLeft = '26' }: ListIndexProps) {
  const { showMenuDropdown } = useAppSelector((state) => state.hub);
  const { activeItemId } = useAppSelector((state) => state.workspace);

  const { data } = getListService(activeItemId);

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
