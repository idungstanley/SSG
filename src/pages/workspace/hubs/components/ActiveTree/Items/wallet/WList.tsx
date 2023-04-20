import React, { useEffect, useState } from 'react';
import { Wallet } from '../../activetree.interfaces';
import LList from '../list/LList';
import WalletItem from '../../../../../../../components/tasks/WalletItem';
import { useAppDispatch } from '../../../../../../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import {
  setActiveEntity,
  setActiveEntityName,
  setActiveItem,
  setCurrentItem,
  setCurrentWalletId,
  setCurrentWalletName,
  setShowHub
} from '../../../../../../../features/workspace/workspaceSlice';
import { setWalletItem } from '../../../../../../../features/wallet/walletSlice';

export default function WList({
  wallets,
  leftMargin,
  paddingLeft,
  type
}: {
  wallets: Wallet[];
  leftMargin: boolean;
  paddingLeft: string | number;
  type: string;
}) {
  const dispatch = useAppDispatch();
  const [showSubWallet, setShowSubWallet] = useState<string | null>(null);
  const navigate = useNavigate();
  const { walletId } = useParams();

  useEffect(() => {
    if (walletId) {
      setShowSubWallet(walletId);
    }
  }, []);

  const handleLocation = (id: string, name: string) => {
    dispatch(setShowHub(true));
    navigate(`/wallet/${id}`, {
      replace: true
    });
    setShowSubWallet(id);
    dispatch(setCurrentWalletId(id));
    dispatch(
      setWalletItem({
        currentWalletParentId: id,
        currentWalletParentType: 'wallet'
      })
    );
    dispatch(setActiveEntityName(name));
    dispatch(
      setActiveItem({
        activeItemType: type,
        activeItemId: id,
        activeItemName: name
      })
    );
    dispatch(setActiveEntity({ id: id, type: 'wallet' }));
    dispatch(setCurrentWalletName(name));
    dispatch(setCurrentWalletId(id));
  };

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet === id) {
      setShowSubWallet(null);
    } else {
      dispatch(setCurrentWalletId(id));
      setShowSubWallet(id);
      dispatch(
        setCurrentItem({
          currentItemId: id,
          currentItemType: 'wallet'
        })
      );
      dispatch(
        setWalletItem({
          currentWalletParentId: id,
          currentWalletParentType: 'wallet'
        })
      );
    }
  };

  return (
    <>
      {wallets.map((wallet) => (
        <div key={wallet.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <WalletItem
            wallet={wallet}
            walletType="wallet"
            handleLocation={handleLocation}
            handleShowSubWallet={handleShowSubWallet}
            showSubWallet={showSubWallet}
            paddingLeft={paddingLeft}
          />

          {wallet.children.length && showSubWallet ? (
            <WList
              wallets={wallet.children}
              leftMargin={false}
              type="subwallet2"
              paddingLeft={Number(paddingLeft) + 15}
            />
          ) : null}
          {wallet.lists.length && showSubWallet ? (
            <LList list={wallet.lists} leftMargin={false} paddingLeft={Number(paddingLeft) + 32} />
          ) : null}
        </div>
      ))}
    </>
  );
}
