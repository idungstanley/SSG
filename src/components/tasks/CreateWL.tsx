import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import {
  setCreateListSlideOverVisibility,
  setCreateWalletSlideOverVisibility
} from '../../features/general/slideOver/slideOverSlice';
import { setCreateWlLink } from '../../features/workspace/workspaceSlice';

export default function CreateWL({ paddingLeft }: { paddingLeft: string | number }) {
  const dispatch = useAppDispatch();
  const handleCreateWallet = () => {
    dispatch(setCreateWlLink(true));
    dispatch(setCreateWalletSlideOverVisibility(true));
  };
  const handleCreateList = () => {
    dispatch(setCreateWlLink(true));
    dispatch(setCreateListSlideOverVisibility(true));
  };
  return (
    <div
      className="flex space-x-1 text-xs py-1.5 h-8 tracking-wider capitalize truncate"
      style={{ paddingLeft: `${paddingLeft}px` }}
    >
      <span>
        Create a
        <span onClick={handleCreateWallet} className="mx-1 underline cursor-pointer">
          Wallet,
        </span>
        <span onClick={handleCreateList} className="underline cursor-pointer">
          List
        </span>
      </span>
    </div>
  );
}
