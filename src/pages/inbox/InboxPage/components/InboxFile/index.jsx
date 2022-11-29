import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Toolbar from './Toolbar';
import Main from './Main';
import { useGetInboxFile } from '../../../../../features/inbox/inboxService';

function InboxFile() {
  const { inboxId } = useParams();
  const selectedInboxFileId = useSelector(
    (state) => state.inbox.selectedInboxFileId,
  );

  const { status, data: inboxFile } = useGetInboxFile(selectedInboxFileId);

  return status === 'success' && inboxFile?.inbox_id === inboxId ? (
    <div className="h-full flex flex-col w-full">
      <Toolbar />
      <Main />
    </div>
  ) : null;
}

export default InboxFile;
