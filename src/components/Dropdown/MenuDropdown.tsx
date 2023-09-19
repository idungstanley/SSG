import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import {
  ArchiveBoxIcon,
  CogIcon,
  DocumentDuplicateIcon,
  EyeSlashIcon,
  PencilIcon,
  SparklesIcon,
  TrashIcon,
  StarIcon,
  PlusIcon,
  LinkIcon,
  SwatchIcon,
  ArrowDownIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { getHub, setArchiveHub, setSubDropdownMenu, setshowMenuDropdown } from '../../features/hubs/hubSlice';
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
import { Cords } from '../../hooks/useAbsolute';
import Button from '../Button';
import { ShareIcon } from '../../assets/icons';
import ArrowRight from '../../assets/icons/ArrowRight';
import { VerticalScroll } from '../ScrollableContainer/VerticalScroll';
import { Capitalize } from '../../utils/NoCapWords/Capitalize';

interface IMenuDropdownProps {
  isExtendedBar?: boolean;
  cords?: Cords;
}

interface itemsType {
  title: string;
  icon: JSX.Element;
  isVisible: boolean;
  rightIcon?: JSX.Element;
  handleClick: () => void;
}

interface ItemsProps {
  items: itemsType[];
}
interface InlineBorderProps {
  label: string;
  topElement?: JSX.Element;
}

export default function MenuDropdown({ isExtendedBar, cords }: IMenuDropdownProps) {
  const dispatch = useDispatch();

  const { SubDropdownMenu, archiveHub, showMenuDropdown, showMenuDropdownType, hub } = useAppSelector(
    (state) => state.hub
  );
  const { openedEntitiesIds, sidebarWidthRD } = useAppSelector((state) => state.workspace);
  const { archiveWallet } = useAppSelector((state) => state.wallet);
  const { archiveList } = useAppSelector((state) => state.list);
  const { showSidebar, userSettingsData } = useAppSelector((state) => state.account);

  const [open, setOpen] = useState<boolean>(true);

  const closeMenu = () => {
    setOpen(false);
    dispatch(setSubDropdownMenu(false));
    dispatch(setshowMenuDropdown({ showMenuDropdown: null, showMenuDropdownType: null }));
  };

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
      title: 'Create new',
      handleClick: () => {
        dispatch(setSubDropdownMenu(!SubDropdownMenu));
      },
      icon: <PlusIcon className="w-5 h-5 text-gray-700" aria-hidden="true" />,
      rightIcon: <ArrowRight />,
      isVisible: true
    },
    {
      title: 'Rename',
      handleClick: () => {
        if (showMenuDropdownType?.includes(EntityType.hub)) {
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
      title: 'Color & Avatar',
      handleClick: () => ({}),
      icon: <SwatchIcon className="w-5 h-5 text-gray-700" aria-hidden="true" />,
      isVisible: false
    },
    {
      title: 'Copy link',
      handleClick: () => ({}),
      icon: <LinkIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false
    },
    {
      title: 'Duplicate',
      handleClick: () => ({}),
      icon: <DocumentDuplicateIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false
    },
    {
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
      title: 'Hide in sidebar',
      handleClick: () => ({}),
      icon: <EyeSlashIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true
    },
    {
      title: 'Archive',
      handleClick: () => ({}),
      icon: <ArchiveBoxIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false
    },
    {
      title: 'Import',
      handleClick: () => ({}),
      icon: <ArrowDownIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false
    },
    {
      title: 'Whiteboard',
      handleClick: () => ({}),
      icon: <PencilSquareIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false
    },
    {
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
    }
  ];

  const advanceOption = [
    {
      title: 'Templates',
      handleClick: () => ({}),
      icon: <SparklesIcon className="w-4 h-6 text-gray-700" aria-hidden="true" />,
      isVisible: true,
      rightIcon: <ArrowRight />
    },
    {
      title: `${Capitalize(showMenuDropdownType as string)} settings`,
      handleClick: () => ({}),
      icon: <CogIcon className="w-5 h-6 text-gray-700" aria-hidden="true" />,
      isVisible: true,
      rightIcon: <ArrowRight />
    }
  ];

  const moreOptions = [
    {
      title: 'Delete',
      handleClick: () => {
        if (showMenuDropdownType?.includes(EntityType.hub)) {
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
    },
    {
      title: 'Archive',
      handleClick: () => {
        if (showMenuDropdownType?.includes(EntityType.hub)) {
          dispatch(setArchiveHub(true));
        } else if (showMenuDropdownType?.includes(EntityType.wallet)) {
          dispatch(setArchiveWallet(true));
        } else {
          dispatch(setArchiveList(true));
        }
      },
      icon: <ArchiveBoxIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true
    }
  ];

  return (
    <Menu
      open={open}
      onClose={closeMenu}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: Number(cords?.top) - 150 || 'center',
        horizontal: showSidebar ? Number(userSettingsData?.sidebarWidth) - 100 : sidebarWidthRD
      }}
    >
      <VerticalScroll>
        <div className="relative h-96">
          <InlineBorderLabel
            label="DEFAULT SETTINGS"
            topElement={
              <div className="flex items-center justify-center gap-2 mb-2">
                {showMenuDropdownType?.toUpperCase()} PROPERTIES
              </div>
            }
          />
          <GroupMenuOptions items={itemsList} />
          <InlineBorderLabel label="ADVANCE SETTINGS" />
          <GroupMenuOptions items={advanceOption} />
          <InlineBorderLabel label="MORE SETTINGS" />
          <GroupMenuOptions items={moreOptions} />
          <div className="sticky bottom-0 p-2 bg-white border-t">
            <Button
              label="Sharing & Permissions"
              icon={<ShareIcon active={false} color="white" />}
              buttonStyle="base"
              height="h-9"
            />
          </div>
        </div>
        {SubDropdownMenu && <SubDropdown />}
        <EditHubModal />
        <EditListModal />
        <EditWalletModal />
      </VerticalScroll>
    </Menu>
  );
}

function GroupMenuOptions({ items }: ItemsProps) {
  return (
    <div className="w-auto gap-2 px-2 mb-1" style={{ minWidth: '200px' }}>
      {items.map((item, index) =>
        item.isVisible ? (
          <div key={index}>
            <div
              className="flex items-center justify-between p-1 py-2 space-x-2 text-sm text-left text-gray-600 rounded-md cursor-pointer hover:bg-alsoit-gray-75"
              onClick={item.handleClick}
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center w-5 h-5">{item.icon}</span>
                <p>{item.title}</p>
              </div>
              {item.rightIcon && <span>{item.rightIcon}</span>}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

export function InlineBorderLabel({ label, topElement }: InlineBorderProps) {
  return (
    <div className="relative items-center">
      {topElement}
      <div className="flex items-center py-1">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-1 text-gray-400">{label}</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
    </div>
  );
}
