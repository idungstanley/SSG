import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useGetInboxFile } from '../../../../../../../../../features/inbox/inboxService';

function FileHeader() {
  const selectedInboxFileId = useSelector(
    (state) => state.inbox.selectedInboxFileId,
  );
  const { data: inboxFile } = useGetInboxFile(selectedInboxFileId);

  const user = inboxFile.inbox_file_source.created_by_team_member
    ? inboxFile.inbox_file_source.created_by_team_member?.user.name
    : null;

  return inboxFile ? (
    <div className="px-6 py-4 border-b border-gray-200 w-full">
      <div className="sm:flex justify-between sm:items-baseline">
        <div className="sm:w-0 sm:flex-1">
          <h1
            id="messages-heading"
            className="text-lg font-medium text-gray-900 break-words"
          >
            {inboxFile.inbox_file_source.display_name}
          </h1>

          {inboxFile.inbox_file_source.upload_method.key === 'email' && (
            <p className="mt-1 text-sm text-gray-500 overflow-hidden overflow-ellipsis">
              {`Sent in ${moment(
                inboxFile.inbox_file_source.created_at,
              ).fromNow()} by 
              ${inboxFile.inbox_file_source.sent_from_email} via email`}
            </p>
          )}

          {inboxFile.inbox_file_source.upload_method.key === 'dashboard' && (
            <p className="mt-1 text-sm text-gray-500 overflow-hidden overflow-ellipsis">
              {` Uploaded
              ${moment(inboxFile.inbox_file_source.created_at).fromNow()} ${
                user ? `by ${user}` : ''
              }`}
            </p>
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default FileHeader;
