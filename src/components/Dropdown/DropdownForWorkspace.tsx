import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
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
import SubDd from './SubDropdown';
import { classNames } from '../../utils';
import { VscEllipsis } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
// import { setShowMenuDropDown } from '../../features/workspace/workspaceSlice';
import { useAppSelector } from '../../app/hooks';
import {
  ArchiveHubService,
  UseDeleteHubService,
} from '../../features/hubs/hubService';
import {
  setArchiveHub,
  setDelHub,
  setShowSubItems,
  setShowEditHubModal,
} from '../../features/hubs/hubSlice';
import EditHubModal from '../../pages/workspace/hubs/components/EditHubModal';

interface itemsType {
  id: number;
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
  isVisible: boolean;
}

function MenuDropdownt() {
  const dispatch = useDispatch();
  const { currentItemId } = useAppSelector((state) => state.workspace);
  // const { currHubId } = useAppSelector((state) => state.hub);
  const { delHub } = useAppSelector((state) => state.hub);
  const { archiveHub } = useAppSelector((state) => state.hub);
  const { showSubItems } = useAppSelector((state) => state.hub);
  const { showEditHubModal } = useAppSelector((state) => state.hub);
  // ! actions here (create, delete, rename)
  //archiveHub
  ArchiveHubService({
    query: currentItemId,
    archiveHub,
  });

  //deleteHubs
  const { status } = UseDeleteHubService({
    query: currentItemId,
    delHub,
  });

  if (status == 'success') {
    dispatch(setDelHub(false));
  }

  // ! (too big!) destructure to different components

  const itemsList: itemsType[] = [
    {
      id: 1,
      title: 'Create new',
      handleClick: () => {
        dispatch(setShowSubItems(!showSubItems));
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
        dispatch(setShowEditHubModal(true));
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
    <>
      <Menu as="div">
        {({ open }) => (
          <Fragment>
            <Menu.Button className="flex text-sm text-gray-400">
              <VscEllipsis
                className="w-2.5 h-2.5"
                aria-hidden="true"
                color="black"
                // onClick={() => dispatch(setShowMenuDropDown(true))}
              />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              show={open}
            >
              <Menu.Items
                className="absolute w-56 py-1 origin-top-right bg-white rounded-md shadow-lg bottom-20 left-0 z-20 ring-1 ring-black ring-opacity-5 focus:outline-none"
                static
              >
                {itemsList.map((item) =>
                  item.isVisible ? (
                    <Menu.Item key={item.id}>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 text-left'
                          )}
                          onClick={item.handleClick}
                        >
                          {item.icon}
                          <p>{item.title}</p>
                        </div>
                      )}
                    </Menu.Item>
                  ) : null
                )}
              </Menu.Items>
            </Transition>
          </Fragment>
        )}
      </Menu>
      {showSubItems && <SubDd />}
      {showEditHubModal && <EditHubModal />}
    </>
  );
}

export default MenuDropdownt;