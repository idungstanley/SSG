import React, { useState } from 'react';
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
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { getHub, setArchiveHub, setSubDropdownMenu } from '../../features/hubs/hubSlice';
import EditHubModal from '../../pages/workspace/hubs/components/EditHubModal';
import SubDropdown from './SubDropdown';
import { ArchiveHubService, useCreateFavorite, UseDeleteHubService } from '../../features/hubs/hubService';
import {
  setEditHubSlideOverVisibility,
  setEditListSlideOverVisibility,
  setEditWalletSlideOverVisibility
} from '../../features/general/slideOver/slideOverSlice';
import EditListModal from '../../pages/workspace/lists/components/modals/EditListModal';
import EditWalletModal from '../../pages/workspace/wallet/components/modals/EditWalletModal';
import { setArchiveWallet } from '../../features/wallet/walletSlice';
import { UseArchiveWalletService, UseDeleteWalletService } from '../../features/wallet/walletService';
import { setArchiveList } from '../../features/list/listSlice';
import { UseArchiveListService, UseDeleteListService } from '../../features/list/listService';
import { useMutation } from '@tanstack/react-query';
import { deleteListManager } from '../../managers/List';
import { setFilteredResults } from '../../features/search/searchSlice';
import {
  deleteWalletManager,
  findAllEntitiesIdsOfWallet,
  removeEntityChildrenIdsOfWallet
} from '../../managers/Wallet';
import { deleteHubManager, findAllEntitiesIdsOfHub, removeEntityChildrenIdsOfHub } from '../../managers/Hub';
import { setExtendedBarOpenedEntitiesIds, setOpenedEntitiesIds } from '../../features/workspace/workspaceSlice';
import ExpandAllIcon from '../../assets/icons/ExpandAllIcon';
import CollapseAllIcon from '../../assets/icons/CollapseAllIcon';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { Fade, Menu } from '@mui/material';

interface IMenuDropdownProps {
  isExtendedBar?: boolean;
}

interface itemsType {
  id: number;
  title: string;
  icon: JSX.Element;
  isVisible: boolean;
  handleClick: () => void;
}

export default function MenuDropdown({ isExtendedBar }: IMenuDropdownProps) {
  const dispatch = useDispatch();

  const { SubDropdownMenu, archiveHub, showMenuDropdown, showMenuDropdownType, hub } = useAppSelector(
    (state) => state.hub
  );
  const { openedEntitiesIds } = useAppSelector((state) => state.workspace);
  const { archiveWallet } = useAppSelector((state) => state.wallet);
  const { archiveList } = useAppSelector((state) => state.list);

  const [open, setOpen] = useState<boolean>(true);

  //delete-entity
  //hubs and subhubs
  const deleteHubMutation = useMutation(UseDeleteHubService, {
    onSuccess: () => {
      const updatedTree = deleteHubManager(showMenuDropdown as string, hub);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });

  //wallets and subwallets
  const deleteWalletMutation = useMutation(UseDeleteWalletService, {
    onSuccess: () => {
      const updatedTree = deleteWalletManager(showMenuDropdown as string, hub);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });

  //lists
  const deleteListMutation = useMutation(UseDeleteListService, {
    onSuccess: () => {
      const updatedTree = deleteListManager(showMenuDropdown as string, hub);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });

  //archive entities
  //hubs and subhub
  ArchiveHubService({
    query: showMenuDropdown,
    archiveHub
  });

  //wallets and subwallet
  UseArchiveWalletService({
    query: showMenuDropdown,
    archiveWallet
  });

  //list
  UseArchiveListService({
    query: showMenuDropdown,
    archiveList
  });

  // Add Entity to Favorites
  // useAddToFavourites({
  //   query: showMenuDropdown,
  //   type: showMenuDropdownType,
  //   trigger: triggerAddToFav,
  // });
  const { mutate: onCreate } = useCreateFavorite();

  const itemsList: itemsType[] = [
    {
      id: 1,
      title: 'Create new',
      handleClick: () => {
        dispatch(setSubDropdownMenu(!SubDropdownMenu));
      },
      icon: <PlusIcon className="w-5 text-gray-700 h-7" aria-hidden="true" />,
      isVisible: true
    },
    {
      id: 2,
      title: 'Rename',
      handleClick: () => {
        if (showMenuDropdownType === 'hubs' || showMenuDropdownType === EntityType.subHub) {
          dispatch(setEditHubSlideOverVisibility(true));
        } else if (showMenuDropdownType?.includes(EntityType.wallet)) {
          dispatch(setEditWalletSlideOverVisibility(true));
        } else {
          dispatch(setEditListSlideOverVisibility(true));
        }
      },
      icon: <PencilIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true
    },
    {
      id: 3,
      title: 'Color & Avatar',
      handleClick: () => ({}),
      icon: <SwatchIcon className="w-5 pt-2 text-gray-700 h-7" aria-hidden="true" />,
      isVisible: false
    },
    {
      id: 4,
      title: 'Copy link',
      handleClick: () => ({}),
      icon: <LinkIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false
    },
    {
      id: 5,
      title: 'Duplicate',
      handleClick: () => ({}),
      icon: <DocumentDuplicateIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false
    },
    {
      id: 6,
      title: 'Add to favorites',
      handleClick: () => {
        onCreate({
          query: showMenuDropdown,
          type: showMenuDropdownType
        });
        // dispatch(setTriggerAddToFav(true));
      },
      icon: <StarIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true
    },
    {
      id: 7,
      title: 'Hide in sidebar',
      handleClick: () => ({}),
      icon: <EyeSlashIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true
    },
    {
      id: 8,
      title: 'Templates',
      handleClick: () => ({}),
      icon: <SparklesIcon className="w-4 h-6 text-gray-700" aria-hidden="true" />,
      isVisible: true
    },
    {
      id: 9,
      title: 'More settings',
      handleClick: () => ({}),
      icon: <CogIcon className="w-5 h-6 pt-2 text-gray-700" aria-hidden="true" />,
      isVisible: false
    },
    {
      id: 10,
      title: 'Sharing & Permission',
      handleClick: () => ({}),
      icon: <ShareIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false
    },
    {
      id: 11,
      title: 'Archive',
      handleClick: () => ({}),
      icon: <ArchiveBoxIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false
    },
    {
      id: 12,
      title: 'Import',
      handleClick: () => ({}),
      icon: <ArrowDownIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false
    },
    {
      id: 13,
      title: 'Archive',
      handleClick: () => {
        if (showMenuDropdownType == 'hubs' || showMenuDropdownType == 'subhubs') {
          dispatch(setArchiveHub(true));
        } else if (showMenuDropdownType?.includes(EntityType.wallet)) {
          dispatch(setArchiveWallet(true));
        } else {
          dispatch(setArchiveList(true));
        }
      },
      icon: <ArchiveBoxIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true
    },
    {
      id: 14,
      title: 'Whiteboard',
      handleClick: () => ({}),
      icon: <PencilSquareIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false
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
      isVisible: false
    },
    {
      id: 16,
      title: 'Expand all',
      handleClick: () => {
        if (showMenuDropdown) {
          let allOpenedEntitiesIds: string[] = [];
          if (showMenuDropdownType?.includes(EntityType.hub)) {
            allOpenedEntitiesIds = findAllEntitiesIdsOfHub(showMenuDropdown, hub, openedEntitiesIds);
          } else if (showMenuDropdownType?.includes(EntityType.wallet)) {
            allOpenedEntitiesIds = findAllEntitiesIdsOfWallet(showMenuDropdown, hub, openedEntitiesIds);
          }
          if (isExtendedBar) {
            dispatch(setExtendedBarOpenedEntitiesIds([...new Set(allOpenedEntitiesIds)]));
          } else {
            dispatch(setOpenedEntitiesIds([...new Set(allOpenedEntitiesIds)]));
          }
        }
      },
      icon: <ExpandAllIcon aria-hidden="true" />,
      isVisible: true
    },
    {
      id: 17,
      title: 'Collapse all',
      handleClick: () => {
        if (showMenuDropdown) {
          let filteredOpenedIds: string[] = [];
          if (showMenuDropdownType?.includes(EntityType.hub)) {
            filteredOpenedIds = removeEntityChildrenIdsOfHub(showMenuDropdown, hub, openedEntitiesIds);
          } else if (showMenuDropdownType?.includes(EntityType.wallet)) {
            filteredOpenedIds = removeEntityChildrenIdsOfWallet(showMenuDropdown, hub, openedEntitiesIds);
          }
          if (isExtendedBar) {
            dispatch(setExtendedBarOpenedEntitiesIds([...new Set(filteredOpenedIds)]));
          } else {
            dispatch(setOpenedEntitiesIds([...new Set(filteredOpenedIds)]));
          }
        }
      },
      icon: <CollapseAllIcon aria-hidden="true" />,
      isVisible: true
    },
    {
      id: 18,
      title: 'Delete',
      handleClick: () => {
        if (showMenuDropdownType === 'hubs' || showMenuDropdownType === EntityType.subHub) {
          deleteHubMutation.mutateAsync({
            id: showMenuDropdown
          });
        } else if (showMenuDropdownType?.includes(EntityType.wallet)) {
          deleteWalletMutation.mutateAsync({
            id: showMenuDropdown
          });
        } else {
          deleteListMutation.mutateAsync({
            id: showMenuDropdown
          });
        }
      },
      icon: <TrashIcon className="w-4 h-4 text-red-500" aria-hidden="true" />,
      isVisible: true
    }
  ];

  return (
    <Menu
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 300
      }}
    >
      <div className="w-auto px-2" style={{ minWidth: '200px' }}>
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
      {SubDropdownMenu && <SubDropdown />}
      <EditHubModal />
      <EditListModal />
      <EditWalletModal />
    </Menu>
  );
}
