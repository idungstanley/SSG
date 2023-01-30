import React, { useState } from 'react';
import {
  FolderPlusIcon,
  MagnifyingGlassIcon,
  MagnifyingGlassMinusIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import PlaceItem from '../../../workspace/sidebar/components/PlaceItem';
import Dropdown from '../../../../components/Dropdown/index';
import Search from '../../../newExplorer/components/Search';
import { useGetDirectories } from '../../../../features/directory/directoryService';
import { Spinner } from '../../../../common';
import FullScreenMessage from '../../../../components/CenterMessage/FullScreenMessage';
import { AiOutlineBranches } from 'react-icons/ai';
import { PlayIcon } from '@heroicons/react/24/solid';
import { classNames } from '../../../../utils';
import { useNavigate, useParams } from 'react-router-dom';

function Sidebar() {
  const { directoryId } = useParams();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  const { data, status } = useGetDirectories();

  const configForDropdown = [
    {
      label: 'Directory',
      icon: <FolderPlusIcon className="h-5 w-5" aria-hidden="true" />,
      onClick: () => ({}),
      // dispatch(
      //   setItemActionForSideOver({
      //     action: 'create',
      //     id: folderId || '',
      //   })
      // ),
    },
  ];

  const onClickDirectory = (id: string) => {
    const isActiveDirectory = directoryId === id;

    navigate(`/directory/${isActiveDirectory ? '' : id}`, {
      replace: true,
    });
  };

  return (
    <>
      <PlaceItem
        label="Directory"
        icon={<AiOutlineBranches className="h-5 w-5" />}
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

      {status === 'loading' ? (
        <div className="mx-auto w-6 mt-5 justify-center">
          <Spinner size={8} color="#0F70B7" />
        </div>
      ) : status === 'error' ? (
        <FullScreenMessage
          title="Oops, an error occurred :("
          description="Please try again later."
        />
      ) : null}

      <div className="flex flex-col mb-2">
        {data
          ? data.map((directory) => (
              <div key={directory.id} className="flex flex-col w-full">
                {/* directory */}
                <div
                  onClick={() => onClickDirectory(directory.id)}
                  className="hover:bg-gray-100 flex w-full p-1 gap-2 items-center cursor-pointer"
                >
                  <PlayIcon className="h-4 w-4 cursor-pointer text-gray-700" />
                  <AiOutlineBranches className="h-5 w-5 cursor-pointer" />
                  <p>{directory.name}</p>
                </div>

                {/* templates */}
                <div
                  className={classNames(
                    'ml-6',
                    directory.templates.length > 0 ? 'mt-2' : ''
                  )}
                >
                  {directory.templates.map((template) => (
                    <div key={template.id} className="flex gap-2">
                      <Squares2X2Icon className="h-5 w-5 cursor-pointer" />
                      <p>{template.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}

export default Sidebar;
