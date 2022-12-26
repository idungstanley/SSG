import React from 'react';
import { useParams } from 'react-router-dom';
import Toolbar from './Toolbar';
import Main from './Main';
import { useGetInboxFile } from '../../../../../features/inbox/inboxService';
import { useAppSelector } from '../../../../../app/hooks';

function InboxFile() {
  const { inboxId } = useParams();
  const selectedInboxFileId = useAppSelector(
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
