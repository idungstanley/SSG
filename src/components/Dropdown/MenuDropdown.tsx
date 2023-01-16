import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import {
  ArchiveIcon,
  CogIcon,
  DocumentDuplicateIcon,
  EyeOffIcon,
  PencilIcon,
  ShareIcon,
  SparklesIcon,
  TrashIcon,
  StarIcon,
  PlusIcon,
  LinkIcon,
  ColorSwatchIcon,
  ArrowDownIcon,
  PencilAltIcon,
} from '@heroicons/react/outline';
import {
  setArchiveHub,
  setDelHub,
  setShowEditHubModal,
  setSubDropdownMenu,
} from '../../features/hubs/hubSlice';
import EditHubModal from '../../pages/workspace/hubs/components/EditHubModal';
import SubDropdown from './SubDropdown';
import {
  ArchiveHubService,
  UseDeleteHubService,
} from '../../features/hubs/hubService';

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
    currHubId,
    showEditHubModal,
    SubDropdownMenu,
    delHub,
    archiveHub,
    showMenuDropdown,
    showMenuDropdownType,
  } = useAppSelector((state) => state.hub);
  console.log(showMenuDropdown, showMenuDropdownType);
  //deleteHubs
  UseDeleteHubService({
    query: currHubId,
    delHub,
  });

  //archive hubs
  ArchiveHubService({
    query: currHubId,
    archiveHub,
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
        // console.log(currHubId);
        dispatch(setShowEditHubModal(true));
        // dispatch(setshowMenuDropdown(null));
      },
      icon: <PencilIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 3,
      title: 'Color & Avatar',
      handleClick: () => ({}),
      icon: (
        <ColorSwatchIcon
          className="w-5 pt-2 text-gray-700 h-7"
          aria-hidden="true"
        />
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
      icon: <EyeOffIcon className="w-4 h-4" aria-hidden="true" />,
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
      icon: <ArchiveIcon className="w-4 h-4" aria-hidden="true" />,
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
        dispatch(setArchiveHub(true));
      },
      icon: <ArchiveIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 14,
      title: 'Whiteboard',
      handleClick: () => ({}),
      icon: <PencilAltIcon className="w-4 h-4" aria-hidden="true" />,
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
        dispatch(setDelHub(true));
      },
      icon: <TrashIcon className="w-4 h-4 text-red-500" aria-hidden="true" />,
      isVisible: true,
    },
  ];
  return (
    <div className="">
      <div
        className="absolute w-56 py-1 origin-top-right bg-white rounded-md shadow-lg bottom-20 left-5 z-20 ring-1 ring-black ring-opacity-5 focus:outline-none"
        id="menusettings"
      >
        {itemsList.map((item) =>
          item.isVisible ? (
            <div key={item.id}>
              <div
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 text-left hover:bg-gray-100"
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

      {showEditHubModal && (
        <EditHubModal
          isEditVisible={showEditHubModal}
          onCloseEditHubModal={() => dispatch(setShowEditHubModal(false))}
        />
      )}
    </div>
  );
}
