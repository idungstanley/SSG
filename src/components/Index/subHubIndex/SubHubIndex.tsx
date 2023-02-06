import React, { useState } from 'react';
import { useGetSubHub } from '../../../features/hubs/hubService';
import { useAppSelector } from '../../../app/hooks';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import {
  closeMenu,
  getCurrHubId,
  getCurrSubHubId,
  getPrevName,
  getSubMenu,
  setHubParentId,
  setshowMenuDropdown,
} from '../../../features/hubs/hubSlice';
import AvatarWithInitials from '../../avatar/AvatarWithInitials';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';
import MenuDropdown from '../../Dropdown/MenuDropdown';
import SHubDropdownList from '../../ItemsListInSidebar/components/SHubDropdownList';
import SubDropdown from '../../Dropdown/SubDropdown';
import {
  setActiveItem,
  setShowHub,
} from '../../../features/workspace/workspaceSlice';
import { useNavigate } from 'react-router-dom';

export default function SubHubIndex() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSubChildren, setShowSubChidren] = useState<string | null>(null);
  const { currentItemId, activeItemId } = useAppSelector(
    (state) => state.workspace
  );
  const { data, status } = useGetSubHub({
    parentId: currentItemId,
  });

  if (status === 'success') {
    data?.data?.hubs.map(({ parent_id }) =>
      dispatch(setHubParentId(parent_id))
    );
  }
  const { hubParentId, showMenuDropdown, SubMenuId } = useAppSelector(
    (state) => state.hub
  );

  const handleClick = (id: string, name: string) => {
    setShowSubChidren(id);
    dispatch(
      setActiveItem({
        activeItemType: 'subhub',
        activeItemId: id,
        activeItemName: name,
      })
    );
    dispatch(
      getCurrSubHubId({
        currSubHubId: id,
        currSubHubIdType: 'subhub',
      })
    );
    if (showSubChildren === id) {
      return setShowSubChidren(null);
    }
  };

  const handleShowMenu = (id: string, name: string, e) => {
    dispatch(getCurrHubId(id));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'subhub',
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
        SubMenuType: 'subhub',
      })
    );
  };

  const handleLocation = (id: string, name: string) => {
    dispatch(setShowHub(true));
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: 'subhub',
        activeItemName: name,
      })
    );
    navigate(`/workspace/hub/${id}`);
  };

  return currentItemId === hubParentId ? (
    <div id="subhub">
      {data?.data?.hubs.length !== 0 &&
        data?.data?.hubs.map((subhub) => (
          <div key={subhub.id}>
            <section
              className={`flex items-center relative justify-between pr-1.5 py-1.5 text-sm hover:bg-gray-100 h-8 group ${
                subhub.id === activeItemId &&
                'bg-green-100 text-black font-medium'
              }`}
              onClick={() => handleClick(subhub.id, subhub.name)}
            >
              {subhub.id === activeItemId && (
                <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg" />
              )}
              <div
                id="subhubleft"
                className="flex items-center justify-center pl-3 "
              >
                {/* showsub1 */}
                <div
                  role="button"
                  tabIndex={0}
                  className="flex items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
                >
                  {showSubChildren === subhub.id ? (
                    <VscTriangleDown
                      className="flex-shrink-0 h-2"
                      aria-hidden="true"
                      color="rgba(72, 67, 67, 0.64)"
                    />
                  ) : (
                    <VscTriangleRight
                      className="flex-shrink-0 h-2"
                      aria-hidden="true"
                      color="rgba(72, 67, 67, 0.64)"
                    />
                  )}
                </div>
                <div className="flex items-center flex-1 min-w-0">
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
                      className="tracking-wider capitalize truncate cursor-pointer"
                      style={{ fontSize: '12px' }}
                      onClick={() => handleLocation(subhub.id, subhub.name)}
                    >
                      {subhub.name}
                    </h4>
                  </span>
                </div>
              </div>
              <div
                id="subhubRight"
                className="flex items-center space-x-1 text-black opacity-0 group-hover:opacity-100"
              >
                <AiOutlineEllipsis
                  className="cursor-pointer"
                  onClick={(e) => handleShowMenu(subhub.id, subhub.name, e)}
                  id="menusettings"
                />
                <AiOutlinePlus
                  onClick={() => handleItemAction(subhub.id)}
                  className="cursor-pointer"
                />
              </div>
            </section>
            {showSubChildren === subhub.id ? <SHubDropdownList /> : null}
            {showMenuDropdown === subhub.id ? <MenuDropdown /> : null}
            {SubMenuId === subhub.id ? <SubDropdown /> : null}
          </div>
        ))}
    </div>
  ) : null;
}
