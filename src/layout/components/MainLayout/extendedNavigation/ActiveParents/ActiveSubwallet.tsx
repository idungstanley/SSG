import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import { useAppSelector } from '../../../../../app/hooks';
import { findCurrentWallet } from '../../../../../managers/Wallet';
import { Wallet } from '../../../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';

interface SubWalletIndexProps {
  padding?: string;
}

function ActiveSubWallet({ padding = 'pl-8' }: SubWalletIndexProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown, hub } = useAppSelector((state) => state.hub);

  const [wallet, setWallet] = useState<Wallet>();

  useEffect(() => {
    if (activeItemId) {
      setWallet(findCurrentWallet(activeItemId as string, hub));
    }
  }, [activeItemId]);

  const handleLocation = (id: string, type = 'subWallet') => {
    navigate(`tasks/w/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
  };

  return wallet ? (
    <div>
      <section
        className={`flex relative items-center mt-0.5 justify-between ${padding} text-sm h-8 py-1.5 space-x-1 hover:bg-gray-100 ${
          wallet.id === activeItemId && 'bg-green-100 text-black'
        }`}
      >
        <div className="flex items-center cursor-pointer hover:underline hover:decoration-dashed">
          <div onClick={() => handleLocation(wallet.id)}>
            <p className="ml-2 tracking-wider capitalize truncate" style={{ fontSize: '10px' }}>
              {wallet.name.length > 10 ? wallet.name.substr(0, 10) + '...' : wallet.name}
            </p>
          </div>
        </div>
      </section>
      <div>{showMenuDropdown === wallet.id ? <MenuDropdown /> : null}</div>
    </div>
  ) : null;
}

export default ActiveSubWallet;
