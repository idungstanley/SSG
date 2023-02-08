import React, { useState } from 'react';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { Spinner } from '../../common';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import {
  resetCurrentItem,
  setActiveItem,
  setCurrentItem,
  setShowHub,
  setShowPilot,
} from '../../features/workspace/workspaceSlice';
import DropdownList from './components/DropdownList';
import MenuDropdown from '../Dropdown/MenuDropdown';
import FullScreenMessage from '../CenterMessage/FullScreenMessage';
import { useAppSelector } from '../../app/hooks';
import { IInbox } from '../../features/inbox/inbox.interfaces';
import { IHub } from '../../features/hubs/hubs.interfaces';
import {
  closeMenu,
  getCurrHubId,
  getPrevName,
  getSubMenu,
  setshowMenuDropdown,
} from '../../features/hubs/hubSlice';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';
import SubDropdown from '../Dropdown/SubDropdown';
import { useNavigate } from 'react-router-dom';

interface ItemsListInSidebarProps {
  status: string;
  type: string;
  items?: IInbox[] | IHub[];
}

export default function ItemsListInSidebar({
  items,
  status,
  type,
}: ItemsListInSidebarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isHovering, setIsHovering] = useState<number>(-1);
  const { currentItemId, activeItemId } = useAppSelector(
    (state) => state.workspace
  );

  const { showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);
  const handleMouseOver = (i: number) => {
    setIsHovering(i);
  };
  const handleMouseOut = () => {
    setIsHovering(-1);
  };

  if (status === 'error') {
    return (
      <FullScreenMessage
        title="Oops, an error occurred :("
        description="Please try again later."
        showOneThirdMessage
      />
    );
  }

  if (status === 'loading') {
    return (
      <div className="flex justify-center mx-auto mt-10">
        <Spinner size={8} color="#0F70B7" />
      </div>
    );
  }

  const handleLocation = (id: string, name: string) => {
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: 'hub',
        activeItemName: name,
      })
    );
    dispatch(setShowPilot(true));
    navigate(`/workspace/hub/${id}`);
  };

  const handleClick = (id: string) => {
    const isMatch = id === currentItemId;
    if (isMatch) {
      dispatch(setShowHub(false));
      if (!currentItemId) {
        dispatch(
          setCurrentItem({
            currentItemId: id,
            currentItemType: type,
          })
        );
      } else {
        dispatch(resetCurrentItem());
      }
    } else {
      dispatch(setShowHub(true));
      dispatch(
        setCurrentItem({
          currentItemId: id,
          currentItemType: type,
        })
      );
    }
  };

  const handleHubSettings = (id: string, name: string) => {
    dispatch(getCurrHubId(id));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'hubs',
      })
    );
    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if (id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  const handleItemAction = (id: string) => {
    dispatch(
      getSubMenu({
        SubMenuId: id,
        SubMenuType: 'hubs',
      })
    );
  };

  return status === 'success' ? (
    <ul className="z-20 w-full">
      {items?.map((i: { id: string; name: string }, index) => (
        <li
          key={i.id}
          className={`flex relative flex-col ${i.id === currentItemId}`}
          onMouseEnter={() => handleMouseOver(index)}
          onMouseLeave={handleMouseOut}
        >
          <div
            className={`flex justify-between items-center hover:bg-gray-100 ${
              i.id === activeItemId
                ? 'bg-green-100 text-green-500'
                : 'text-black'
            }`}
            tabIndex={0}
            onClick={() => handleClick(i.id)}
          >
            <div
              className={`flex relative justify-between items-center hover:bg-gray-100 ${
                i.id === activeItemId ? 'text-green-500' : 'text-black-500'
              }`}
            >
              {i.id === activeItemId && (
                <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg" />
              )}
              <div
                role="button"
                className="flex items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
              >
                <div className="mr-0.5">
                  {i.id === currentItemId ? (
                    <span className="flex flex-col">
                      <VscTriangleDown
                        className="flex-shrink-0 h-3"
                        aria-hidden="true"
                        color="rgba(72, 67, 67, 0.64)"
                      />
                    </span>
                  ) : (
                    <VscTriangleRight
                      className="flex-shrink-0 h-3"
                      aria-hidden="true"
                      color="rgba(72, 67, 67, 0.64)"
                    />
                  )}
                </div>
                <div className="flex items-center flex-1 min-w-0">
                  <AvatarWithInitials
                    initials={i.name
                      .split(' ')
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join('')
                      .toUpperCase()}
                    height="h-4"
                    width="w-4"
                    backgroundColour="blue"
                    roundedStyle="rounded"
                  />
                  <span className="ml-4 overflow-hidden">
                    <a
                      className="font-medium tracking-wider capitalize truncate cursor-pointer"
                      style={{ fontSize: '12px' }}
                      onClick={() => handleLocation(i.id, i.name)}
                    >
                      {i.name}
                    </a>
                  </span>
                </div>
              </div>
            </div>
            {isHovering === index && (
              <div className="flex items-center pr-1 space-x-1">
                <AiOutlineEllipsis
                  onClick={() => handleHubSettings(i.id, i.name)}
                  className="text-black cursor-pointer"
                  id="menusettings"
                />
                <AiOutlinePlus
                  onClick={() => handleItemAction(i.id)}
                  className="text-black cursor-pointer"
                />
              </div>
            )}
          </div>
          {currentItemId === i.id ? <DropdownList /> : null}
          {showMenuDropdown === i.id ? <MenuDropdown /> : null}
          {SubMenuId === i.id ? <SubDropdown /> : null}
        </li>
      ))}
    </ul>
  ) : null;
}
