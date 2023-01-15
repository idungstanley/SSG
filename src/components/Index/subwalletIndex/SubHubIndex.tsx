import React from 'react';
import { useGetSubHub } from '../../../features/hubs/hubService';
import { useAppSelector } from '../../../app/hooks';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import {
  getCurrHubId,
  setHubParentId,
  setshowMenuDropdown,
} from '../../../features/hubs/hubSlice';
import AvatarWithInitials from '../../avatar/AvatarWithInitials';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';
import MenuDropdown from '../../Dropdown/MenuDropdown';

export default function SubHubIndex() {
  const dispatch = useDispatch();
  const { currentItemId, currentItemType } = useAppSelector(
    (state) => state.workspace
  );
  // console.log(currentItemId, currentItemType);
  const { data, status } = useGetSubHub({
    parentId: currentItemId,
  });

  if (status === 'success') {
    data?.data?.hubs.map(({ parent_id }) =>
      dispatch(setHubParentId(parent_id))
    );
  }
  const { hubParentId, showMenuDropdown } = useAppSelector(
    (state) => state.hub
  );

  const handleShowMenu = (id) => {
    dispatch(getCurrHubId(id));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'subhub',
      })
    );
  };

  return currentItemId === hubParentId ? (
    <div id="subhub">
      {data?.data?.hubs.length !== 0 &&
        data?.data?.hubs.map((subhub, i) => (
          <div key={subhub.id}>
            <section className="flex items-center justify-between pl-3 pr-1.5 py-1.5 text-sm hover:bg-gray-100 h-8">
              <div id="subhubleft" className="flex items-center justify-center">
                {/* showsub1 */}
                <div
                  // onClick={() => handleShowSubWallet(wallet.id)}
                  className="flex items-center"
                >
                  {currentItemId === subhub.id ? (
                    <VscTriangleDown
                      className="flex-shrink-0 h-3 ml-1"
                      aria-hidden="true"
                      color="rgba(72, 67, 67, 0.64)"
                    />
                  ) : (
                    <VscTriangleRight
                      className="flex-shrink-0 h-3"
                      aria-hidden="true"
                      color="rgba(72, 67, 67, 0.64)"
                    />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 items-center">
                  <AvatarWithInitials
                    initials={subhub.name
                      .split(' ')
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join('')
                      .toUpperCase()}
                    height="h-4"
                    width="w-4"
                    backgroundColour="orange"
                    roundedStyle="rounded"
                  />
                  <span className="ml-4 overflow-hidden">
                    <h4
                      className="font-medium tracking-wider capitalize truncate"
                      style={{ fontSize: '10px' }}
                    >
                      {subhub.name}
                    </h4>
                  </span>
                </div>
              </div>
              <div
                id="subhubRight"
                className="flex items-center space-x-1"
                // className={`flex items-center justify-end space-x-1 ${
                //   isHovering === i ? 'block' : 'hidden'
                // }`}
                // onClick={() => setGetWalletId(wallet.id)}
              >
                <AiOutlineEllipsis
                  className="cursor-pointer"
                  onClick={() => handleShowMenu(subhub.id)}
                />
                <AiOutlinePlus className="cursor-pointer" />
              </div>
            </section>
            {/* <div>
                <WalletModal
                  walletVisible={showWalletModal}
                  onCloseWalletModal={() => setShowWalletModal(false)}
                  walletId={wallet.id}
                />
                {showSubWallet === wallet.id ? (
                  <SubWalletIndex walletParentId={walletParentId} />
                ) : null}
                <ListModal
                  walletId={wallet.id}
                  listVisible={showListModal}
                  onCloseListModal={() => setShowListModal(false)}
                />
              </div> */}
            {showMenuDropdown === subhub.id ? <MenuDropdown /> : null}
          </div>
        ))}
    </div>
  ) : null;
}
