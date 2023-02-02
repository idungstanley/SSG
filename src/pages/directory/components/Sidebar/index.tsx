import React, { useState } from 'react';
import {
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
import DirectoryList from './components';

function Sidebar() {
  const dispatch = useAppDispatch();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  const configForDropdown = [
    {
      label: 'Directory',
      icon: <FolderPlusIcon className="h-5 w-5" aria-hidden="true" />,
      onClick: () => dispatch(setShowCreateDirectorySlideOver(true)),
    },
  ];

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

      <DirectoryList />
    </>
  );
}

export default Sidebar;
