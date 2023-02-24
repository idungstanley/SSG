import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getWalletServices } from '../../../../features/wallet/walletService';
import { useDispatch } from 'react-redux';
import { setActiveEntity, setActiveItem } from '../../../../features/workspace/workspaceSlice';
import MenuDropdown from '../../../../components/Dropdown/MenuDropdown';
import { useAppSelector } from '../../../../app/hooks';
import { dataProps } from '../../../../components/Index/walletIndex/WalletIndex';

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

  const { data: subwallet } = getWalletServices({
    Archived: toggleArchiveWallet,
    parentId: currentWalletParentId,
  });
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown } = useAppSelector((state) => state.hub);

  const navigate = useNavigate();
  const handleLocation = (id: string, type = 'subWallet') => {
    navigate(`/wallet/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
    dispatch(setActiveEntity({ id: id, type: 'wallet' }));
  };

  return (
    <div>
      {subwallet?.data?.wallets.map(
        (wallet: dataProps) =>
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
                {showMenuDropdown === wallet.id ? <MenuDropdown /> : null}
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default ActiveSubWallet;
