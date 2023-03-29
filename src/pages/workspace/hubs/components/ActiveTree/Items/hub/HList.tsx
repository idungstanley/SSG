import React from 'react';
import { ListProps } from '../../activetree.interfaces';
import HItem from './HItem';
import WList from '../wallet/WList';
import LList from '../list/LList';

export default function HList({ hubs, leftMargin }: ListProps) {
  return (
    <>
      {hubs.map((hub) => (
        <div key={hub.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <HItem id={hub.id} name={hub.name} parentId={hub.parent_id} />

          {hub.children.length ? <HList hubs={hub.children} leftMargin /> : null}
          {hub.wallets.length ? <WList wallets={hub.wallets} leftMargin /> : null}
          {hub.lists.length ? <LList list={hub.lists} leftMargin /> : null}
        </div>
      ))}
    </>
  );
}
