import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setRenameFolderSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import { renameFolderService } from '../../../../../../features/explorer/explorerActionsService';
import { useGetFolder } from '../../../../../../features/explorer/explorerService';

import { SlideOver, Button, Input } from '../../../../../../components';

function RenameFolderSlideOver() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const showSlideOver = useSelector((state) => state.slideOver.showRenameFolderSlideOver);
  const selectedItemId = useSelector((state) => state.explorer.selectedItemId);
  const { data: folder } = useGetFolder(selectedItemId);

  // Form state

  const defaultFormState = {
    name: '',
  };

  const [formState, setFormState] = useState(defaultFormState);

  const { name } = formState;

  const onChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (folder != null) {
      setFormState({
        name: folder.name,
      });
    }
  }, [folder]);

  const renameFolderMutation = useMutation(renameFolderService, {
    onSuccess: (successData) => {
      dispatch(setRenameFolderSlideOverVisibility(false));
      setFormState(defaultFormState);
      queryClient.setQueryData(['explorer_folder', successData.data.folder.id], successData.data.folder);
    },
  });

  const onSubmit = async () => {
    renameFolderMutation.mutate({
      folderId: selectedItemId,
      name,
    });
  };

  return (
    <SlideOver
      show={showSlideOver}
      onClose={() => dispatch(setRenameFolderSlideOverVisibility(false))}
      headerTitle="Rename folder"
      body={(
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="Folder name"
              placeholder="Folder name"
              name="name"
              value={name}
              type="text"
              onChange={onChange}
            />
          </div>
        </div>
      )}
      footerButtons={(
        <Button
          buttonStyle="primary"
          onClick={onSubmit}
          loading={renameFolderMutation.status === 'loading'}
          label="Rename"
          width="w-40"
        />
      )}
    />
  );
}

export default RenameFolderSlideOver;
