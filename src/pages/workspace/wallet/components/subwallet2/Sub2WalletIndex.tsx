import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getWalletService } from '../../../../../features/wallet/walletService';
import MenuDropdown from '../../../../../components/Dropdown/DropdownForWorkspace';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { BsListUl } from 'react-icons/bs';
import { useAppSelector } from '../../../../../app/hooks';
import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import { useDispatch } from 'react-redux';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';
import {
  closeMenu,
  getSubMenu,
  setshowMenuDropdown,
} from '../../../../../features/hubs/hubSlice';

interface Sub2WalletIndexProps {
  wallet2ParentId?: string | null;
  padding?: string;
}

function Sub2WalletIndex({
  wallet2ParentId,
  padding = 'pl-14',
}: Sub2WalletIndexProps) {
  const dispatch = useDispatch();
  const [showSubWallet3, setShowSubWallet3] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<number>(-1);
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown } = useAppSelector((state) => state.hub);

  const { data: subwallet } = useQuery({
    queryKey: ['sub2walletlist', [wallet2ParentId]],
    queryFn: getWalletService,
  });

  const handleMouseOver = (i: number) => {
    setIsHovering(i);
  };
  const handleMouseOut = () => {
    setIsHovering(-1);
  };

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet3 === id) {
      return setShowSubWallet3(null);
    }
    setShowSubWallet3(id);
  };

  const navigate = useNavigate();
  const handleListLocation = (id: string) => {
    navigate(`/workspace/list/${id}`);
  };

  const handleLocation = (id: string, type = 'sub2wallet') => {
    navigate(`/workspace/wallet/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
  };

  const handleWalletSettings = (id: string, e) => {
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'wallet',
      })
    );
    if (showMenuDropdown != null) {
      if (e.target.id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  const handleItemAction = (id: string) => {
    dispatch(
      getSubMenu({
        SubMenuId: id,
        SubMenuType: 'wallet',
      })
    );
  };

  const handleListSettings = (id: string, e) => {
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'list',
      })
    );
    if (showMenuDropdown != null) {
      if (e.target.id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  return (
    <div>
      {subwallet?.data?.wallets.map((wallet, i) => (
        <div key={wallet.id}>
          <section
            className={`flex relative items-center justify-between space-x-1 text-sm h-8 ${padding} py-1.5 hover:bg-gray-100 ${
              wallet.id === activeItemId && 'bg-green-50 text-green-500'
            }`}
            onMouseEnter={() => handleMouseOver(i)}
            onMouseLeave={handleMouseOut}
          >
            {wallet.id === activeItemId && (
              <span className="absolute top-0 bottom-0 left-0 w-1 rounded-r-lg bg-green-500" />
            )}
            <div className="flex items-center">
              <div onClick={() => handleShowSubWallet(wallet.id)}>
                {showSubWallet3 === wallet.id ? (
                  <div className="flex items-center">
                    <VscTriangleDown
                      className="flex-shrink-0 h-3"
                      aria-hidden="true"
                      color="rgba(72, 67, 67, 0.64)"
                    />
                    <FaFolderOpen color="rgba(72, 67, 67, 0.64)" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <VscTriangleRight
                      className="flex-shrink-0 h-3"
                      aria-hidden="true"
                      color="rgba(72, 67, 67, 0.64)"
                    />
                    <FaFolder color="rgba(72, 67, 67, 0.64)" />
                  </div>
                )}
              </div>
              <div onClick={() => handleLocation(wallet.id)}>
                <p className="ml-2" style={{ fontSize: '10px' }}>
                  {wallet.name.length > 10
                    ? wallet.name.substr(0, 10) + '...'
                    : wallet.name}
                </p>
              </div>
            </div>
            {/* ends here */}
            <div
              id="walletRight"
              className={`flex items-center justify-end space-x-1 ${
                isHovering === i ? 'block' : 'hidden'
              }`}
            >
              <AiOutlineEllipsis
                className="cursor-pointer"
                onClick={(e) => handleWalletSettings(wallet.id, e)}
                id="menusettings"
              />
              <AiOutlinePlus
                onClick={() => handleItemAction(wallet.id)}
                className="cursor-pointer"
              />
            </div>
          </section>
          {showMenuDropdown === wallet.id ? <MenuDropdown /> : null}
        </div>
      ))}
      {subwallet?.data?.lists.map((list) => (
        <div key={list.id}>
          <section className="flex items-center justify-between pl-8 space-x-1 text-sm h-8 mr-6 hover:bg-gray-100">
            <div className="flex items-center space-x-1">
              <BsListUl className="flex-shrink-0 h-3 w-5" aria-hidden="true" />
              <div onClick={() => handleListLocation(list.id)}>{list.name}</div>
            </div>
            {/* ends here */}
            <button
              type="button"
              id="listright"
              className="flex items-center justify-end space-x-1 "
            >
              <AiOutlineEllipsis
                className="cursor-pointer"
                id="menusettings"
                onClick={(e) => handleListSettings(list.id, e)}
              />
            </button>
          </section>
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </div>
  );
}
export default Sub2WalletIndex;
