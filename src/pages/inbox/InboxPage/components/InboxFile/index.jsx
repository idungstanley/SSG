import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Toolbar from './Toolbar';
import Main from './Main';
import { useGetActiveInboxes, useInboxes } from '../../../../../features/inbox/inboxesService';
import { useGetInboxFile } from '../../../../../features/inbox/inboxService';

function InboxFile() {
  const { inboxId } = useParams();
  const selectedInboxFileId = useSelector(
    (state) => state.inbox.selectedInboxFileId,
  );

  const { status, data: inboxFile } = useGetInboxFile(selectedInboxFileId);

  // TODO: check if its can be removed
  const { data: dataActiveWithPinned } = useGetActiveInboxes();
  const { data: dataHidden } = useInboxes('hidden');
  const { data: dataArchive } = useInboxes('archived');

  const active = dataActiveWithPinned?.data.inboxes;
  const hidden = dataHidden?.data.inboxes;
  const archive = dataArchive?.data.inboxes;

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
