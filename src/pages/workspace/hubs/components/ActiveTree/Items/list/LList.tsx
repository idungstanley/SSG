/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
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
  return (
    <>
      {list.map((list) => (
        <div key={list.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <ListItem list={list} paddingLeft={paddingLeft} parentId={list.parent_id || list.hub_id || list.wallet_id} />
        </div>
      ))}
    </>
  );
}
