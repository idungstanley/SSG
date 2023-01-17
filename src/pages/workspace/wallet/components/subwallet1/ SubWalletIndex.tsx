import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWalletService } from '../../../../../features/wallet/walletService';
import Sub2WalletIndex from '../subwallet2/Sub2WalletIndex';
import TaskDropdown from '../../../tasks/component/TaskDropdown';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';
import { setWalletId } from '../../../../../features/wallet/walletSlice';
import { setshowMenuDropdown } from '../../../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import { BsListUl } from 'react-icons/bs';
import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import { useAppSelector } from '../../../../../app/hooks';

interface SubWalletIndexProps {
  walletParentId?: string;
  padding?: string;
}

function SubWalletIndex({ walletParentId, padding }: SubWalletIndexProps) {
  const dispatch = useDispatch();
  const [wallet2ParentId, setWallet2ParentId] = useState('');
  const [getListId, setGetListId] = useState('');
  const [showSubWallet2, setShowSubWallet2] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<number>(-1);
  const { data: subwallet } = useQuery({
    queryKey: ['subwalletlist', [walletParentId]],
    queryFn: getWalletService,
  });
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { showMenuDropdown } = useAppSelector((state) => state.hub);

  const handleShowSubWallet = (id: string) => {
    setWallet2ParentId(id);
    if (showSubWallet2 === id) {
      return setShowSubWallet2(null);
    }
    setShowSubWallet2(id);
  };

  const handleMouseOver = (i: number) => {
    setIsHovering(i);
  };
  const handleMouseOut = () => {
    setIsHovering(-1);
  };

  const navigate = useNavigate();
  const handleLocation = (id: string, type = 'subWallet') => {
    navigate(`/workspace/wallet/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
  };

  const handleListLocation = (id: string) => {
    navigate(`/workspace/list/${id}`);
  };

  const handleWalletSettings = (id: string) => {
    dispatch(setWalletId(id));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'subwallet',
      })
    );
  };

  return (
    <div>
      {subwallet?.data?.wallets.map((wallet, index) => (
        <div key={wallet.id}>
          <section
            className={`flex relative items-center justify-between ${padding} text-sm h-8 py-1.5 space-x-1 hover:bg-gray-100 ${
              wallet.id === activeItemId && 'bg-green-50 text-green-500'
            }`}
            onMouseEnter={() => handleMouseOver(index)}
            onMouseLeave={handleMouseOut}
          >
            {wallet.id === activeItemId && (
              <span className="absolute top-0 bottom-0 left-0 w-1 rounded-r-lg bg-green-500" />
            )}
            {/* showsub2 */}
            <div className="flex items-center">
              <div onClick={() => handleShowSubWallet(wallet.id)}>
                {showSubWallet2 === wallet.id ? (
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
              // className={`flex items-center justify-end space-x-1 ${
              //   isHovering === index ? 'block' : 'hidden'
              // }`}
              className="flex items-center space-x-2"
            >
              <AiOutlineEllipsis
                className="cursor-pointer"
                onClick={() => handleWalletSettings(wallet.id)}
              />
              <AiOutlinePlus />
            </div>
          </section>
          <div>
            {showSubWallet2 === wallet.id ? (
              <Sub2WalletIndex wallet2ParentId={wallet2ParentId} />
            ) : null}
            {showMenuDropdown === wallet.id ? <MenuDropdown /> : null}
          </div>
        </div>
      ))}
      {subwallet?.data?.lists.map((list) => (
        <div key={list.id}>
          <section className="flex items-center justify-between pl-8 space-x-1 text-sm hover:bg-gray-100">
            <div className="flex items-center">
              <BsListUl className="flex-shrink-0 h-3 w-5" aria-hidden="true" />
              <div onClick={() => handleListLocation(list.id)}>{list.name}</div>
            </div>
            {/* ends here */}
            <div
              id="listright"
              className="flex items-center justify-end space-x-1"
              onClick={() => setGetListId(list.id)}
            >
              <TaskDropdown />
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}

SubWalletIndex.defaultProps = {
  padding: 'pl-8',
};
export default SubWalletIndex;
