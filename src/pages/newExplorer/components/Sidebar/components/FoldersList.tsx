import React, { useMemo } from 'react';
import { useGetExplorerFolder } from '../../../../../features/explorer/explorerService';
import { useNavigate, useParams } from 'react-router-dom';
import FolderItem from './FolderItem';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  setFastPreview,
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
  const { selectedFolderId, draggableItem, fastPreview } = useAppSelector(
    (state) => state.explorer
  );
  const { data: sub } = useGetExplorerFolder(folderId);
  console.log(folders);

  const handleClickFolder = (folderId: string, parentId: string | null) => {
    console.log(parentId);
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

    if (fastPreview.show) {
      dispatch(setFastPreview({ show: false }));
    }
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
            parentId={rootFolder.parentId}
            haveAncestors={
              !!subFolders?.length &&
              !!selectedFolder?.ancestors?.find((i) => i.id === rootFolder.id)
            }
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
                      paddingLeft: (index + 1) * 10,
                    }}
                    className={classNames(
                      ancestor.id === selectedFolderId
                        ? 'bg-green-50 text-black'
                        : '',
                      'hover:bg-gray-100 relative'
                    )}
                  >
                    {ancestor.id === selectedFolderId && (
                      <span className="absolute top-0 bottom-0 left-0 w-0.5 bg-green-500" />
                    )}
                    <FolderItem
                      id={ancestor.id}
                      name={ancestor.name}
                      haveAncestors={!!ancestor.parent_id}
                      parentId={ancestor.parent_id}
                      handleClickFolder={handleClickFolder}
                      isActiveFolder={ancestor.id === selectedFolderId}
                    />
                  </div>
                ))}

              {/* selected folder (only if child, not root) */}
              <div
                style={{ paddingLeft: ancestorsLength * 10 }}
                className={classNames(
                  rootFolder.id !== selectedFolder.id
                    ? 'bg-green-50 text-black'
                    : '',
                  'hover:bg-gray-100 relative'
                )}
              >
                {rootFolder.id !== selectedFolder.id && (
                  <span className="absolute top-0 bottom-0 left-0 w-0.5 bg-green-500" />
                )}
                {rootFolder.id !== selectedFolder.id ? (
                  <FolderItem
                    id={selectedFolder.id}
                    name={selectedFolder.name}
                    parentId={selectedFolder.parent_id}
                    haveAncestors={!!selectedFolder.ancestors?.length}
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
                    paddingLeft: ancestorsLength
                      ? (ancestorsLength + 1) * 10
                      : 10,
                  }}
                  className={classNames(
                    subFolder.id === selectedFolderId
                      ? 'bg-green-50 text-black'
                      : '',
                    'hover:bg-gray-100 relative'
                  )}
                >
                  {subFolder.id === selectedFolderId && (
                    <span className="absolute top-0 bottom-0 left-0 w-0.5 bg-green-500" />
                  )}
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
