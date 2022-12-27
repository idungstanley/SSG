import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getWalletService } from '../../../../features/wallet/walletService';

interface SubWalletIndexProps {
  walletParentId?: string;
  getCurrentHubId?: string;
}

function SubWalletIndex({
  walletParentId,
  getCurrentHubId,
}: SubWalletIndexProps) {
  const { data: subwallet } = useQuery({
    queryKey: ['subwalletlist', [walletParentId, getCurrentHubId]],
    queryFn: getWalletService,
  });

  return (
    <div>
      {subwallet?.data?.wallets.map(
        (wallet: { type: string; id: string; name: string }) => (
          <div key={wallet.id}>
            <section className="flex justify-between items-center text-sm pl-24 hover:bg-gray-100">
              {wallet.name}
            </section>
          </div>
        )
      )}
    </div>
  );
}

export default SubWalletIndex;
