import React from 'react';
import { useGetSubHub } from '../../../features/hubs/hubService';
import { useAppSelector } from '../../../app/hooks';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import {
  closeMenu,
  getCurrHubId,
  getCurrSubHubId,
  getSubMenu,
  setHubParentId,
  setshowMenuDropdown,
} from '../../../features/hubs/hubSlice';
import AvatarWithInitials from '../../avatar/AvatarWithInitials';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';
import MenuDropdown from '../../Dropdown/MenuDropdown';
import SHubDropdownList from '../../ItemsListInSidebar/components/SHubDropdownList';
import SubDropdown from '../../Dropdown/SubDropdown';

export default function SubHubIndex() {
  const dispatch = useDispatch();
  const { currentItemId } = useAppSelector((state) => state.workspace);
  const { data, status } = useGetSubHub({
    parentId: currentItemId,
  });

  if (status === 'success') {
    data?.data?.hubs.map(({ parent_id }) =>
      dispatch(setHubParentId(parent_id))
    );
  }
  const { hubParentId, showMenuDropdown, currSubHubId, SubMenuId } =
    useAppSelector((state) => state.hub);

  const handleClick = (id: string) => {
    dispatch(
      getCurrSubHubId({
        currSubHubId: id,
        currSubHubIdType: 'subhub',
      })
    );
    if (currSubHubId === id) {
      return dispatch(
        getCurrSubHubId({
          currSubHubId: null,
          currSubHubIdType: null,
        })
      );
    }
  };

  const handleShowMenu = (id: string, e) => {
    dispatch(getCurrHubId(id));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'subhub',
      })
    );
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
        SubMenuType: 'subhub',
      })
    );
  };

  return currentItemId === hubParentId ? (
    <div id="subhub">
      {data?.data?.hubs.length !== 0 &&
        data?.data?.hubs.map((subhub) => (
          <div key={subhub.id}>
            <section className="flex items-center justify-between pl-3 pr-1.5 py-1.5 text-sm hover:bg-gray-100 h-8">
              <div id="subhubleft" className="flex items-center justify-center">
                {/* showsub1 */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleClick(subhub.id)}
                  className="flex items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
                >
                  {currSubHubId === subhub.id ? (
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
              <div id="subhubRight" className="flex items-center space-x-1">
                <AiOutlineEllipsis
                  className="cursor-pointer"
                  onClick={(e) => handleShowMenu(subhub.id, e)}
                  id="menusettings"
                />
                <AiOutlinePlus
                  onClick={() => handleItemAction(subhub.id)}
                  className="cursor-pointer"
                />
              </div>
            </section>
            {currSubHubId === subhub.id ? <SHubDropdownList /> : null}
            {showMenuDropdown === subhub.id ? <MenuDropdown /> : null}
            {SubMenuId === subhub.id ? <SubDropdown /> : null}
          </div>
        ))}
    </div>
  ) : null;
}
