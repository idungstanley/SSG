import React, { useEffect, useState } from 'react';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  closeMenu,
  getPrevName,
  getSubMenu,
  setCreateWLID,
  setSelectedTreeDetails,
  setshowMenuDropdown
} from '../../features/hubs/hubSlice';
import { setPaletteDropDown } from '../../features/account/accountSlice';
import Palette from '../ColorPalette';
import MenuDropdown from '../Dropdown/MenuDropdown';
import SubDropdown from '../Dropdown/SubDropdown';
import { setCreateWlLink } from '../../features/workspace/workspaceSlice';
import { ListColourProps } from './ListItem';
import { useParams } from 'react-router-dom';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import PlusIcon from '../../assets/icons/PlusIcon';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import Drag from '../../assets/icons/Drag';
import ToolTip from '../Tooltip/Tooltip';
import { Wallet } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import ActiveBackground from './Component/ActiveBackground';
import ActiveBarIdentification from './Component/ActiveBarIdentification';
import { useAbsolute } from '../../hooks/useAbsolute';
import { IWallet } from '../../features/hubs/hubs.interfaces';
import { APP_TASKS } from '../../app/constants/app';
import { STORAGE_KEYS, dimensions } from '../../app/config/dimensions';

interface WalletItemProps {
  wallet: Wallet;
  showSubWallet: boolean;
  paddingLeft: string | number;
  walletType: string;
  topNumber?: number;
  zNumber?: string;
  isExtendedBar?: boolean;
  level?: number;
  handleShowSubWallet: (id: string, type?: string) => void;
  handleLocation: (id: string, name: string, item: IWallet) => void;
}
export default function WalletItem({
  wallet,
  showSubWallet,
  paddingLeft,
  walletType,
  topNumber = 0,
  zNumber,
  level,
  isExtendedBar,
  handleShowSubWallet,
  handleLocation
}: WalletItemProps) {
  const dispatch = useAppDispatch();
  const { walletId } = useParams();

  const { activeItemId, openedEntitiesIds } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);
  const { paletteDropdown, showSidebar } = useAppSelector((state) => state.account);
  const { updateCords } = useAppSelector((state) => state.task);

  const { paletteId, show } = paletteDropdown;

  const [paletteColor, setPaletteColor] = useState<string | undefined | ListColourProps | null>('');

  const handleItemAction = (id: string, name: string | null) => {
    dispatch(setSelectedTreeDetails({ name, id, type: EntityType.wallet }));
    dispatch(setCreateWlLink(false));
    dispatch(
      getSubMenu({
        SubMenuId: id,
        SubMenuType: walletType
      })
    );
  };

  const handleWalletColour = (id: string, e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    dispatch(setPaletteDropDown({ show: true, paletteId: id, paletteType: EntityType.wallet }));
  };

  const handleWalletSettings = (id: string, name: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    dispatch(setSelectedTreeDetails({ name, id, type: EntityType.wallet }));
    dispatch(setCreateWLID(null));
    dispatch(setCreateWlLink(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: walletType
      })
    );
    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id === 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  const renderOpenFolder = () => {
    return (
      <FaFolderOpen
        className="w-4 h-3"
        color={paletteColor === '' ? wallet.color : (paletteColor as string)}
        onClick={(e) => handleWalletColour(wallet.id, e)}
      />
    );
  };

  const renderCloseFolder = () => {
    return (
      <FaFolder
        className="w-4 h-3"
        color={paletteColor === '' ? wallet.color : (paletteColor as string)}
        onClick={(e) => handleWalletColour(wallet.id, e)}
      />
    );
  };

  const renderIcons = (showSubWallet: boolean) => {
    if (wallet?.children.length || wallet?.lists.length) {
      if (showSubWallet) {
        return (
          <>
            <VscTriangleDown
              className="flex-shrink-0 h-2 hover:fill-[#BF01FE] cursor-pointer"
              aria-hidden="true"
              color="rgba(72, 67, 67, 0.64)"
            />
            {renderOpenFolder()}
          </>
        );
      } else {
        return (
          <>
            <VscTriangleRight
              className="flex-shrink-0 h-2 hover:fill-[#BF01FE] cursor-pointer"
              aria-hidden="true"
              color="rgba(72, 67, 67, 0.64)"
            />
            {renderCloseFolder()}
          </>
        );
      }
    } else {
      return <div style={{ paddingLeft: '14px' }}>{renderCloseFolder()}</div>;
    }
  };

  const { isOver, setNodeRef } = useDroppable({
    id: wallet.id,
    data: {
      isOverWallet: true
    }
  });

  useEffect(() => {
    if (isOver) {
      handleShowSubWallet(wallet.id, 'isOver');
    }
  }, [isOver]);

  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
    transform
  } = useDraggable({
    id: wallet.id,
    data: {
      isWallet: true
    }
  });

  const { cords, relativeRef } = useAbsolute(updateCords, 230);
  const { cords: menuCords, relativeRef: menuRef } = useAbsolute(updateCords, 352);

  const sidebarWidthFromLS =
    (JSON.parse(localStorage.getItem(STORAGE_KEYS.SIDEBAR_WIDTH) || '""') as number) ||
    dimensions.navigationBar.default;

  return (
    <div
      className={`${openedEntitiesIds.includes(wallet.id) ? 'sticky bg-white' : ''}`}
      style={{
        top: openedEntitiesIds.includes(wallet.id) && showSidebar ? topNumber : '',
        zIndex: openedEntitiesIds.includes(wallet.id) ? zNumber : '2',
        opacity: transform ? 0 : 100
      }}
    >
      <section
        className={`bg-white items-center truncate text-sm group ${
          wallet.id === activeItemId ? 'font-medium' : 'hover:bg-alsoit-gray-50'
        } ${isOver ? 'bg-primary-100 border-primary-500 shadow-inner shadow-primary-300' : ''}`}
        ref={setNodeRef}
        onClick={() => handleShowSubWallet(wallet.id)}
      >
        <div
          id="walletLeft"
          className="relative flex items-center justify-between"
          style={{ paddingLeft: `${paddingLeft}px`, height: '30px' }}
        >
          <div className="flex items-center justify-between">
            <ActiveBackground showBgColor={wallet.id === walletId} />
            <ActiveBarIdentification showBar={wallet.id === walletId} />
            <div
              className="absolute left-2 rounded-r-lg w-0.5 opacity-0 group-hover:opacity-100 cursor-move"
              ref={draggableRef}
              {...listeners}
              {...attributes}
            >
              <Drag />
            </div>
            {/* showsub1 */}
            <div className="flex items-center gap-5">
              <div className="flex items-center" style={{ zIndex: '1' }} ref={relativeRef}>
                {renderIcons(showSubWallet)}
              </div>
              <div
                onClick={() => handleLocation(wallet.id, wallet.name, wallet as Wallet)}
                className="truncate cursor-pointer hover:underline hover:decoration-dashed"
                style={{ width: sidebarWidthFromLS - 135 - Number(paddingLeft) }}
              >
                <ToolTip title={wallet.name}>
                  <p
                    className={`capitalize truncate cursor-pointer text-left ${
                      wallet.id === walletId ? 'text-alsoit-purple-300' : ''
                    }`}
                    style={{
                      fontSize: '13px',
                      lineHeight: '15.56px',
                      verticalAlign: 'baseline',
                      letterSpacing: '0.28px'
                    }}
                  >
                    {wallet.name}
                  </p>
                </ToolTip>
              </div>
            </div>
          </div>
          {showSidebar && (
            <div
              id="walletRight"
              className="relative flex items-center pr-1 ml-auto space-x-2 opacity-0 z-1 group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
              ref={menuRef}
            >
              <ToolTip title="Create subwallet and list">
                <span
                  onClick={() => handleItemAction(wallet.id, wallet.name)}
                  className="cursor-pointer hover:text-alsoit-purple-300"
                >
                  <PlusIcon />
                </span>
              </ToolTip>
              <ToolTip title="Wallet settings">
                <span
                  className="cursor-pointer hover:text-alsoit-purple-300"
                  onClick={(e) => {
                    handleWalletSettings(wallet.id, wallet.name, e);
                  }}
                  id="menusettings"
                >
                  <ThreeDotIcon />
                </span>
              </ToolTip>
            </div>
          )}
        </div>
      </section>
      {paletteId === wallet.id && show ? (
        <Palette
          title="Wallet"
          activeOutterColor={wallet.color}
          setPaletteColor={setPaletteColor}
          cords={{ top: cords.top, left: 10 }}
        />
      ) : null}
      {showMenuDropdown === wallet.id ? (
        <MenuDropdown
          entityType={EntityType.wallet}
          item={wallet as Wallet}
          isExtendedBar={isExtendedBar}
          cords={menuCords}
        />
      ) : null}
      {SubMenuId === wallet.id ? <SubDropdown walletLevel={level} cords={menuCords} placeHubType={APP_TASKS} /> : null}
    </div>
  );
}
