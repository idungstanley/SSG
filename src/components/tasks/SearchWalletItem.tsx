import React from 'react';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useAppSelector } from '../../app/hooks';
import { EntityType } from '../../utils/EntityTypes/EntityType';

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
  handleShowSubWallet: (id: string, index?: number) => void;
  handleTabClick: (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    id: string,
    name: string,
    type: string
  ) => void;
}
export default function SearchWalletItem({
  wallet,
  showSubWallet,
  paddingLeft,
  handleShowSubWallet,
  handleTabClick
}: WalletItemProps) {
  const { activeItemId } = useAppSelector((state) => state.workspace);

  const renderOpenFolder = () => {
    return <FaFolderOpen color={wallet.color} />;
  };

  const renderCloseFolder = () => {
    return <FaFolder color={wallet.color} />;
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
      return <div className="pl-4">{renderCloseFolder()}</div>;
    }
  };

  return (
    <>
      <section
        className={`bg-white items-center truncate text-sm group ${
          wallet.id === activeItemId ? 'font-medium' : 'hover:bg-gray-100'
        }`}
        style={{
          zIndex: '1',
          opacity: 100
        }}
      >
        <div
          id="walletLeft"
          className="relative flex items-center flex-1 truncate"
          style={{ paddingLeft: `${paddingLeft}px`, height: '30px' }}
        >
          <div className="flex items-center" onClick={() => handleShowSubWallet(wallet.id)}>
            {renderIcons(showSubWallet)}
          </div>
          <div
            className="truncate cursor-pointer hover:underline hover:decoration-dashed"
            style={{ marginLeft: '17px' }}
          >
            <p
              className="capitalize truncate cursor-pointer"
              onClick={(e) => handleTabClick(e, wallet.id, wallet.name, EntityType.wallet)}
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
      </section>
    </>
  );
}
