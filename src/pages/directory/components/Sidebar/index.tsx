/* eslint-disable max-len */
import React, { useState } from 'react';
import { FolderPlusIcon, MagnifyingGlassIcon, MagnifyingGlassMinusIcon } from '@heroicons/react/24/outline';
import PlaceItem from '../../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import Dropdown from '../../../../components/Dropdown/index';
import Search from '../../../explorer/components/Search';
import { useAppDispatch } from '../../../../app/hooks';
import { setShowCreateDirectorySlideOver } from '../../../../features/general/slideOver/slideOverSlice';
import libraryIcon from '../../../../assets/icons/library.svg';
import LibraryData from './LibraryTabs/DirectoryTab';

function Sidebar() {
  const dispatch = useAppDispatch();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  const configForDropdown = [
    {
      label: 'Directory',
      icon: <FolderPlusIcon className="w-5 h-5" aria-hidden="true" />,
      onClick: () => dispatch(setShowCreateDirectorySlideOver(true))
    }
  ];

  return (
    <>
      <PlaceItem
        label="Library"
        id="13"
        icon={<img src={libraryIcon} alt="library Icon" className="w-4 h-4" />}
        rightContent={
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <Dropdown config={configForDropdown} iconType="plus" />

            {showSearch ? (
              <MagnifyingGlassMinusIcon
                onClick={() => setShowSearch(false)}
                className="w-5 h-5 text-gray-500 cursor-pointer"
              />
            ) : (
              <MagnifyingGlassIcon
                onClick={() => setShowSearch(true)}
                className="w-5 h-5 text-gray-500 cursor-pointer"
              />
            )}
          </div>
        }
        bottomContent={showSearch ? <Search query={query} setQuery={setQuery} type="folder" /> : null}
      />
      <LibraryData />
    </>
  );
}

export default Sidebar;
