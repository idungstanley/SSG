import React from 'react';
import WItem from './WItem';
import { Wallet } from '../../activetree.interfaces';
import LList from '../list/LList';

export default function WList({ wallets, leftMargin }: { wallets: Wallet[]; leftMargin: boolean }) {
  return (
    <>
      {wallets.map((wallet) => (
        <div key={wallet.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <WItem id={wallet.id} name={wallet.name} parentId={wallet.parent_id || wallet.hub_id} />

          {wallet.children.length ? <WList wallets={wallet.children} leftMargin /> : null}
          {wallet.lists.length ? <LList list={wallet.lists} leftMargin /> : null}
        </div>
      ))}
    </>
  );
}
