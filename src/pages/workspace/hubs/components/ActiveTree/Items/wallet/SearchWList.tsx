import React, { useState } from 'react';
import { Wallet } from '../../activetree.interfaces';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
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
  const { showExtendedBar } = useAppSelector((state) => state.workspace);

  const [showSubWallet, setShowSubWallet] = useState<string[]>([]);

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet.includes(id)) {
      setShowSubWallet((prev) => prev.filter((item) => item !== id));
    } else {
      dispatch(setCurrentWalletId(id));
      setShowSubWallet((prev) => [...prev, id]);
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
            showSubWallet={showSubWallet.includes(wallet.id)}
            paddingLeft={paddingLeft}
          />
          {wallet.children.length && showSubWallet.includes(wallet.id) ? (
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
            {wallet.lists.length && showSubWallet.includes(wallet.id) && !showExtendedBar ? (
              <SearchLList list={wallet.lists} leftMargin={false} paddingLeft={Number(paddingLeft) + 32} />
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
}
