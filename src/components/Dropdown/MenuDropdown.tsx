import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import {
  ArchiveBoxIcon,
  CogIcon,
  DocumentDuplicateIcon,
  EyeSlashIcon,
  PencilIcon,
  ShareIcon,
  SparklesIcon,
  TrashIcon,
  StarIcon,
  PlusIcon,
  LinkIcon,
  SwatchIcon,
  ArrowDownIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import {
  setArchiveHub,
  setDelHub,
  setGlobalRef,
  setshowMenuDropdown,
  setSubDropdownMenu,
} from '../../features/hubs/hubSlice';
import EditHubModal from '../../pages/workspace/hubs/components/EditHubModal';
import SubDropdown from './SubDropdown';
import {
  ArchiveHubService,
  UseDeleteHubService,
} from '../../features/hubs/hubService';
import {
  setEditHubSlideOverVisibility,
  setEditListSlideOverVisibility,
  setEditWalletSlideOverVisibility,
} from '../../features/general/slideOver/slideOverSlice';
import EditListModal from '../../pages/workspace/lists/components/modals/EditListModal';
import EditWalletModal from '../../pages/workspace/wallet/components/modals/EditWalletModal';
import {
  setArchiveWallet,
  setDeleteWallet,
} from '../../features/wallet/walletSlice';
import {
  UseArchiveWalletService,
  UseDeleteWalletService,
} from '../../features/wallet/walletService';
import { setArchiveList, setDeleteList } from '../../features/list/listSlice';
import {
  UseArchiveListService,
  UseDeleteListService,
} from '../../features/list/listService';

interface itemsType {
  id: number;
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
  isVisible: boolean;
}

export default function MenuDropdown() {
  const dispatch = useDispatch();
  const {
    SubDropdownMenu,
    delHub,
    archiveHub,
    showMenuDropdown,
    showMenuDropdownType,
  } = useAppSelector((state) => state.hub);
  const {
    showCreateSubWalletSlideOver,
    showCreateHubSlideOver,
    showCreateSubHubSlideOver,
    showCreateWalletSlideOver,
  } = useAppSelector((state) => state.slideOver);
  const { delWallet, archiveWallet } = useAppSelector((state) => state.wallet);
  const { delList, archiveList } = useAppSelector((state) => state.list);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    dispatch(setGlobalRef(ref.current));
    const checkClickedOutSide = (e) => {
      if (
        showMenuDropdown != null &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        if (
          showCreateSubWalletSlideOver === false &&
          showCreateHubSlideOver === false &&
          showCreateSubHubSlideOver === false &&
          showCreateWalletSlideOver === false
        ) {
          if (SubDropdownMenu === true) {
            dispatch(setSubDropdownMenu(false));
          } else {
            dispatch(
              setshowMenuDropdown({
                showMenuDropdown: null,
              })
            );
          }
        }
      }
    };
    document.addEventListener('click', checkClickedOutSide);
    return () => {
      document.removeEventListener('click', checkClickedOutSide);
    };
  }, [
    SubDropdownMenu,
    showCreateSubWalletSlideOver,
    showCreateHubSlideOver,
    showCreateSubHubSlideOver,
    showCreateWalletSlideOver,
  ]);

  //delete-entity
  //hubs and subhubs
  UseDeleteHubService({
    query: showMenuDropdown,
    delHub,
  });

  //wallets and subwallets
  UseDeleteWalletService({
    query: showMenuDropdown,
    delWallet,
  });

  //lists
  UseDeleteListService({
    query: showMenuDropdown,
    delList,
  });

  //archive entities
  //hubs and subhub
  ArchiveHubService({
    query: showMenuDropdown,
    archiveHub,
  });

  //wallets and subwallet
  UseArchiveWalletService({
    query: showMenuDropdown,
    archiveWallet,
  });

  //list
  UseArchiveListService({
    query: showMenuDropdown,
    archiveList,
  });

  const itemsList: itemsType[] = [
    {
      id: 1,
      title: 'Create new',
      handleClick: () => {
        dispatch(setSubDropdownMenu(!SubDropdownMenu));
      },
      icon: (
        <PlusIcon className="w-5 pt-2 text-gray-700 h-7" aria-hidden="true" />
      ),
      isVisible: true,
    },
    {
      id: 2,
      title: 'Rename',
      handleClick: () => {
        if (
          showMenuDropdownType == 'hubs' ||
          showMenuDropdownType == 'subhub'
        ) {
          dispatch(setEditHubSlideOverVisibility(true));
        } else if (
          showMenuDropdownType == 'wallet' ||
          showMenuDropdownType == 'subwallet'
        ) {
          dispatch(setEditWalletSlideOverVisibility(true));
        } else {
          dispatch(setEditListSlideOverVisibility(true));
        }
      },
      icon: <PencilIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 3,
      title: 'Color & Avatar',
      handleClick: () => ({}),
      icon: (
        <SwatchIcon className="w-5 pt-2 text-gray-700 h-7" aria-hidden="true" />
      ),
      isVisible: false,
    },
    {
      id: 4,
      title: 'Copy link',
      handleClick: () => ({}),
      icon: <LinkIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false,
    },
    {
      id: 5,
      title: 'Duplicate',
      handleClick: () => ({}),
      icon: <DocumentDuplicateIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false,
    },
    {
      id: 6,
      title: 'Add to favorites',
      handleClick: () => ({}),
      icon: <StarIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 7,
      title: 'Hide in sidebar',
      handleClick: () => ({}),
      icon: <EyeSlashIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 8,
      title: 'Templates',
      handleClick: () => ({}),
      icon: (
        <SparklesIcon
          className="w-5 h-6 pt-2 text-gray-700"
          aria-hidden="true"
        />
      ),
      isVisible: true,
    },
    {
      id: 9,
      title: 'More settings',
      handleClick: () => ({}),
      icon: (
        <CogIcon className="w-5 h-6 pt-2 text-gray-700" aria-hidden="true" />
      ),
      isVisible: false,
    },
    {
      id: 10,
      title: 'Sharing & Permission',
      handleClick: () => ({}),
      icon: <ShareIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false,
    },
    {
      id: 11,
      title: 'Archive',
      handleClick: () => ({}),
      icon: <ArchiveBoxIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false,
    },
    {
      id: 12,
      title: 'Import',
      handleClick: () => ({}),
      icon: <ArrowDownIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false,
    },
    {
      id: 13,
      title: 'Archive',
      handleClick: () => {
        if (
          showMenuDropdownType == 'hubs' ||
          showMenuDropdownType == 'subhubs'
        ) {
          dispatch(setArchiveHub(true));
        } else if (
          showMenuDropdownType == 'wallet' ||
          showMenuDropdownType == 'subwallet'
        ) {
          dispatch(setArchiveWallet(true));
        } else {
          dispatch(setArchiveList(true));
        }
      },
      icon: <ArchiveBoxIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 14,
      title: 'Whiteboard',
      handleClick: () => ({}),
      icon: <PencilSquareIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false,
    },
    {
      id: 15,
      title: 'Wallet',
      handleClick: () => ({}),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
          />
        </svg>
      ),
      isVisible: false,
    },
    {
      id: 16,
      title: 'Delete',
      handleClick: () => {
        if (
          showMenuDropdownType == 'hubs' ||
          showMenuDropdownType == 'subhub'
        ) {
          dispatch(setDelHub(true));
        } else if (
          showMenuDropdownType == 'wallet' ||
          showMenuDropdownType == 'subwallet'
        ) {
          dispatch(setDeleteWallet(true));
        } else {
          dispatch(setDeleteList(true));
        }
      },
      icon: <TrashIcon className="w-4 h-4 text-red-500" aria-hidden="true" />,
      isVisible: true,
    },
  ];

  return (
    <div className="" ref={ref}>
      <div className="absolute z-50 w-56 py-1 origin-top-right bg-white rounded-md shadow-lg bottom-20 left-5 ring-1 ring-black ring-opacity-5 focus:outline-none">
        {itemsList.map((item) =>
          item.isVisible ? (
            <div key={item.id}>
              <div
                className="flex items-center px-4 py-2 space-x-2 text-sm text-left text-gray-600 hover:bg-gray-100"
                onClick={item.handleClick}
              >
                {item.icon}
                <p>{item.title}</p>
              </div>
            </div>
          ) : null
        )}
      </div>
      {SubDropdownMenu && <SubDropdown />}
      <EditHubModal />
      <EditListModal />
      <EditWalletModal />
    </div>
  );
}
