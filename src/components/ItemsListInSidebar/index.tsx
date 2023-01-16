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
} from '../../features/workspace/workspaceSlice';
import DropdownList from './components/DropdownList';
import MenuDropdown from '../Dropdown/MenuDropdown';
import FullScreenMessage from '../CenterMessage/FullScreenMessage';
import { useAppSelector } from '../../app/hooks';
import { IInbox } from '../../features/inbox/inbox.interfaces';
import { IHub } from '../../features/hubs/hubs.interfaces';
import {
  getCurrHubId,
  setshowMenuDropdown,
} from '../../features/hubs/hubSlice';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';

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
  const [isHovering, setIsHovering] = useState<number>(-1);
  const { currentItemId, activeItemId } = useAppSelector((state) => state.workspace);

  const { showMenuDropdown, currHubId } = useAppSelector((state) => state.hub);
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

  const handleClick = (id: string) => {
    const isMatch = id === currentItemId;
    dispatch(setActiveItem({ activeItemId: id, activeItemType: 'hub' }));
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

  const handleHubSettings = (id) => {
    dispatch(getCurrHubId(id));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'hubs',
      })
    );
  };

  return status === 'success' ? (
    <ul className="w-full">
      {items?.map((i: { id: string; name: string }, index) => (
        <li key={i.id} className={`flex flex-col ${i.id === currentItemId}`}>
          <div
            className={`flex justify-between items-center hover:bg-gray-100 ${
              i.id === currentItemId
                ? 'bg-green-50 text-green-500'
                : 'text-black-500'
            }`}
            // onMouseEnter={() => handleMouseOver(index)}
            // onMouseLeave={handleMouseOut}
          >
            {i.id === currentItemId && (
              <span className="absolute top-0 bottom-0 left-0 w-0.5 bg-green-500" />
            )}
            <div
              className={`flex relative justify-between items-center hover:bg-gray-100 ${
                i.id === activeItemId
                  ? 'bg-green-50 text-green-500'
                  : 'text-black-500'
              }`}
              // onMouseEnter={() => handleMouseOver(index)}
              // onMouseLeave={handleMouseOut}
            >
              {i.id === activeItemId && (
                <span className="absolute top-0 bottom-0 left-0 w-1 rounded-r-lg bg-green-500" />
              )}
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleClick(i.id)}
                className="flex items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
              >
                <div className="mr-0.5">
                  {i.id === currentItemId ? (
                    <span className="flex flex-col">
                      <VscTriangleDown
                        className="flex-shrink-0 h-3 ml-1"
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
                <div className="flex min-w-0 flex-1 items-center">
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
                    <h4
                      className="font-medium tracking-wider capitalize truncate"
                      style={{ fontSize: '10px' }}
                    >
                      {i.name}
                    </h4>
                  </span>
                </div>
              </div>
              {
                <div className="relative flex items-center space-x-1 pr-1"
                style={{marginRight: "30px"}}
                >
                  <MenuDropdown />
                  {/* <PlusDropDown walletId={i.id} /> */}
                </div>
              }
            </div>
            {
              <div className="flex items-center space-x-1 pr-1">
                <AiOutlineEllipsis onClick={() => handleHubSettings(i.id)} />
                <AiOutlinePlus />
              </div>
            }
          </div>
          {currentItemId === i.id ? <DropdownList /> : null}
          {showMenuDropdown === i.id ? <MenuDropdown /> : null}
        </li>
      ))}
    </ul>
  ) : null;
}
