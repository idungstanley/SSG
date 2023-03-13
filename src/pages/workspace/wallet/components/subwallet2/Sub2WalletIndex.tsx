import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWalletServices } from '../../../../../features/wallet/walletService';
import { useDispatch } from 'react-redux';
import { setActiveEntity, setActiveItem, setShowHub } from '../../../../../features/workspace/workspaceSlice';
import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import { useAppSelector } from '../../../../../app/hooks';
import WalletItem from '../../../../../components/tasks/WalletItem';
import ListItem from '../../../../../components/tasks/ListItem';
import LastListIndex from './LastListIndex';

interface SubWalletIndexProps {
  paddingLeft?: string;
  currWalId: string;
}

interface dataProps {
  id: string;
  name: string;
}

function SubWalletIndex({ paddingLeft = '32', currWalId }: SubWalletIndexProps) {
  // eslint-disable-next-line no-console
  console.log(paddingLeft);
  const dispatch = useDispatch();
  const { toggleArchiveWallet } = useAppSelector((state) => state.wallet);

  const [showSubWallet3, setShowSubWallet3] = useState<string | null>(null);
  const [finalParentId, setFinalWalletParentId] = useState('');
  const { data: subwallet } = getWalletServices({
    Archived: toggleArchiveWallet,
    parentId: currWalId
  });
  const { showMenuDropdown } = useAppSelector((state) => state.hub);

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet3 === id) {
      return setShowSubWallet3(null);
    }
    setFinalWalletParentId(id);
    setShowSubWallet3(id);
  };

  const navigate = useNavigate();

  const handleLocation = (id: string, type = 'sub2wallet') => {
    dispatch(setShowHub(true));
    navigate(`/wallet/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
    dispatch(setActiveEntity({ id: id, type: 'wallet' }));
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
            paddingLeft="64"
            showSubWallet={showSubWallet3}
          />
          {showSubWallet3 === wallet.id ? <LastListIndex finalParentId={finalParentId} /> : null}
        </div>
      ))}
      {subwallet?.data?.lists.map((list: dataProps) => (
        <div key={list.id}>
          <ListItem list={list} paddingLeft="87" />
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </div>
  );
}

export default SubWalletIndex;
