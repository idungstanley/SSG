import React, { useState } from 'react';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { Spinner } from '../../common';
import AvatarWithInitials from '../avatar/AvatarWithInitials';
import {
  resetCurrentItem,
  setCurrentItem,
} from '../../features/workspace/workspaceSlice';
import DropdownList from './components/DropdownList';
import MenuDropdown from '../Dropdown/DropdownForWorkspace';
import FullScreenMessage from '../CenterMessage/FullScreenMessage';
import { useAppSelector } from '../../app/hooks';
import { IInbox } from '../../features/inbox/inbox.interfaces';
import { IHub } from '../../features/hubs/hubs.interfaces';

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
  const { currentItemId } = useAppSelector((state) => state.workspace);
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
      <div className="mx-auto w-6 mt-10 justify-center">
        <Spinner size={8} color="#0F70B7" />
      </div>
    );
  }

  const handleClick = (id: string) => {
    const isMatch = id === currentItemId;

    if (isMatch) {
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
      dispatch(
        setCurrentItem({
          currentItemId: id,
          currentItemType: type,
        })
      );
    }
  };

  return status === 'success' ? (
    <ul className="w-full">
      {items?.map((i: { id: string; name: string }, index) => (
        <li key={i.id} className="flex flex-col">
          <div
            className="flex justify-between items-center hover:bg-gray-100"
            onMouseEnter={() => handleMouseOver(index)}
            onMouseLeave={handleMouseOut}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleClick(i.id)}
              className="flex items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
            >
              <div className="mr-0.5">
                {i.id === currentItemId ? (
                  <VscTriangleDown
                    className="flex-shrink-0 h-3"
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
                <span className="ml-2 overflow-hidden">
                  <h4
                    className="font-medium tracking-wider capitalize truncate"
                    style={{ fontSize: '10px' }}
                  >
                    {i.name}
                  </h4>
                </span>
              </div>
            </div>
            <div
              className={`flex items-center justify-end space-x-1 ${
                isHovering === index ? 'block' : 'hidden'
              }`}
            >
              <MenuDropdown />
            </div>
          </div>

          {currentItemId === i.id ? <DropdownList /> : null}
        </li>
      ))}
    </ul>
  ) : null;
}
