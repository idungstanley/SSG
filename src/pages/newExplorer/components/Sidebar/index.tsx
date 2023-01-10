import React, { useMemo, useState } from 'react';
import {
  useGetExplorerFolder,
  useGetExplorerFolders,
} from '../../../../features/explorer/explorerService';
import {
  PlusIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  FolderIcon,
} from '@heroicons/react/outline';
import { Input } from '../../../../components';
import { classNames } from '../../../../utils';
import { useNavigate, useParams } from 'react-router-dom';

// interface IShortFolder {
//   ancestors: { name: string; id: string; parent_id: string | null }[] | null;
//   name: string;
//   id: string;
//   children: IShortFolder[];
// }

export default function Sidebar() {
  const { folderId } = useParams();
  // const navigate = useNavigate();

  const { data } = useGetExplorerFolders();

  // const { data: sub } = useGetExplorerFolder(folderId);

  const [selectedFolderId, setSelectedFolderId] = useState<null | string>(
    folderId || null
  );

  const folders = useMemo(
    () =>
      data?.map((i) => ({
        name: i.name,
        id: i.id,
        ancestors: i.ancestors,
        parentId: i.parent_id,
      })),
    [data]
  );

  // const subFolders = useMemo(
  //   () =>
  //     sub?.data.folders.map((i) => ({
  //       name: i.name,
  //       ancestors: i.ancestors,
  //       id: i.id,
  //       parentId: i.parent_id,
  //     })),
  //   [sub]
  // );

  // const handleClickFolder = (folderId: string) => {
  //   const isActiveFolder = selectedFolderId === folderId;

  //   setSelectedFolderId(isActiveFolder ? null : folderId);
  //   navigate(`/new-explorer/${isActiveFolder ? '' : folderId}`, {
  //     replace: true,
  //   });
  // };

  // console.log(subFolders);

  return (
    <aside className="border-r p-2">
      {/* header */}
      <div className="border-b p-2 w-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1>Explorer</h1>
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        {/* search  */}
        <div>
          <Input
            name="explorer-folder-search"
            onChange={() => ({})}
            placeholder="enter folder name"
          />
        </div>
      </div>

      {/* folder list */}
      {/* {folders ? (
        <div>
          {folders.map((folder) => (
            <div key={folder.id}>
              <FolderItem
                key={folder.id}
                id={folder.id}
                name={folder.name}
                handleClickFolder={handleClickFolder}
                isActiveFolder={folder.id === selectedFolderId}
              />
              {selectedFolderId === folder.id ? (
                <div className="bg-red-200">
                  {subFolders?.map((sub) => (
                    <div key={sub.id}>
                      {sub.ancestors
                        ?.filter(
                          (i) => !folders?.map((j) => j.id)?.includes(i.id)
                        )
                        .map((fol) => (
                          <FolderItem
                            key={fol.id}
                            id={fol.id}
                            name={fol.name}
                            handleClickFolder={handleClickFolder}
                            isActiveFolder={fol.id === selectedFolderId}
                          />
                        ))}
                      <FolderItem
                        key={sub.id}
                        id={sub.id}
                        name={sub.name}
                        handleClickFolder={handleClickFolder}
                        isActiveFolder={sub.id === selectedFolderId}
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null} */}
      {/* <div className="bg-red-200">
        {subFolders?.map((sub) => (
          <div key={sub.id}>
            {sub.ancestors
              ?.filter((i) => !folders?.map((j) => j.id)?.includes(i.id))
              .map((fol) => (
                <FolderItem
                  key={fol.id}
                  id={fol.id}
                  name={fol.name}
                  handleClickFolder={handleClickFolder}
                  isActiveFolder={fol.id === selectedFolderId}
                />
              ))}
            <FolderItem
              key={sub.id}
              id={sub.id}
              name={sub.name}
              handleClickFolder={handleClickFolder}
              isActiveFolder={sub.id === selectedFolderId}
            />
          </div>
        ))}
      </div> */}

      {folders ? (
        <FoldersList
          folders={folders}
          setSelectedFolderId={setSelectedFolderId}
          selectedFolderId={selectedFolderId}
        />
      ) : null}
    </aside>
  );
}

interface FoldersListProps {
  folders: {
    ancestors: { name: string; id: string; parent_id: string | null }[] | null;
    name: string;
    id: string;
    parentId: string | null;
  }[];
  selectedFolderId: string | null;
  setSelectedFolderId: (i: string | null) => void;
}

function FoldersList({
  folders,
  selectedFolderId,
  setSelectedFolderId,
}: FoldersListProps) {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const { data: sub } = useGetExplorerFolder(folderId);

  const handleClickFolder = (folderId: string, parentId: string | null) => {
    const isActiveFolder = selectedFolderId === folderId;

    setSelectedFolderId(isActiveFolder ? parentId : folderId);
    navigate(`/new-explorer/${isActiveFolder ? parentId || '' : folderId}`, {
      replace: true,
    });
  };

  const subFolders = useMemo(
    () =>
      sub?.data.folders.map((i) => ({
        name: i.name,
        ancestors: i.ancestors,
        id: i.id,
        parentId: i.parent_id,
      })),
    [sub]
  );

  return (
    <div>
      {folders.map((folder) => (
        <div key={folder.id}>
          <FolderItem
            key={folder.id}
            id={folder.id}
            parentId={folder.parentId}
            name={folder.name}
            handleClickFolder={handleClickFolder}
            isActiveFolder={folder.id === selectedFolderId}
          />
          {(sub?.data.current_folder.ancestors
            ?.map((i) => i.id)
            .includes(folder.id) ||
            sub?.data.current_folder.id === folder.id) &&
            subFolders?.map((sub) => (
              <div key={sub.id}>
                {sub.ancestors
                  ?.filter((i) => !folders?.map((j) => j.id)?.includes(i.id))
                  .map((fol) => (
                    <FolderItem
                      key={fol.id}
                      id={fol.id}
                      name={fol.name}
                      parentId={fol.parent_id}
                      handleClickFolder={handleClickFolder}
                      isActiveFolder={fol.id === selectedFolderId}
                    />
                  ))}
                <FolderItem
                  key={sub.id}
                  id={sub.id}
                  parentId={sub.parentId}
                  name={sub.name}
                  handleClickFolder={handleClickFolder}
                  isActiveFolder={sub.id === selectedFolderId}
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

interface FolderItemProps {
  id: string;
  name: string;
  parentId: string | null;
  handleClickFolder: (i: string, parentId: string | null) => void;
  isActiveFolder: boolean;
}

function FolderItem({
  id,
  name,
  parentId,
  handleClickFolder,
  isActiveFolder,
}: FolderItemProps) {
  return (
    <div
      onClick={() => handleClickFolder(id, parentId)}
      key={id}
      className={classNames(
        'flex w-full items-center py-1 cursor-pointer gap-2 hover:bg-gray-100',
        isActiveFolder ? 'text-primary-600 bg-primary-50' : ''
      )}
    >
      {isActiveFolder ? (
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      )}

      <div className="flex gap-2 items-center">
        <FolderIcon className="h-5 w-5" aria-hidden="true" />
        <p>{name}</p>
      </div>
    </div>
  );
}
