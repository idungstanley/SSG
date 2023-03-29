/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { List } from '../../activetree.interfaces';
import LItem from './LItem';

export default function LList({ list, leftMargin }: { list: List[]; leftMargin: boolean }) {
  return (
    <>
      {list.map((list) => (
        <div key={list.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <LItem id={list.id} name={list.name} parentId={list.parent_id || list.hub_id || list.wallet_id} />

          {list.children.length ? <LList list={list.children} leftMargin /> : null}
        </div>
      ))}
    </>
  );
}
