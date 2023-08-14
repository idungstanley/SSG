import React, { useState } from 'react';
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

interface WalletItemProps {
  wallet: {
    id: string;
    name: string;
    color?: string;
    parent_id?: string | null;
    hub_id?: string;
    has_descendants?: number;
  };
  showSubWallet: boolean;
  paddingLeft: string | number;
  walletType: string;
  index?: number;
  isSticky?: boolean;
  topNumber?: number;
  zNumber?: string;
  stickyButtonIndex?: number | undefined;
  handleShowSubWallet: (id: string, parent_id: string | null, index?: number) => void;
  handleLocation: (id: string, name: string, parent_id: string | null, index?: number) => void;
}
export default function WalletItem({
  wallet,
  showSubWallet,
  paddingLeft,
  walletType,
  index,
  isSticky,
  stickyButtonIndex,
  topNumber = 0,
  zNumber,
  handleShowSubWallet,
  handleLocation
}: WalletItemProps) {
  const dispatch = useAppDispatch();
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);
  const { paletteDropdown, lightBaseColor, baseColor, showSidebar } = useAppSelector((state) => state.account);
  const { paletteId, show } = paletteDropdown;
  const { walletId } = useParams();
  const [paletteColor, setPaletteColor] = useState<string | undefined | ListColourProps>('');

  const closeSubMenu = () => {
    dispatch(
      getSubMenu({
        SubMenuId: null,
        SubMenuType: null
      })
    );
  };

  const closeMenuDropdown = () => {
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: null,
        showMenuDropdownType: null
      })
    );
  };

  const handleItemAction = (id: string, name: string | null) => {
    if (id === SubMenuId) {
      closeSubMenu();
    } else {
      closeMenuDropdown();
      dispatch(setSelectedTreeDetails({ name, id, type: EntityType.wallet }));
      dispatch(setCreateWlLink(false));
      dispatch(
        getSubMenu({
          SubMenuId: id,
          SubMenuType: walletType
        })
      );
    }
  };

  const handleWalletColour = (id: string, e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    dispatch(setPaletteDropDown({ show: true, paletteId: id, paletteType: EntityType.wallet }));
  };

  const handleWalletSettings = (id: string, name: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    dispatch(setSelectedTreeDetails({ name, id, type: EntityType.wallet }));
    dispatch(setCreateWLID(null));
    dispatch(setCreateWlLink(false));
    if (id === showMenuDropdown) {
      closeMenuDropdown();
    } else {
      closeSubMenu();
      dispatch(
        setshowMenuDropdown({
          showMenuDropdown: id,
          showMenuDropdownType: walletType
        })
      );
    }
    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  const renderOpenFolder = () => {
    return (
      <FaFolderOpen
        color={paletteColor === '' ? wallet.color : (paletteColor as string)}
        onClick={(e) => handleWalletColour(wallet.id, e)}
      />
    );
  };

  const renderCloseFolder = () => {
    return (
      <FaFolder
        color={paletteColor === '' ? wallet.color : (paletteColor as string)}
        onClick={(e) => handleWalletColour(wallet.id, e)}
      />
    );
  };

  const renderIcons = (showSubWallet: boolean) => {
    if (wallet?.has_descendants) {
      if (showSubWallet) {
        return (
          <>
            <VscTriangleDown className="flex-shrink-0 h-2" aria-hidden="true" color="rgba(72, 67, 67, 0.64)" />
            {renderOpenFolder()}
          </>
        );
      } else {
        return (
          <>
            <VscTriangleRight className="flex-shrink-0 h-2" aria-hidden="true" color="rgba(72, 67, 67, 0.64)" />
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

  return (
    <div className="relative">
      <section
        className={`bg-white items-center truncate text-sm group ${
          wallet.id === activeItemId ? 'font-medium' : 'hover:bg-gray-100'
        } ${isSticky && stickyButtonIndex === index ? 'sticky bg-white' : ''} ${
          isOver ? 'bg-primary-100 border-primary-500 shadow-inner shadow-primary-300' : ''
        }`}
        ref={setNodeRef}
        onClick={() => handleShowSubWallet(wallet.id, wallet.parent_id || wallet.hub_id || null, index)}
        style={{
          top: isSticky ? `${topNumber}px` : '',
          zIndex: isSticky ? zNumber : '1',
          opacity: transform ? 0 : 100
        }}
      >
        <div
          id="walletLeft"
          className="relative flex items-center flex-1 truncate"
          style={{ paddingLeft: `${paddingLeft}px`, height: '30px' }}
        >
          {wallet.id === walletId && (
            <span
              className="absolute inset-0 z-0 before:content before:absolute before:inset-0"
              style={{ backgroundColor: lightBaseColor }}
            />
          )}
          {wallet.id === walletId && (
            <span
              className="absolute top-0 bottom-0 left-0 w-0.5 rounded-r-lg"
              style={{ backgroundColor: baseColor }}
            />
          )}
          <div
            className="absolute left-2 rounded-r-lg w-0.5 opacity-0 group-hover:opacity-100 cursor-move"
            ref={draggableRef}
            {...listeners}
            {...attributes}
          >
            <Drag />
          </div>
          {/* showsub1 */}
          <div className="flex items-center" style={{ zIndex: '1' }}>
            {renderIcons(showSubWallet)}
          </div>
          <div
            onClick={() => handleLocation(wallet.id, wallet.name, wallet.parent_id || wallet.hub_id || null, index)}
            className="truncate cursor-pointer hover:underline hover:decoration-dashed"
            style={{ marginLeft: '17px' }}
          >
            <ToolTip title={wallet.name}>
              <p
                className="capitalize truncate cursor-pointer"
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
          {showSidebar && (
            <div
              id="walletRight"
              className="relative flex items-center pr-1 ml-auto space-x-2 opacity-0 z-1 group-hover:opacity-100 hover:text-fuchsia-500"
              onClick={(e) => e.stopPropagation()}
            >
              <span onClick={() => handleItemAction(wallet.id, wallet.name)} className="cursor-pointer">
                <PlusIcon active />
              </span>
              <span
                className="cursor-pointer"
                onClick={(e) => handleWalletSettings(wallet.id, wallet.name, e)}
                id="menusettings"
              >
                <ThreeDotIcon />
              </span>
            </div>
          )}
        </div>
      </section>
      {paletteId === wallet.id && show ? <Palette title="Wallet Colour" setPaletteColor={setPaletteColor} /> : null}
      {showMenuDropdown === wallet.id ? <MenuDropdown /> : null}
      {SubMenuId === wallet.id ? <SubDropdown /> : null}
    </div>
  );
}
