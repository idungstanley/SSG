import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { setCurrentInboxFile } from '../../../../../../../features/inbox/inboxSlice';
import { useGetInboxFile } from '../../../../../../../features/inbox/inboxService';
import { FileIcon } from '../../../../../../../common';
import { StackListItemNarrow } from '../../../../../../../components';

function InboxFileListItem({ inboxFileId, index }) {
  const dispatch = useDispatch();

  const selectedInboxFileId = useSelector(
    (state) => state.inbox.selectedInboxFileId,
  );

  const { data: inboxFile } = useGetInboxFile(inboxFileId);

  const handleClick = () => {
    dispatch(
      setCurrentInboxFile({
        inboxFileId,
        inboxFileIndex: index,
      }),
    );
  };
  console.log(inboxFile);

  return inboxFile ? (
    <StackListItemNarrow
      key={inboxFile.id}
      title={inboxFile.inbox_file_source.display_name}
      description={
        inboxFile.inbox_file_source.upload_method.key === 'email'
          ? `Sent by ${inboxFile.inbox_file_source.sent_from_email} via email`
          : inboxFile.inbox_file_source.upload_method.key === 'dashboard'
            ? `Uploaded by ${inboxFile.inbox_file_source.created_by_team_member?.user.name}`
            : '-'
      }
      icon={(
        <span className="inline-block relative">
          <FileIcon
            extensionKey={inboxFile.inbox_file_source.file_format.key}
            size={10}
          />
          {inboxFile.status === 'filed' && (
            <CheckCircleIcon
              className="absolute top-0 right-0 block h-3.5 w-3.5 rounded-full ring-2 ring-white text-green-500 bg-white"
              aria-hidden="true"
            />
          )}
        </span>
      )}
      paddingHorizontal={6}
      paddingVertical={5}
      onClick={handleClick}
      selected={
        selectedInboxFileId != null && selectedInboxFileId === inboxFileId
      }
    />
  ) : null;
}

InboxFileListItem.propTypes = {
  inboxFileId: PropTypes.string.isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default InboxFileListItem;
