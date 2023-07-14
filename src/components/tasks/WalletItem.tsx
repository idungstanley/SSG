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
import { Tooltip } from '@mui/material';

interface WalletItemProps {
  wallet: {
    id: string;
    name: string;
    color?: string;
    parent_id?: string | null;
    hub_id?: string;
    has_descendants?: number;
  };
  showSubWallet: string | null;
  paddingLeft: string | number;
  walletType: string;
  index?: number;
  isSticky?: boolean;
  topNumber?: number;
  zNumber?: string;
  stickyButtonIndex?: number | undefined;
  handleShowSubWallet: (id: string, index?: number) => void;
  handleLocation: (id: string, name: string, index?: number) => void;
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
    dispatch(setPaletteDropDown({ show: true, paletteId: id, paletteType: 'wallet' }));
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

  const renderIcons = (showSubWallet: string | null) => {
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
      return renderCloseFolder();
    }
  };

  return (
    <>
      <section
        className={`bg-white items-center truncate text-sm group ${
          wallet.id === activeItemId ? 'font-medium' : 'hover:bg-gray-100'
        } ${isSticky && stickyButtonIndex === index ? 'sticky bg-white' : ''}`}
        onClick={() => handleShowSubWallet(wallet.id, index)}
        style={{
          top: isSticky ? `${topNumber}px` : '',
          zIndex: isSticky ? zNumber : '1'
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
          {/* showsub1 */}
          <div className="flex items-center">{renderIcons(showSubWallet)}</div>
          <div
            onClick={() => handleLocation(wallet.id, wallet.name, index)}
            className="truncate cursor-pointer hover:underline hover:decoration-dashed"
            style={{ marginLeft: '17px' }}
          >
            <Tooltip title={wallet.name} arrow placement="top">
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
            </Tooltip>
          </div>
          {showSidebar && (
            <div
              id="walletRight"
              className="relative flex items-center pr-1 ml-auto space-x-2 opacity-0 z-1 group-hover:opacity-100 hover:text-fuchsia-500"
              onClick={(e) => e.stopPropagation()}
            >
              <span onClick={() => handleItemAction(wallet.id, wallet.name)} className="cursor-pointer">
                <PlusIcon />
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
    </>
  );
}
