import React, { useMemo } from 'react';
import { useGetExplorerFolder } from '../../../../../features/explorer/explorerService';
import { useNavigate, useParams } from 'react-router-dom';
import FolderItem from './FolderItem';

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

export default function FoldersList({
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
