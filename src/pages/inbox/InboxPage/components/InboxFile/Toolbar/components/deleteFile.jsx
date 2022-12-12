import React from 'react';
import { TrashIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../../../../components';
import { useDeleteInboxFile } from '../../../../../../../features/inbox/inboxService';
import { setCurrentInboxFile } from '../../../../../../../features/inbox/inboxSlice';

export default function DeleteFile() {
  const dispatch = useDispatch();
  const { selectedInboxFileId } = useSelector((state) => state.inbox);

  const { mutate: onDelete } = useDeleteInboxFile();
  const handleClick = () => {
    onDelete({
      fileId: selectedInboxFileId,
    });
    dispatch(setCurrentInboxFile({
      selectedInboxFileId: null,
      selectedInboxFileIndex: 1,
    }));
  };

  return (
    <Button
      buttonStyle="danger"
      onClick={handleClick}
      label="Delete"
      icon={<TrashIcon className="h-5 w-5" aria-hidden="true" />}
      iconPosition="right"
    />
  );
}
