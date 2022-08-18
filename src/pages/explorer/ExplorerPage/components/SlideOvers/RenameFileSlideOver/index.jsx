import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setRenameFileSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import { renameFileService } from '../../../../../../features/explorer/explorerActionsService';
import { useGetFile } from '../../../../../../features/explorer/explorerService';

import { SlideOver, Button, Input } from '../../../../../../components';

function RenameFileSlideOver() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const showSlideOver = useSelector((state) => state.slideOver.showRenameFileSlideOver);
  const selectedItemId = useSelector((state) => state.explorer.selectedItemId);
  const { data: file } = useGetFile(selectedItemId);

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
    if (file != null) {
      setFormState({
        name: file.display_name,
      });
    }
  }, [file]);

  const renameFileMutation = useMutation(renameFileService, {
    onSuccess: (successData) => {
      dispatch(setRenameFileSlideOverVisibility(false));
      setFormState(defaultFormState);
      queryClient.setQueryData(['explorer_file', successData.data.file.id], successData.data.file);
    },
  });

  const onSubmit = async () => {
    renameFileMutation.mutate({
      fileId: selectedItemId,
      name,
    });
  };

  return (
    <SlideOver
      show={showSlideOver}
      onClose={() => dispatch(setRenameFileSlideOverVisibility(false))}
      headerTitle="Rename file"
      body={(
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div className="space-y-1 px-4 sm:space-y-0 sm:px-6 sm:py-5">
            <Input
              label="File name"
              placeholder="File name"
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
          loading={renameFileMutation.status === 'loading'}
          label="Rename"
          width="w-40"
        />
      )}
    />
  );
}

export default RenameFileSlideOver;
