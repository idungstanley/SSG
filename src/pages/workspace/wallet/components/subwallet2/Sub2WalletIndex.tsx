import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWalletServices } from '../../../../../features/wallet/walletService';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { BsListUl } from 'react-icons/bs';
import { useAppSelector } from '../../../../../app/hooks';
import {
  setActiveEntity,
  setActiveItem,
  setShowHub,
} from '../../../../../features/workspace/workspaceSlice';
import { useDispatch } from 'react-redux';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';
import {
  closeMenu,
  getSubMenu,
  setshowMenuDropdown,
} from '../../../../../features/hubs/hubSlice';
import SubDropdown from '../../../../../components/Dropdown/SubDropdown';
import LastListIndex from './LastListIndex';
import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import { dataProps } from '../../../../../components/Index/walletIndex/WalletIndex';

interface Sub2WalletIndexProps {
  paddingLeft?: string;
  currWalId?: string;
}

function Sub2WalletIndex({
  paddingLeft = '56',
  currWalId,
}: Sub2WalletIndexProps) {
  const dispatch = useDispatch();
  const [showSubWallet3, setShowSubWallet3] = useState<string | null>(null);
  const [finalParentId, setFinalWalletParentId] = useState('');
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);
  const { toggleArchiveWallet } = useAppSelector((state) => state.wallet);
  const { data: subwallet } = getWalletServices({
    Archived: toggleArchiveWallet,
    parentId: currWalId,
  });

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet3 === id) {
      return setShowSubWallet3(null);
    }
    setFinalWalletParentId(id);
    setShowSubWallet3(id);
  };

  const navigate = useNavigate();
  const handleListLocation = (id: string) => {
    dispatch(setShowHub(true));
    navigate(`/workspace/list/${id}`);
  };

  const handleLocation = (id: string, type = 'sub2wallet') => {
    dispatch(setShowHub(true));
    navigate(`/workspace/wallet/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
    dispatch(setActiveEntity({ id: id, type: 'wallet' }));
  };

  const handleWalletSettings = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement | SVGElement>
  ) => {
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'subwallet3',
      })
    );
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  const handleItemAction = (id: string) => {
    dispatch(
      getSubMenu({
        SubMenuId: id,
        SubMenuType: 'subwallet3',
      })
    );
  };

  const handleListSettings = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement | SVGElement>
  ) => {
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'list',
      })
    );
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  return (
    <div>
      {subwallet?.data?.wallets.map((wallet: dataProps) => (
        <div key={wallet.id}>
          <section
            className={`flex relative items-center justify-between space-x-1 text-sm h-8 group py-1.5 hover:bg-gray-100 ${
              wallet.id === activeItemId &&
              'bg-green-100 text-black font-medium'
            }`}
            style={{ paddingLeft: `${paddingLeft}px` }}
          >
            {wallet.id === activeItemId && (
              <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg" />
            )}
            <div className="flex items-center">
              <div onClick={() => handleShowSubWallet(wallet.id)}>
                {showSubWallet3 === wallet.id ? (
                  <div className="flex items-center">
                    <VscTriangleDown
                      className="flex-shrink-0 h-2"
                      aria-hidden="true"
                      color="#BBBDC0"
                    />
                    <FaFolderOpen color="rgba(72, 67, 67, 0.64)" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <VscTriangleRight
                      className="flex-shrink-0 h-2"
                      aria-hidden="true"
                      color="#BBBDC0"
                    />
                    <FaFolder color="rgba(72, 67, 67, 0.64)" />
                  </div>
                )}
              </div>
              <div onClick={() => handleLocation(wallet.id)}>
                <p
                  className="ml-2 tracking-wider capitalize truncate cursor-pointer"
                  style={{ fontSize: '12px' }}
                >
                  {wallet.name.length > 10
                    ? wallet.name.substr(0, 10) + '...'
                    : wallet.name}
                </p>
              </div>
            </div>
            {/* ends here */}
            <div
              id="walletRight"
              className="flex items-center space-x-2 opacity-0 group-hover:opacity-100"
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
          {SubMenuId === wallet.id ? <SubDropdown /> : null}
          {showSubWallet3 === wallet.id ? (
            <LastListIndex finalParentId={finalParentId} />
          ) : null}
        </div>
      ))}
      {subwallet?.data?.lists.map((list: dataProps) => (
        <div key={list.id}>
          <section className="flex items-center justify-between h-8 mr-6 space-x-1 text-sm pl-14 hover:bg-gray-100 group">
            <div className="flex items-center space-x-1">
              <BsListUl className="flex-shrink-0 w-5 h-3" aria-hidden="true" />
              <div onClick={() => handleListLocation(list.id)}></div>
            </div>
            {/* ends here */}
            <button
              type="button"
              id="listright"
              className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
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
