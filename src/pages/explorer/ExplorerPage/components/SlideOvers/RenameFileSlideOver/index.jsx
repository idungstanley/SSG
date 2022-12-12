import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRenameFileSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';
import { useRenameItem } from '../../../../../../features/explorer/explorerActionsService';
import {
  useGetFile,
  useGetFolder,
} from '../../../../../../features/explorer/explorerService';

import { SlideOver, Button, Input } from '../../../../../../components';

function RenameItemSlideOver() {
  const dispatch = useDispatch();

  const showSlideOver = useSelector(
    (state) => state.slideOver.showRenameFileSlideOver,
  );
  const { selectedItemId, selectedItemType } = useSelector(
    (state) => state.explorer,
  );

  const isFile = selectedItemType === 'file';

  const { data: item } = isFile ? useGetFile(selectedItemId) : useGetFolder(selectedItemId);

  const [itemName, setItemName] = useState(
    isFile ? item?.display_name.split('.').slice(0, -1).join('') : item?.name,
  );

  const { mutateAsync: onRename } = useRenameItem();

  const onSubmit = async () => {
    await onRename({
      type: selectedItemType,
      id: selectedItemId,
      name: `${itemName}.${item?.file_format.extension}`,
    });

    dispatch(setRenameFileSlideOverVisibility(false));
  };

  return (
    <SlideOver
      show={showSlideOver}
      onClose={() => dispatch(setRenameFileSlideOverVisibility(false))}
      headerTitle={`Rename ${selectedItemType}`}
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
          label="Rename"
          width="w-40"
        />
      )}
    />
  );
}

export default RenameItemSlideOver;
