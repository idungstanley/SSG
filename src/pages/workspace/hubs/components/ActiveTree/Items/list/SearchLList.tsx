import React from 'react';
import { List } from '../../activetree.interfaces';
import SearchListItem from '../../../../../../../components/tasks/SearchListItem';

export default function SearchLList({
  list,
  leftMargin,
  paddingLeft,
  option
}: {
  list: List[];
  leftMargin: boolean;
  paddingLeft: string | number;
  option?: string;
}) {
  return (
    <>
      {list.map((list) => (
        <div key={list.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <SearchListItem
            option={option}
            list={list}
            paddingLeft={paddingLeft}
            parentId={list.parent_id || list.hub_id || list.wallet_id}
          />
        </div>
      ))}
    </>
  );
}
