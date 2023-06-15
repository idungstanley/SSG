/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useAppSelector } from '../../../../../../../app/hooks';
import MenuDropdown from '../../../../../../../components/Dropdown/MenuDropdown';
import ListItem from '../../../../../../../components/tasks/ListItem';
import { List } from '../../activetree.interfaces';
export default function LList({
  list,
  leftMargin,
  paddingLeft
}: {
  list: List[];
  leftMargin: boolean;
  paddingLeft: string | number;
}) {
  const { showMenuDropdown } = useAppSelector((state) => state.hub);

  return (
    <>
      {list.map((list) => (
        <div key={list.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <ListItem list={list} paddingLeft={paddingLeft} parentId={list.parent_id || list.hub_id || list.wallet_id} />
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </>
  );
}
