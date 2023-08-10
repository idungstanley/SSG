import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetHubWallet } from '../../../../../features/hubs/hubService';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../app/hooks';
import { setActiveEntity, setActiveEntityName, setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import SubDropdown from '../../../../../components/Dropdown/SubDropdown';
import {
  setCreateListSlideOverVisibility,
  setCreateWalletSlideOverVisibility
} from '../../../../../features/general/slideOver/slideOverSlice';
import { setCurrentWalletId, setCurrentWalletName } from '../../../../../features/wallet/walletSlice';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';

interface WalletIndexProps {
  showHubList: boolean;
  getCurrentHubId: string | null;
}

function ActiveWallet({ showHubList, getCurrentHubId }: WalletIndexProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { SubMenuId, showMenuDropdown } = useAppSelector((state) => state.hub);

  const { data } = useGetHubWallet(getCurrentHubId);

  const handleLocation = (id: string, name: string, type = EntityType.wallet) => {
    navigate(`tasks/w/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
    dispatch(setActiveEntity({ id, type }));
    dispatch(setCurrentWalletName(name));
    dispatch(setCurrentWalletId(id));
    dispatch(setActiveEntityName(name));
  };

  return data?.data?.wallets != null ? (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {data?.data?.wallets.length == 0 && data?.data?.lists.length == 0 && (
        <div className="flex space-x-1 text-xs pl-7 py-1.5 h-8">
          <span className="text-gray-600">
            Create a
            <span
              onClick={() => dispatch(setCreateWalletSlideOverVisibility(true))}
              className="mx-1 text-black underline"
            >
              Wallet,
            </span>
            <span onClick={() => dispatch(setCreateListSlideOverVisibility(true))} className="text-black underline">
              List
            </span>
          </span>
        </div>
      )}
      {data?.data?.wallets.length !== 0 &&
        data?.data?.wallets.map(
          (wallet) =>
            wallet.id === activeItemId && (
              <div key={wallet.id}>
                <section className="flex items-center relative justify-between py-1.5 mt-0.5 text-sm hover:bg-gray-100 h-8">
                  <div id="walletLeft" className="flex items-center justify-center">
                    <div
                      onClick={() => handleLocation(wallet.id, wallet.name)}
                      className="flex ml-2 cursor-pointer hover:underline hover:decoration-dashed"
                    >
                      <p className="tracking-wider capitalize truncate" style={{ fontSize: '10px' }}>
                        {wallet.name}
                      </p>
                    </div>
                  </div>
                </section>
                {showMenuDropdown === wallet.id ? <MenuDropdown /> : null}
                {SubMenuId === wallet.id ? <SubDropdown /> : null}
              </div>
            )
        )}
    </div>
  ) : null;
}

export default ActiveWallet;
