import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../app/hooks';
import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import SubDropdown from '../../../../../components/Dropdown/SubDropdown';
import {
  setCreateListSlideOverVisibility,
  setCreateWalletSlideOverVisibility
} from '../../../../../features/general/slideOver/slideOverSlice';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';
import { Wallet } from '../../../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { findCurrentWallet } from '../../../../../managers/Wallet';
import { APP_TASKS } from '../../../../../app/constants/app';

interface WalletIndexProps {
  showHubList: boolean;
}

function ActiveWallet({ showHubList }: WalletIndexProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { SubMenuId, showMenuDropdown, hub } = useAppSelector((state) => state.hub);

  const [wallet, setWallet] = useState<Wallet>();

  useEffect(() => {
    if (activeItemId) {
      setWallet(findCurrentWallet(activeItemId as string, hub));
    }
  }, [activeItemId]);

  const handleLocation = (id: string, name: string, type = EntityType.wallet) => {
    navigate(`tasks/w/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id, activeItemName: name }));
  };

  return wallet ? (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {!wallet.children.length && !wallet.lists.length ? (
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
      ) : null}
      <div>
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
        {SubMenuId === wallet.id ? <SubDropdown placeHubType={APP_TASKS} /> : null}
      </div>
    </div>
  ) : null;
}

export default ActiveWallet;
