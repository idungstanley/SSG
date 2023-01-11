import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setCreateFolderSlideOverVisibility } from '../../../../../features/general/slideOver/slideOverSlice';
// import { createFolderService } from '../../../../../features/explorer/explorerService';
import { SlideOver, Button, Input } from '../../../../../components';
import { useAppSelector } from '../../../../../app/hooks';

function CreateFolderSlideOver() {
  const dispatch = useDispatch();
  // const queryClient = useQueryClient();
  // const { folderId } = useParams();

  const { showCreateFolderSlideOver } = useAppSelector(
    (state) => state.slideOver
  );

  const [folderName, setFolderName] = useState('');

  // const createFolderMutation = useMutation(createFolderService, {
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries([
  //       'explorer_files_and_folders',
  //       data.data.parent_folder == null
  //         ? 'root-folder'
  //         : data.data.parent_folder.id,
  //     ]);
  //   },
  // });

  const onSubmit = async () => {
    // await createFolderMutation.mutateAsync({
    //   folderName,
    //   parentId: folderId,
    // });
    dispatch(setCreateFolderSlideOverVisibility(false));
  };

  return (
    <SlideOver
      show={showCreateFolderSlideOver}
      onClose={() => dispatch(setCreateFolderSlideOverVisibility(false))}
      headerTitle="Create a new folder"
      body={
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="Folder name"
              placeholder="Folder name"
              name="name"
              value={folderName}
              type="text"
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>
        </div>
      }
      footerButtons={
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          // loading={createFolderMutation.status === 'loading'}
          label="Create folder"
          width="w-40"
        />
      }
    />
  );
}

export default CreateFolderSlideOver;
