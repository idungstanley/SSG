import React, { useState } from 'react';
import { Wallet } from '../../activetree.interfaces';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setCurrentItem } from '../../../../../../../features/workspace/workspaceSlice';
import { EntityType } from '../../../../../../../utils/EntityTypes/EntityType';
import SearchWalletItem from '../../../../../../../components/tasks/SearchWalletItem';
import SearchLList from '../list/SearchLList';
import { OPTIONS_WITH_AVAILABLE_LISTS } from '../../../../../tasks/component/taskMenu/TaskMenu';
import { unavailableStyles } from '../../../../../../../components/ActiveTree/ActiveTreeList';

interface IWListProps {
  wallets: Wallet[];
  leftMargin: boolean;
  paddingLeft: string | number;
  type: string;
  option?: string;
  level?: number;
  handleTabClick: (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    id: string,
    name: string,
    type: string
  ) => void;
}

export default function SearchWList({
  wallets,
  leftMargin,
  option,
  paddingLeft,
  level = 1,
  handleTabClick
}: IWListProps) {
  const dispatch = useAppDispatch();
  const { showExtendedBar } = useAppSelector((state) => state.workspace);

  const [showSubWallet, setShowSubWallet] = useState<string[]>([]);

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet.includes(id)) {
      setShowSubWallet((prev) => prev.filter((item) => item !== id));
    } else {
      setShowSubWallet((prev) => [...prev, id]);
      dispatch(
        setCurrentItem({
          currentItemId: id,
          currentItemType: EntityType.wallet
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
            walletType={level === 1 ? EntityType.wallet : EntityType.subWallet}
            handleShowSubWallet={handleShowSubWallet}
            handleTabClick={handleTabClick}
            showSubWallet={showSubWallet.includes(wallet.id)}
            paddingLeft={paddingLeft}
          />
          {wallet.children.length && showSubWallet.includes(wallet.id) ? (
            <SearchWList
              wallets={wallet.children}
              option={option}
              leftMargin={false}
              type={EntityType.subWallet}
              handleTabClick={handleTabClick}
              paddingLeft={Number(paddingLeft) + 15}
              level={level + 1}
            />
          ) : null}
          <div style={!OPTIONS_WITH_AVAILABLE_LISTS.includes(option as string) ? unavailableStyles : {}}>
            {wallet.lists.length && showSubWallet.includes(wallet.id) && !showExtendedBar ? (
              <SearchLList
                option={option}
                list={wallet.lists}
                leftMargin={false}
                paddingLeft={Number(paddingLeft) + 32}
              />
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
}
