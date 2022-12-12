import { useQuery } from '@tanstack/react-query';
import React from 'react';
import PropTypes from 'prop-types';
import { getWalletService } from '../../../../features/wallet/walletService';

function SubWalletIndex({ walletParentId, getCurrentHubId }) {
  const { data: subwallet } = useQuery({
    queryKey: ['subwalletlist', [walletParentId, getCurrentHubId]],
    queryFn: getWalletService,
  });

  console.log(subwallet);
  return (
    <div>
      {subwallet?.data?.wallets.map((wallet) => (
        <div key={wallet.id}>
          <section className="flex justify-between items-center text-sm pl-24 hover:bg-gray-100">
            {wallet.name}
          </section>
        </div>
      ))}
    </div>
  );
}

SubWalletIndex.defaultProps = {
  walletParentId: '',
  getCurrentHubId: null,
};

SubWalletIndex.propTypes = {
  walletParentId: PropTypes.string,
  getCurrentHubId: PropTypes.string,
};

export default SubWalletIndex;
