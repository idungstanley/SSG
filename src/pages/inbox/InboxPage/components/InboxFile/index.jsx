import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Toolbar from './Toolbar';
import Main from './Main';
import { useGetInboxes, useInboxes } from '../../../../../features/inbox/inboxesService';
import { useGetInboxFile } from '../../../../../features/inbox/inboxService';

function InboxFile() {
  const { inboxId } = useParams();
  const selectedInboxFileId = useSelector(
    (state) => state.inbox.selectedInboxFileId,
  );

  const { status, data: inboxFile } = useGetInboxFile(selectedInboxFileId);

  const { data } = useGetInboxes();
  const active = data?.data.inboxes;

  const { data: hidden } = useInboxes('hidden');
  const { data: archive } = useInboxes('archived');
  const inbox = active?.find((i) => i.id === inboxId)
    || hidden?.find((i) => i.id === inboxId)
    || archive?.find((i) => i.id === inboxId);

  return status === 'success'
    && inbox
    && inboxFile
    && inbox?.id === inboxFile?.inbox_id ? (
      <div className="h-full flex flex-col w-full">
        <Toolbar />
        <Main />
      </div>
    ) : null;
}

export default InboxFile;
