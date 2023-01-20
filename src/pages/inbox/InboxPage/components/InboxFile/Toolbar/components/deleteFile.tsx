import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../../../../components';
import { useDeleteInboxFile } from '../../../../../../../features/inbox/inboxService';
import { setCurrentInboxFile } from '../../../../../../../features/inbox/inboxSlice';
import { useAppSelector } from '../../../../../../../app/hooks';

export default function DeleteFile() {
  const dispatch = useDispatch();
  const { selectedInboxFileId } = useAppSelector((state) => state.inbox);

  const { mutate: onDelete } = useDeleteInboxFile();
  const handleClick = () => {
    onDelete({
      fileId: selectedInboxFileId,
    });
    dispatch(
      setCurrentInboxFile({
        inboxFileId: null,
        inboxFileIndex: 1,
      })
    );
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
