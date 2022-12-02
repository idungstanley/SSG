/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { FolderFilled } from '@ant-design/icons';
import { Hyperlink } from '../../../components';
import { getWalletService } from '../../../features/wallet/walletService';
import MenuDropdown from '../hubs/components/MenuDropdown';
import PlusDropDown from '../hubs/components/PlusDropDown';

function WalletIndex({ showHubList, getCurrentHubId }) {
  const { isLoading, data } = useQuery({
    queryKey: ['walletdata', getCurrentHubId],
    queryFn: getWalletService,
  });

  // console.log(data);
  return (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {data?.data?.wallets.length !== 0 ? (
        data?.data?.wallets.map((wallet) => (
          <div key={wallet.id}>
            <section className="flex justify-between items-center text-sm pl-14 hover:bg-gray-100">
              <div
                id="walletLeft"
                className="flex items-center justify-center space-x-1"
              >
                <FolderFilled />
                <p className="text-sm">{wallet.name}</p>
              </div>

              <div
                id="walletRight"
                className="space-x-1 flex items-center justify-end"
                // onClick={() => HandleGetHubId(hub.id)}
              >
                <MenuDropdown />
                <PlusDropDown />
              </div>
            </section>
          </div>
        ))
      ) : (
        <p className="text-sm pl-7">
          Create a
          {' '}
          <span className="underline text-gray-600">
            <Hyperlink label="Wallet" href="/" />
          </span>
          ,
          {' '}
          <span className="underline text-gray-600">
            <Hyperlink label="List" href="/" />
          </span>
          {' '}
        </p>
      )}
    </div>
  );
}

WalletIndex.propTypes = {
  showHubList: PropTypes.bool.isRequired,
  getCurrentHubId: PropTypes.string.isRequired,
};

export default WalletIndex;
