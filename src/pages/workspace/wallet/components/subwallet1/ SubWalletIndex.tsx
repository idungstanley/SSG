import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWalletServices } from '../../../../../features/wallet/walletService';
import Sub2WalletIndex from '../subwallet2/Sub2WalletIndex';
import { useDispatch } from 'react-redux';
import { setActiveItem, setShowHub } from '../../../../../features/workspace/workspaceSlice';
import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import { useAppSelector } from '../../../../../app/hooks';
import WalletItem from '../../../../../components/tasks/WalletItem';
import ListItem from '../../../../../components/tasks/ListItem';

interface SubWalletIndexProps {
  paddingLeft?: string | number;
}

interface dataProps {
  id: string;
  name: string;
}

function SubWalletIndex({ paddingLeft = '30' }: SubWalletIndexProps) {
  const dispatch = useDispatch();
  const { currentWalletParentId, toggleArchiveWallet } = useAppSelector((state) => state.wallet);

  const [showSubWallet2, setShowSubWallet2] = useState<string | null>(null);
  const [currWalId, setCurrWalId] = useState('');
  const { data: subwallet } = getWalletServices({
    Archived: toggleArchiveWallet,
    parentId: currentWalletParentId
  });
  const { showMenuDropdown } = useAppSelector((state) => state.hub);

  const handleShowSubWallet = (id: string) => {
    setShowSubWallet2(id);
    setCurrWalId(id);
    if (showSubWallet2 === id) {
      return setShowSubWallet2(null);
    }
  };

  const navigate = useNavigate();
  const handleLocation = (id: string, type = 'subWallet2') => {
    dispatch(setShowHub(true));
    navigate(`w/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
    setShowSubWallet2(id);
    setCurrWalId(id);
  };

  return (
    <div>
      {subwallet?.data?.wallets.map((wallet: dataProps) => (
        <div key={wallet.id}>
          <WalletItem
            wallet={wallet}
            walletType="subwallet2"
            handleLocation={handleLocation}
            handleShowSubWallet={handleShowSubWallet}
            paddingLeft={paddingLeft}
            showSubWallet={showSubWallet2}
          />
          <div>
            {showSubWallet2 === wallet.id ? (
              <Sub2WalletIndex currWalId={currWalId} paddingLeft={Number(paddingLeft) + 15} />
            ) : null}
          </div>
        </div>
      ))}
      {subwallet?.data?.lists.map((list: dataProps) => (
        <div key={list.id}>
          <ListItem list={list} paddingLeft={Number(paddingLeft) + 15} />
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </div>
  );
}

export default SubWalletIndex;
