import React, { useState } from 'react';
import {
  BookOpenIcon,
  FolderPlusIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MagnifyingGlassMinusIcon,
} from '@heroicons/react/24/outline';
import PlaceItem from '../../../workspace/sidebar/components/PlaceItem';
import Dropdown from '../../../../components/Dropdown/index';
import Search from '../../../newExplorer/components/Search';
import { useAppDispatch } from '../../../../app/hooks';
import { setShowCreateDirectorySlideOver } from '../../../../features/general/slideOver/slideOverSlice';
import DirectoryList from './components/Directories';
import { classNames } from '../../../../utils';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  const configForDropdown = [
    {
      label: 'Directory',
      icon: <FolderPlusIcon className="h-5 w-5" aria-hidden="true" />,
      onClick: () => dispatch(setShowCreateDirectorySlideOver(true)),
    },
  ];

  const isBookShelf = pathname.split('/')[2] === 'shelf';

  return (
    <>
      <PlaceItem
        label="Library"
        icon={<HomeIcon className="h-5 w-5" />}
        rightContent={
          <div className="flex gap-2">
            <Dropdown config={configForDropdown} iconType="plus" />

            {showSearch ? (
              <MagnifyingGlassMinusIcon
                onClick={() => setShowSearch(false)}
                className="h-5 w-5 text-gray-500 cursor-pointer"
              />
            ) : (
              <MagnifyingGlassIcon
                onClick={() => setShowSearch(true)}
                className="h-5 w-5 text-gray-500 cursor-pointer"
              />
            )}
          </div>
        }
        bottomContent={
          showSearch ? (
            <Search query={query} setQuery={setQuery} type="folder" />
          ) : null
        }
      />

      <LibraryNavigation label="Book Case" path="case" />
      <LibraryNavigation label="Book Shelf" path="shelf" />
      {isBookShelf ? (
        <div className="ml-5">
          <DirectoryList />
        </div>
      ) : null}
    </>
  );
}

export default Sidebar;

interface LibraryNavigationProps {
  label: string;
  path: string;
}

function LibraryNavigation({ label, path }: LibraryNavigationProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = path === pathname.split('/')[2];

  const onClick = () => {
    navigate(`/directory${isActive ? '' : '/' + path}`);
  };

  return (
    <div
      onClick={onClick}
      className={classNames(
        'hover:bg-gray-100 flex w-full p-1 gap-2 items-center cursor-pointer',
        isActive ? 'bg-gray-100' : ''
      )}
    >
      {isActive ? (
        <VscTriangleDown className="h-4 w-4 text-gray-500" aria-hidden="true" />
      ) : (
        <VscTriangleRight
          className="h-4 w-4 text-gray-500"
          aria-hidden="true"
        />
      )}
      <BookOpenIcon className="h-5 w-5 cursor-pointer" />
      <p>{label}</p>
    </div>
  );
}
