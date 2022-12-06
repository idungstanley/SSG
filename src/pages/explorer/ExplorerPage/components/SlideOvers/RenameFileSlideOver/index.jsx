import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setRenameFileSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import {
  renameItemService,
  // renameFileService,
} from '../../../../../../features/explorer/explorerActionsService';
import {
  useGetFile,
  useGetFolder,
} from '../../../../../../features/explorer/explorerService';

import { SlideOver, Button, Input } from '../../../../../../components';

function RenameFileSlideOver() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const showSlideOver = useSelector(
    (state) => state.slideOver.showRenameFileSlideOver,
  );

  const {
    selectedItemType, selectedFileIds, selectedFolderIds,
  } = useSelector(
    (state) => state.explorer,
  );

  const isFile = selectedItemType === 'file';
  const itemId = isFile ? selectedFileIds[0] : selectedFolderIds[0];
  const { data: item } = isFile
    ? useGetFile(itemId)
    : useGetFolder(itemId);

  // Form state
  const [itemName, setItemName] = useState(
    isFile ? item?.display_name : item?.name,
  );
  console.log(item);

  // console.log(selectedItemId, selectedFileIds, selectedFolderIds);

  // const defaultFormState = {
  //   name: '',
  // };

  // const [formState, setFormState] = useState(defaultFormState);

  // const { name } = formState;

  // const onChange = (e) => {
  //   setFormState((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // useEffect(() => {
  //   if (file != null) {
  //     setFormState({
  //       name: file.display_name,
  //     });
  //   }
  // }, [file]);

  const renameFileMutation = useMutation(renameItemService, {
    onSuccess: () => {
      dispatch(setRenameFileSlideOverVisibility(false));
      // setFormState(defaultFormState);
      queryClient.invalidateQueries(['explorer_files_and_folders']);
      // queryClient.setQueryData(
      //   ['explorer_file', successData.data.file.id],
      //   successData.data.file
      // );
    },
  });

  const onSubmit = () => {
    renameFileMutation.mutate({
      type: selectedItemType,
      id: itemId,
      name: itemName,
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
              label={`${selectedItemType} name`}
              placeholder={`${selectedItemType} name`}
              name="name"
              value={itemName}
              type="text"
              onChange={(e) => setItemName(e.target.value)}
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
