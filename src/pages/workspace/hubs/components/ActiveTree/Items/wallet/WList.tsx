import React, { useEffect, useState } from 'react';
import { Wallet } from '../../activetree.interfaces';
import LList from '../list/LList';
import WalletItem from '../../../../../../../components/tasks/WalletItem';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
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
  type,
  level = 1
}: {
  wallets: Wallet[];
  leftMargin: boolean;
  paddingLeft: string | number;
  type: string;
  level?: number;
}) {
  const dispatch = useAppDispatch();
  const [showSubWallet, setShowSubWallet] = useState<string | null>(null);
  const { showExtendedBar } = useAppSelector((state) => state.workspace);
  const [stickyButtonIndex, setStickyButtonIndex] = useState<number | undefined>(-1);
  const navigate = useNavigate();
  const { walletId } = useParams();

  useEffect(() => {
    if (walletId) {
      setShowSubWallet(walletId);
    }
  }, []);

  const handleLocation = (id: string, name: string, index?: number) => {
    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
    dispatch(setShowHub(true));
    navigate(`tasks/w/${id}`, {
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

  const handleShowSubWallet = (id: string, index?: number) => {
    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
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
      {wallets.map((wallet, index) => (
        <div key={wallet.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <WalletItem
            wallet={wallet}
            walletType={level === 1 ? 'wallet' : level === 2 ? 'subwallet2' : 'subwallet3'}
            handleLocation={handleLocation}
            handleShowSubWallet={handleShowSubWallet}
            showSubWallet={showSubWallet}
            paddingLeft={paddingLeft}
            isSticky={stickyButtonIndex !== undefined && stickyButtonIndex !== null && stickyButtonIndex <= index}
            stickyButtonIndex={stickyButtonIndex}
            index={index}
            topNumber={type === 'subwallet2' ? '140px' : '110px'}
            zNumber={type === 'subwallet2' ? '10' : '15'}
          />

          {wallet.children.length && showSubWallet ? (
            <WList
              wallets={wallet.children}
              leftMargin={false}
              type="subwallet2"
              paddingLeft={Number(paddingLeft) + 15}
              level={level + 1}
            />
          ) : null}
          {wallet.lists.length && showSubWallet && !showExtendedBar ? (
            <LList list={wallet.lists} leftMargin={false} paddingLeft={Number(paddingLeft) + 32} />
          ) : null}
        </div>
      ))}
    </>
  );
}
