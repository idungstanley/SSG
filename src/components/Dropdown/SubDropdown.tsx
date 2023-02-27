import React, { useEffect, useRef } from 'react';
import {
  DocumentDuplicateIcon,
  StarIcon,
  PlusIcon,
  LinkIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { FaFolder } from 'react-icons/fa';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import hubIcon from '../../assets/branding/hub.svg';
import {
  setCreateListSlideOverVisibility,
  setCreateSubHubSlideOverVisibility,
  setCreateSubWalletSlideOverVisibility,
  setCreateTaskSlideOverVisibility,
  setCreateWalletSlideOverVisibility,
} from '../../features/general/slideOver/slideOverSlice';
import { getSubMenu, setSubDropdownMenu } from '../../features/hubs/hubSlice';

interface itemsType {
  id: number;
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
  isVisible: boolean;
}

export default function SubDropdown() {
  const dispatch = useDispatch();
  const { showMenuDropdownType, SubMenuType, SubMenuId } = useAppSelector(
    (state) => state.hub
  );
  const {
    showCreateSubWalletSlideOver,
    showEditHubSlideOver,
    showEditListSlideOver,
    showEditWalletSlideOver,
    showCreateHubSlideOver,
    showCreateSubHubSlideOver,
    showCreateWalletSlideOver,
    showCreateTaskSlideOver,
  } = useAppSelector((state) => state.slideOver);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const checkClickedOutSide = (e: MouseEvent): void => {
      if (
        SubMenuId != null &&
        ref.current &&
        !ref.current.contains(e.target as HTMLButtonElement)
      ) {
        if (
          showCreateSubWalletSlideOver === false &&
          showCreateHubSlideOver === false &&
          showCreateSubHubSlideOver === false &&
          showCreateWalletSlideOver === false &&
          showCreateTaskSlideOver === false &&
          showEditHubSlideOver === false &&
          showEditListSlideOver === false &&
          showEditWalletSlideOver === false
        ) {
          dispatch(setSubDropdownMenu(false));
          dispatch(
            getSubMenu({
              SubMenuId: null,
              SubMenuType: null,
            })
          );
        }
      }
    };
    document.addEventListener('click', checkClickedOutSide);
    return () => {
      document.removeEventListener('click', checkClickedOutSide);
    };
  }, [
    SubMenuId,
    showCreateSubWalletSlideOver,
    showCreateHubSlideOver,
    showCreateSubHubSlideOver,
    showCreateWalletSlideOver,
    showCreateTaskSlideOver,
    showEditHubSlideOver,
    showEditListSlideOver,
    showEditWalletSlideOver,
  ]);
  const itemsList: itemsType[] = [
    {
      id: 1,
      title: 'Sub Hub',
      handleClick: () => {
        dispatch(setCreateSubHubSlideOverVisibility(true));
      },
      icon: <img src={hubIcon} alt="" className="w-4 h-4" />,
      isVisible:
        showMenuDropdownType == 'hubs'
          ? true
          : false || SubMenuType == 'hubs'
          ? true
          : false,
    },
    {
      id: 2,
      title:
        (showMenuDropdownType === 'wallet' ? 'Sub Wallet' : 'Wallet') ||
        (SubMenuType === 'wallet' ? 'Sub Wallet' : '') ||
        (showMenuDropdownType === 'subwallet' ? 'Sub Wallet' : 'Wallet'),
      handleClick: () => {
        if (SubMenuType !== 'wallet' && showMenuDropdownType !== 'wallet') {
          dispatch(setCreateWalletSlideOverVisibility(true));
        } else {
          dispatch(setCreateSubWalletSlideOverVisibility(true));
        }
      },
      icon: <FaFolder className="w-4 h-4" aria-hidden="true" />,
      isVisible:
        showMenuDropdownType == 'list' || showMenuDropdownType == 'subwallet3'
          ? false
          : true,
    },
    {
      id: 3,
      title: 'Task',
      handleClick: () => {
        dispatch(setCreateTaskSlideOverVisibility(true));
      },
      icon: (
        <PlusIcon className="w-5 pt-2 text-gray-700 h-7" aria-hidden="true" />
      ),
      isVisible: showMenuDropdownType == 'list' ? true : false,
    },
    {
      id: 4,
      title: 'List',
      handleClick: () => {
        dispatch(setCreateListSlideOverVisibility(true));
      },
      icon: <AiOutlineUnorderedList className="w-4 h-4" aria-hidden="true" />,
      isVisible: showMenuDropdownType === 'list' ? false : true,
    },
    {
      id: 5,
      title: 'Sprint',
      handleClick: () => ({}),
      icon: (
        <SwatchIcon className="w-5 pt-2 text-gray-700 h-7" aria-hidden="true" />
      ),
      isVisible: true,
    },
    {
      id: 6,
      title: 'Folder',
      handleClick: () => ({}),
      icon: <LinkIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false,
    },
    {
      id: 7,
      title: 'From Template',
      handleClick: () => ({}),
      icon: <DocumentDuplicateIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 8,
      title: 'Import',
      handleClick: () => ({}),
      icon: <StarIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
  ];
  return (
    <div className="" ref={ref}>
      <div
        className="fixed z-50 w-56 p-2 origin-top-right bg-white rounded-md top-2/4 left-56 ring-1 ring-black ring-opacity-5 focus:outline-none"
        style={{ boxShadow: '0 1px 10px #00000040', minWidth: '200px' }}
      >
        {itemsList.map((item) =>
          item.isVisible ? (
            <div key={item.id}>
              <div
                className="flex items-center p-2 space-x-2 text-sm text-left text-gray-600 rounded-md cursor-pointer hover:bg-gray-200"
                onClick={item.handleClick}
              >
                {item.icon}
                <p>{item.title}</p>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
