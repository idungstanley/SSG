import React from 'react';
import MenuDropdown from '../../Dropdown/MenuDropdown';
import { useAppSelector } from '../../../app/hooks';
import ListItem from '../../tasks/ListItem';
import { IList } from '../../../features/hubs/hubs.interfaces';
import { List } from '../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';

interface ListIndexProps {
  data: List[];
  showHubList: boolean;
  paddingLeft?: string;
}

function ListIndex({ data, showHubList, paddingLeft = '26' }: ListIndexProps) {
  const { showMenuDropdown } = useAppSelector((state) => state.hub);

  return data?.length ? (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {data.map((list: IList) => (
        <div key={list.id}>
          <ListItem paddingLeft={paddingLeft} list={list} />
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </div>
  ) : null;
}

export default ListIndex;
