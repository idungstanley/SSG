import { ArchiveIcon, InboxIcon } from '@heroicons/react/solid';
import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../../../../components';
import {
  useArchiveOrUnarchiveInboxFile,
  useGetInboxFile,
} from '../../../../../features/inbox/inboxService';

export default function ArchiveInboxFile() {
  const selectedInboxFileId = useSelector(
    (state) => state.inbox.selectedInboxFileId,
  );
  const { data: inboxFile } = useGetInboxFile(selectedInboxFileId);
  const { mutate: archiveFile } = useArchiveOrUnarchiveInboxFile();

  const archive = () => {
    archiveFile({
      inboxFileId: inboxFile.id,
      type: inboxFile.archived_at ? 'unarchive' : 'archive',
    });
  };

  return inboxFile ? (
    <Button
      buttonStyle="white"
      label={inboxFile.archived_at ? 'Unarchive' : 'Archive'}
      onClick={archive}
      icon={
        inboxFile.archived_at ? (
          <InboxIcon
            className="mr-2.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        ) : (
          <ArchiveIcon
            className="mr-2.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        )
      }
      iconPosition="center"
      borderRight={false}
      roundedRight={false}
      ringOnFocus
    />
  ) : null;
}
