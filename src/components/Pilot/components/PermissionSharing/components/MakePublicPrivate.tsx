import React from 'react';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { useAppSelector } from '../../../../../app/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMakePulicOrPrivate } from '../../../../../features/workspace/workspaceService';
import { useParams } from 'react-router-dom';

function MakePublicPrivate({ isPublic }: { isPublic?: number }) {
  const queryClient = useQueryClient();
  const { listId, hubId, walletId } = useParams();
  const { entityForPermissions } = useAppSelector((state) => state.workspace);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const currentActiveId = hubId ?? walletId ?? listId;

  const entityType = entityForPermissions
    ? entityForPermissions.type
      ? entityForPermissions.type
      : 'hub'
    : activeItemType;
  const entityId = entityForPermissions ? entityForPermissions.id : activeItemId ?? currentActiveId;

  const makePrublicoeprivate = useMutation(useMakePulicOrPrivate, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${entityType}-permissions`, entityId]);
    }
  });

  const handlePublicorPrivate = async (route: string) => {
    await makePrublicoeprivate.mutateAsync({
      model: entityType as string,
      model_id: entityId as string,
      route
    });
  };

  return (
    <>
      {isPublic !== 0 ? (
        <button
          className="w-11/12 m-auto py-1 flex justify-center items-center border border-alsoit-gray-100 rounded gap-1"
          onClick={() => {
            handlePublicorPrivate('private');
          }}
        >
          <FaLockOpen />
          Make Private
        </button>
      ) : (
        <button
          className="w-11/12 m-auto py-1 flex justify-center items-center border border-alsoit-gray-100 rounded gap-1"
          onClick={() => {
            handlePublicorPrivate('public');
          }}
        >
          <FaLock />
          Make Public
        </button>
      )}
    </>
  );
}

export default MakePublicPrivate;
