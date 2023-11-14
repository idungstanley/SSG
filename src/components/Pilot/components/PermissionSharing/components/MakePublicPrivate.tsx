import React, { useState } from 'react';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { useAppSelector } from '../../../../../app/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMakePulicOrPrivate } from '../../../../../features/workspace/workspaceService';

function MakePublicPrivate({ isPublic }: { isPublic: number }) {
  const queryClient = useQueryClient();
  const [privateMode, setPrivateMode] = useState<boolean>(isPublic === 0 ? false : true);
  const { entityForPermissions } = useAppSelector((state) => state.workspace);

  const makePrublicoeprivate = useMutation(useMakePulicOrPrivate, {
    onSuccess: () => {
      setPrivateMode(!privateMode);
      queryClient.invalidateQueries([`${entityForPermissions?.type ?? 'hub'}-permissions`, entityForPermissions?.id]);
    }
  });

  const handlePublicorPrivate = async (route: string) => {
    const model = entityForPermissions?.type ? entityForPermissions.type : 'hub';
    const model_id = entityForPermissions?.id;
    await makePrublicoeprivate.mutateAsync({
      model,
      model_id: model_id as string,
      route
    });
  };

  return (
    <>
      {privateMode ? (
        <button
          className="w-11/12 m-auto py-1 flex justify-center items-center border border-alsoit-gray-100 rounded gap-1"
          onClick={() => {
            handlePublicorPrivate('public');
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
