import React, { useState } from 'react';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import PlusDropDown from '../pages/workspace/hubs/components/PlusDropDown';
import FullScreenMessage from '../components/CenterMessage/FullScreenMessage';
import { useAppSelector } from '../app/hooks';
import { IHub } from '../features/hubs/hubs.interfaces';
import { IInbox } from '../features/inbox/inbox.interfaces';
import DropdownList from '../components/ItemsListInSidebar/components/DropdownList';
import { resetCurrentItem, setCurrentItem, setShowHub } from '../features/workspace/workspaceSlice';
import { AvatarWithInitials } from '../components';
import MenuDropdown from '../components/Dropdown/DropdownForWorkspace';
import { Spinner } from '../common';
import { useGetHubList } from '../features/hubs/hubService';
import { getHub } from '../features/hubs/hubSlice';

interface ItemsListInSidebarProps {
  status: string;
  type: string;
  items?: IInbox[] | IHub[];
}

export default function ActiveHub() {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState<number>(-1);
  const { currentItemId, showHub } = useAppSelector((state) => state.workspace);
  const { data, status } = useGetHubList();
  const items = data?.data.hubs;
  if (status === 'success') {
    dispatch(getHub(data?.data.hubs));
  }
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
      dispatch(setShowHub(false));
      if (!currentItemId) {
        dispatch(
          setCurrentItem({
            currentItemId: id,
            currentItemType: 'hub',
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
          currentItemType: 'hub',
        })
      );
    }
  };

  return status === 'success' ? (
    <ul className="w-full ml-1">
      {items?.map(
        (i: { id: string; name: string }, index) =>
          i.id === currentItemId && (
            <li key={i.id} className="flex flex-col">
              <div
                className={`flex justify-between items-center hover:bg-gray-100 relative ${
                  i.id === currentItemId
                    ? 'bg-green-50 text-green-500'
                    : 'text-black-500'
                }`}
                onMouseEnter={() => handleMouseOver(index)}
                onMouseLeave={handleMouseOut}
              >
                {i.id === currentItemId && (
                  <span className="absolute top-0 bottom-0 left-0 w-0.5 bg-green-500" />
                )}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleClick(i.id)}
                  className="flex items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
                >
                  <div className="flex min-w-0 ml-2 flex-1 items-center">
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
                <div
                  className={`flex items-center space-x-1 justify-end pr-1 ${
                    isHovering === index ? 'block' : 'hidden'
                  }`}
                >
                  <MenuDropdown />
                  <PlusDropDown walletId={i.id} />
                </div>
              </div>

              {currentItemId === i.id ? <DropdownList /> : null}
            </li>
          )
      )}
    </ul>
  ) : null;
}
