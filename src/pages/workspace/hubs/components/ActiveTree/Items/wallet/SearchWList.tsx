import React, { useEffect, useState } from 'react';
import { Wallet } from '../../activetree.interfaces';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { useParams } from 'react-router-dom';
import { setCurrentItem, setCurrentWalletId } from '../../../../../../../features/workspace/workspaceSlice';
import { setWalletItem } from '../../../../../../../features/wallet/walletSlice';
import { EntityType } from '../../../../../../../utils/EntityTypes/EntityType';
import SearchWalletItem from '../../../../../../../components/tasks/SearchWalletItem';
import SearchLList from '../list/SearchLList';

interface IWListProps {
  wallets: Wallet[];
  leftMargin: boolean;
  paddingLeft: string | number;
  type: string;
  level?: number;
  handleTabClick: (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    id: string,
    name: string,
    type: string
  ) => void;
}

export default function SearchWList({ wallets, leftMargin, paddingLeft, level = 1, handleTabClick }: IWListProps) {
  const dispatch = useAppDispatch();
  const { walletId, listId } = useParams();
  const { showExtendedBar } = useAppSelector((state) => state.workspace);

  const [showSubWallet, setShowSubWallet] = useState<string | null>(null);

  const id = walletId || listId;

  useEffect(() => {
    if (id) {
      setShowSubWallet(id);
    }
  }, []);

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet === id) {
      setShowSubWallet(null);
    } else {
      dispatch(setCurrentWalletId(id));
      setShowSubWallet(id);
      dispatch(
        setCurrentItem({
          currentItemId: id,
          currentItemType: EntityType.wallet
        })
      );
      dispatch(
        setWalletItem({
          currentWalletParentId: id,
          currentWalletParentType: EntityType.wallet
        })
      );
    }
  };

  return (
    <>
      {wallets.map((wallet) => (
        <div key={wallet.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <SearchWalletItem
            wallet={wallet}
            walletType={level === 1 ? EntityType.wallet : level === 2 ? 'subwallet2' : 'subwallet3'}
            handleShowSubWallet={handleShowSubWallet}
            handleTabClick={handleTabClick}
            showSubWallet={showSubWallet}
            paddingLeft={paddingLeft}
          />
          {wallet.children.length && showSubWallet ? (
            <SearchWList
              wallets={wallet.children}
              leftMargin={false}
              type="subwallet2"
              handleTabClick={handleTabClick}
              paddingLeft={Number(paddingLeft) + 15}
              level={level + 1}
            />
          ) : null}
          <div style={{ opacity: '0.5', pointerEvents: 'none' }}>
            {wallet.lists.length && showSubWallet && !showExtendedBar ? (
              <SearchLList list={wallet.lists} leftMargin={false} paddingLeft={Number(paddingLeft) + 32} />
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
}
