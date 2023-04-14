import React, { useState } from 'react';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeMenu, getPrevName, getSubMenu, setshowMenuDropdown } from '../../features/hubs/hubSlice';
import { setPaletteDropDown } from '../../features/account/accountSlice';
import Palette from '../ColorPalette';
import MenuDropdown from '../Dropdown/MenuDropdown';
import SubDropdown from '../Dropdown/SubDropdown';
import { setCreateWlLink } from '../../features/workspace/workspaceSlice';
import { ListColourProps } from './ListItem';
import { useParams } from 'react-router-dom';

interface WalletItemProps {
  handleShowSubWallet: (id: string) => void;
  handleLocation: (id: string, name: string, parentId?: string) => void;
  wallet: {
    id: string;
    name: string;
    color?: string;
    parent_id?: string | null;
    hub_id?: string;
  };
  showSubWallet: string | null;
  paddingLeft: string | number;
  walletType: string;
}
export default function WalletItem({
  handleShowSubWallet,
  wallet,
  showSubWallet,
  handleLocation,
  paddingLeft,
  walletType
}: WalletItemProps) {
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);
  const { paletteDropdown } = useAppSelector((state) => state.account);
  const { paletteId, show } = paletteDropdown;
  const [paletteColor, setPaletteColor] = useState<string | undefined | ListColourProps>('');
  const { walletId } = useParams();
  const dispatch = useAppDispatch();
  const handleItemAction = (id: string) => {
    dispatch(setCreateWlLink(false));
    dispatch(
      getSubMenu({
        SubMenuId: id,
        SubMenuType: walletType
      })
    );
  };
  const parentId = wallet.parent_id || wallet.hub_id;
  const handleWalletColour = (id: string, e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    dispatch(setPaletteDropDown({ show: true, paletteId: id, paletteType: 'wallet' }));
  };

  const handleWalletSettings = (id: string, name: string, e: React.MouseEvent<SVGElement>) => {
    dispatch(setCreateWlLink(false));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: walletType
      })
    );
    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  return (
    <>
      <section
        className={`flex items-center relative justify-between pr-1.5 py-1.5 text-sm h-8 group ${
          wallet.id === activeItemId ? 'text-green-700 font-medium' : 'hover:bg-gray-100'
        }`}
        onClick={() => handleShowSubWallet(wallet.id)}
        style={{ backgroundColor: `${wallet.id === walletId ? '#BF00FF21' : undefined}` }}
      >
        {wallet.id === walletId && (
          <span className="absolute top-0 bottom-0 left-0 w-1 rounded-r-lg" style={{ backgroundColor: '#BF00FF' }} />
        )}
        <div id="walletLeft" className="flex items-center justify-center" style={{ paddingLeft: `${paddingLeft}px` }}>
          {/* showsub1 */}
          <div className="flex items-center">
            {showSubWallet === wallet.id ? (
              <>
                <VscTriangleDown className="flex-shrink-0 h-2" aria-hidden="true" color="rgba(72, 67, 67, 0.64)" />
                <FaFolderOpen
                  color={paletteColor === '' ? wallet.color : (paletteColor as string)}
                  onClick={(e) => handleWalletColour(wallet.id, e)}
                />
              </>
            ) : (
              <>
                <VscTriangleRight className="flex-shrink-0 h-2" aria-hidden="true" color="#BBBDC0" />
                <FaFolder
                  color={paletteColor === '' ? wallet.color : (paletteColor as string)}
                  onClick={(e) => handleWalletColour(wallet.id, e)}
                />
              </>
            )}
          </div>
          <div
            onClick={() => handleLocation(wallet.id, wallet.name, parentId)}
            className="cursor-pointer hover:underline hover:decoration-dashed"
            style={{ marginLeft: '17px' }}
          >
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
          </div>
        </div>
        <div
          id="walletRight"
          className="flex items-center space-x-1 opacity-0 group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <AiOutlineEllipsis
            className="cursor-pointer"
            onClick={(e) => handleWalletSettings(wallet.id, wallet.name, e)}
            id="menusettings"
          />
          <AiOutlinePlus onClick={() => handleItemAction(wallet.id)} className="cursor-pointer" />
        </div>
      </section>
      {paletteId === wallet.id && show ? <Palette title="Wallet Colour" setPaletteColor={setPaletteColor} /> : null}
      {showMenuDropdown === wallet.id ? <MenuDropdown /> : null}
      {SubMenuId === wallet.id ? <SubDropdown /> : null}
    </>
  );
}
