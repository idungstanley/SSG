import React from 'react';
import { getWalletServices } from '../../../../../../../features/wallet/walletService';

interface ItemsWalletDataProps {
  walletId: string | null;
}
export default function ItemsWalletData({ walletId }: ItemsWalletDataProps) {
  const { data } = getWalletServices({ parentId: walletId });
  return (
    <section>
      {/* wallets */}
      <div>{data?.data.wallets.map((item) => item.name)}</div>

      {/* lists */}
      <div>{data?.data.lists.map((item) => item.name)}</div>
    </section>
  );
}
