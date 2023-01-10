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

  const selectedFolder = sub?.data.current_folder;

  return (
    <div>
      {folders.map((rootFolder) => (
        <div key={rootFolder.id}>
          {/* root folders list */}
          <FolderItem
            key={rootFolder.id}
            id={rootFolder.id}
            parentId={rootFolder.parentId}
            name={rootFolder.name}
            handleClickFolder={handleClickFolder}
            isActiveFolder={rootFolder.id === selectedFolderId}
          />

          {selectedFolder?.ancestors
            ?.map((i) => i.id)
            .includes(rootFolder.id) || selectedFolder?.id === rootFolder.id ? (
            <>
              {/* ancestors without root  */}
              {selectedFolder.ancestors
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

              {/* selected folder (only if child, not root) */}
              {rootFolder.id !== selectedFolder.id ? (
                <FolderItem
                  id={selectedFolder.id}
                  name={selectedFolder.name}
                  parentId={selectedFolder.parent_id}
                  handleClickFolder={handleClickFolder}
                  isActiveFolder={selectedFolder.id === selectedFolderId}
                />
              ) : null}

              {/* children */}
              {subFolders?.map((subFolder) => (
                <FolderItem
                  key={subFolder.id}
                  id={subFolder.id}
                  parentId={subFolder.parentId}
                  name={subFolder.name}
                  handleClickFolder={handleClickFolder}
                  isActiveFolder={subFolder.id === selectedFolderId}
                />
              ))}
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}
