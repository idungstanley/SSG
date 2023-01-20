import React, { useMemo } from 'react';
import { useGetExplorerFolder } from '../../../../../features/explorer/explorerService';
import { useNavigate, useParams } from 'react-router-dom';
import FolderItem from './FolderItem';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  setSelectedFolderId,
  setSelectedItem,
} from '../../../../../features/explorer/explorerSlice';
import { useDroppable } from '@dnd-kit/core';
import { classNames } from '../../../../../utils';

interface FoldersListProps {
  folders: {
    ancestors: { name: string; id: string; parent_id: string | null }[] | null;
    name: string;
    id: string;
    parentId: string | null;
  }[];
  isSearchedResults: boolean;
}

export default function FoldersList({
  folders,
  isSearchedResults,
}: FoldersListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { folderId } = useParams();
  const { selectedFolderId, draggableItem } = useAppSelector(
    (state) => state.explorer
  );
  const { data: sub } = useGetExplorerFolder(folderId);

  const handleClickFolder = (folderId: string, parentId: string | null) => {
    const isActiveFolder = selectedFolderId === folderId;
    dispatch(setSelectedFolderId(isActiveFolder ? parentId : folderId));
    navigate(`/new-explorer/${isActiveFolder ? parentId || '' : folderId}`, {
      replace: true,
    });

    dispatch(
      setSelectedItem({
        selectedItemId: folderId,
        selectedItemType: 'folder',
      })
    );
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

  const ancestorsLength =
    (isSearchedResults
      ? selectedFolder?.ancestors?.filter((i) => i.parent_id).length
      : selectedFolder?.ancestors?.length) || 0;

  return (
    <>
      {folders.map((rootFolder) => (
        <div key={rootFolder.id}>
          {/* root folders list */}
          <FolderItem
            key={rootFolder.id}
            id={rootFolder.id}
            haveAncestors={
              !!subFolders?.length &&
              !!selectedFolder?.ancestors?.find((i) => i.id === rootFolder.id)
            }
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
                .filter((i) => i.parent_id)
                .map((ancestor, index) => (
                  <div
                    key={ancestor.id}
                    style={{
                      marginLeft: (index + 1) * 10,
                    }}
                  >
                    <FolderItem
                      id={ancestor.id}
                      name={ancestor.name}
                      parentId={ancestor.parent_id}
                      haveAncestors={!!ancestor.parent_id}
                      handleClickFolder={handleClickFolder}
                      isActiveFolder={ancestor.id === selectedFolderId}
                    />
                  </div>
                ))}

              {/* selected folder (only if child, not root) */}
              <div style={{ marginLeft: ancestorsLength * 10 }}>
                {rootFolder.id !== selectedFolder.id ? (
                  <FolderItem
                    id={selectedFolder.id}
                    name={selectedFolder.name}
                    haveAncestors={!!selectedFolder.ancestors?.length}
                    parentId={selectedFolder.parent_id}
                    handleClickFolder={handleClickFolder}
                    isActiveFolder={selectedFolder.id === selectedFolderId}
                  />
                ) : null}
              </div>

              {/* children */}
              {subFolders?.map((subFolder) => (
                <div
                  key={subFolder.id}
                  style={{
                    marginLeft: ancestorsLength
                      ? (ancestorsLength + 1) * 10
                      : 10,
                  }}
                >
                  <FolderItem
                    id={subFolder.id}
                    parentId={subFolder.parentId}
                    name={subFolder.name}
                    haveAncestors={false}
                    handleClickFolder={handleClickFolder}
                    isActiveFolder={subFolder.id === selectedFolderId}
                  />
                </div>
              ))}
            </>
          ) : null}
        </div>
      ))}

      {draggableItem?.id ? <DragOverRoot /> : null}
    </>
  );
}

function DragOverRoot() {
  const { isOver, setNodeRef: droppableRef } = useDroppable({
    id: 'root',
    data: { parentId: null },
  });

  return (
    <div
      className={classNames(
        'mt-2 w-full border text-center py-1 px-1 hover:bg-gray-100',
        isOver ? 'bg-primary-100' : ''
      )}
      ref={droppableRef}
    >
      Drag here to move to root folder
    </div>
  );
}
