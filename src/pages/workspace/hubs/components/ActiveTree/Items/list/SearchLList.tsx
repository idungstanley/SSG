import React from 'react';
import { List } from '../../activetree.interfaces';
import SearchListItem from '../../../../../../../components/tasks/SearchListItem';

export default function SearchLList({
  list,
  leftMargin,
  paddingLeft
}: {
  list: List[];
  leftMargin: boolean;
  paddingLeft: string | number;
}) {
  return (
    <>
      {list.map((list) => (
        <div key={list.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <SearchListItem
            list={list}
            paddingLeft={paddingLeft}
            parentId={list.parent_id || list.hub_id || list.wallet_id}
          />
        </div>
      ))}
    </>
  );
}
