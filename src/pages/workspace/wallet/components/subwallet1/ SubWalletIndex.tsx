import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { getWalletService } from '../../../../../features/wallet/walletService';
import MenuDropdown from '../../../../../components/Dropdown/DropdownForWorkspace';
import PlusDropDown from '../../../hubs/components/PlusDropDown';
import Sub2WalletIndex from '../subwallet2/Sub2WalletIndex';
import TaskDropdown from '../../../tasks/component/TaskDropdown';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';

interface SubWalletIndexProps {
  walletParentId?: string;
}

function SubWalletIndex({ walletParentId }: SubWalletIndexProps) {
  const [wallet2ParentId, setWallet2ParentId] = useState('');
  const [walletId, setGetWalletId] = useState('');
  const [getListId, setGetListId] = useState('');
  const { data: subwallet } = useQuery({
    queryKey: ['subwalletlist', [walletParentId]],
    queryFn: getWalletService,
  });

  const [showSubWallet2, setShowSubWallet2] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<number>(-1);

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
  const handleLocation = (id: string) => {
    navigate(`/workspace/wallet/${id}`);
  };

  const handleListLocation = (id: string) => {
    navigate(`/workspace/list/${id}`);
  };

  return (
    <div>
      {subwallet?.data?.wallets.map((wallet, index) => (
        <div key={wallet.id}>
          <section
            className="flex items-center justify-between pl-8 text-sm h-8 py-1.5 space-x-1 hover:bg-gray-100"
            onMouseEnter={() => handleMouseOver(index)}
            onMouseLeave={handleMouseOut}
          >
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
              className={`flex items-center justify-end space-x-1 ${
                isHovering === index ? 'block' : 'hidden'
              }`}
              onClick={() => setGetWalletId(wallet.id)}
            >
              <MenuDropdown />
              <PlusDropDown walletId={walletId} />
            </div>
          </section>
          <div>
            {showSubWallet2 === wallet.id ? (
              <Sub2WalletIndex wallet2ParentId={wallet2ParentId} />
            ) : null}
          </div>
        </div>
      ))}
      {subwallet?.data?.lists.map((list) => (
        <div key={list.id}>
          <section className="flex items-center justify-between pl-16 space-x-1 text-sm hover:bg-gray-100">
            <div className="flex items-center">
              <EllipsisHorizontalCircleIcon
                className="flex-shrink-0 w-5 h-3"
                aria-hidden="true"
              />
              <div onClick={() => handleListLocation(list.id)}>{list.name}</div>
            </div>
            {/* ends here */}
            <div
              id="listright"
              className="flex items-center justify-end space-x-1"
              onClick={() => setGetListId(list.id)}
            >
              <TaskDropdown getListId={getListId} />
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}

export default SubWalletIndex;
