import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWalletService, getWalletServices } from '../../features/wallet/walletService';
import Sub2WalletIndex from '../../pages/workspace/wallet/components/subwallet2/Sub2WalletIndex';
import { useDispatch } from 'react-redux';
import { setActiveItem } from '../../features/workspace/workspaceSlice';
import MenuDropdown from '../../components/Dropdown/MenuDropdown';
import { useAppSelector } from '../../app/hooks';

interface SubWalletIndexProps {
  walletParentId: string | null;
  padding?: string;
}

function ActiveSubWallet({
  padding = 'pl-8',
}: SubWalletIndexProps) {
  const dispatch = useDispatch();
  const { currentWalletParentId, toggleArchiveWallet } = useAppSelector(
    (state) => state.wallet
  );

  const [showSubWallet2, setShowSubWallet2] = useState<string | null>(null);
  const [currWalId, setCurrWalId] = useState('');
  const { data: subwallet } = getWalletServices({
    Archived: toggleArchiveWallet,
    parentId: currentWalletParentId,
  });
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);

  const handleShowSubWallet = (id: string) => {
    setShowSubWallet2(id);
    setCurrWalId(id);
    if (showSubWallet2 === id) {
      return setShowSubWallet2(null);
    }
  };

  const navigate = useNavigate();
  const handleLocation = (id: string, type = 'subWallet') => {
    navigate(`/workspace/wallet/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
  };

  const handleListLocation = (id: string) => {
    navigate(`/workspace/list/${id}`);
  };

  return (
    <div>
      {subwallet?.data?.wallets.map(
        (wallet) =>
          wallet.id === activeItemId && (
            <div key={wallet.id}>
              <section
                className={`flex relative items-center mt-0.5 justify-between ${padding} text-sm h-8 py-1.5 space-x-1 hover:bg-gray-100 ${
                  wallet.id === activeItemId && 'bg-green-100 text-black'
                }`}
              >
                <div className="flex items-center cursor-pointer hover:underline hover:decoration-dashed">
                  <div onClick={() => handleLocation(wallet.id)}>
                    <p
                      className="ml-2 tracking-wider capitalize truncate"
                      style={{ fontSize: '10px' }}
                    >
                      {wallet.name.length > 10
                        ? wallet.name.substr(0, 10) + '...'
                        : wallet.name}
                    </p>
                  </div>
                </div>
              </section>
              <div>
                {showSubWallet2 === wallet.id ? <Sub2WalletIndex /> : null}
                {showMenuDropdown === wallet.id ? <MenuDropdown /> : null}
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default ActiveSubWallet;
