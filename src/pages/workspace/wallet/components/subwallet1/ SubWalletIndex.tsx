import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWalletServices } from '../../../../../features/wallet/walletService';
import Sub2WalletIndex from '../subwallet2/Sub2WalletIndex';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';
import {
  closeMenu,
  getPrevName,
  getSubMenu,
  setshowMenuDropdown,
} from '../../../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import {
  setActiveItem,
  setShowHub,
} from '../../../../../features/workspace/workspaceSlice';
import { BsListUl } from 'react-icons/bs';
import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import { useAppSelector } from '../../../../../app/hooks';
import SubDropdown from '../../../../../components/Dropdown/SubDropdown';

interface SubWalletIndexProps {
  padding?: string;
}

function SubWalletIndex({ padding = 'pl-8' }: SubWalletIndexProps) {
  const dispatch = useDispatch();
  const { currentWalletParentId, toggleArchiveWallet } = useAppSelector(
    (state) => state.wallet
  );

  const [showSubWallet2, setShowSubWallet2] = useState<string | null>(null);
  const [currWalId, setCurrWalId] = useState('');
  const { data: subwallet } = getWalletServices({
    Archived: toggleArchiveWallet,
    parentId: currentWalletParentId,
  });
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);

  const handleShowSubWallet = (id: string) => {
    setShowSubWallet2(id);
    setCurrWalId(id);
    if (showSubWallet2 === id) {
      return setShowSubWallet2(null);
    }
  };

  const navigate = useNavigate();
  const handleLocation = (id: string, type = 'subWallet') => {
    dispatch(setShowHub(true));
    navigate(`/workspace/wallet/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
    setShowSubWallet2(id);
    setCurrWalId(id);
  };

  const handleListLocation = (id: string, name: string) => {
    navigate(`/workspace/list/${id}`);
    dispatch(
      setActiveItem({
        activeItemType: 'list',
        activeItemId: id,
        activeItemName: name,
      })
    );
  };

  const handleWalletSettings = (id: string, name: string, e) => {
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'subwallet',
      })
    );
    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if (e.target.id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };
  const handleListSettings = (id: string, name: string, e) => {
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'list',
      })
    );
    dispatch(getPrevName(name));
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
        SubMenuType: 'subwallet2',
      })
    );
  };
  return (
    <div>
      {subwallet?.data?.wallets.map((wallet) => (
        <div key={wallet.id}>
          <section
            className={`flex relative items-center justify-between group ${padding} text-sm h-8 py-1.5 space-x-1 hover:bg-gray-100 ${
              wallet.id === activeItemId && 'bg-green-100 text-black'
            }`}
          >
            {wallet.id === activeItemId && (
              <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg" />
            )}
            {/* showsub2 */}
            <div className="flex items-center">
              <div onClick={() => handleShowSubWallet(wallet.id)}>
                {showSubWallet2 === wallet.id ? (
                  <div className="flex items-center">
                    <VscTriangleDown
                      className="flex-shrink-0 h-2"
                      aria-hidden="true"
                      color="rgba(72, 67, 67, 0.64)"
                    />
                    <FaFolderOpen color="rgba(72, 67, 67, 0.64)" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <VscTriangleRight
                      className="flex-shrink-0 h-2"
                      aria-hidden="true"
                      color="rgba(72, 67, 67, 0.64)"
                    />
                    <FaFolder color="rgba(72, 67, 67, 0.64)" />
                  </div>
                )}
              </div>
              <div
                onClick={() => handleLocation(wallet.id)}
                className="cursor-pointer hover:underline hover:decoration-dashed"
              >
                <p
                  className="ml-2 font-medium tracking-wider capitalize truncate"
                  style={{ fontSize: '10px' }}
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
                onClick={(e) => handleWalletSettings(wallet.id, wallet.name, e)}
                id="menusettings"
              />
              <AiOutlinePlus
                onClick={() => handleItemAction(wallet.id)}
                className="cursor-pointer"
              />
            </div>
          </section>
          <div>
            {showSubWallet2 === wallet.id ? (
              <Sub2WalletIndex currWalId={currWalId} />
            ) : null}
          </div>
          {showMenuDropdown === wallet.id ? <MenuDropdown /> : null}
          {SubMenuId === wallet.id ? <SubDropdown /> : null}
        </div>
      ))}
      {subwallet?.data?.lists.map((list) => (
        <div key={list.id}>
          <section
            className={`relative flex items-center justify-between h-8 pr-6 space-x-1 text-sm hover:bg-gray-100 group ${
              list.id === activeItemId && 'bg-green-100 text-black font-medium'
            }`}
          >
            {list.id === activeItemId && (
              <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg" />
            )}
            <div className="flex items-center pl-8 space-x-1 tracking-wider capitalize truncate cursor-pointer">
              <BsListUl className="flex-shrink-0 w-5 h-3" aria-hidden="true" />
              <div onClick={() => handleListLocation(list.id, list.name)}>
                {list.name}
              </div>
            </div>
            {/* ends here */}
            <button
              type="button"
              id="listright"
              className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100"
            >
              {/* <TaskDropdown /> */}
              <AiOutlineEllipsis
                className="cursor-pointer"
                id="menusettings"
                onClick={(e) => handleListSettings(list.id, list.name, e)}
              />
            </button>
          </section>
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </div>
  );
}

export default SubWalletIndex;
