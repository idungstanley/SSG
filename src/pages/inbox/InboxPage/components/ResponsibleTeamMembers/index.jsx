import { UserIcon } from '@heroicons/react/solid';
import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../../../../components';
import { useGetInboxFile } from '../../../../../features/inbox/inboxService';

export default function ResponsibleTeamMembers() {
  const selectedInboxFileId = useSelector(
    (state) => state.inbox.selectedInboxFileId,
  );
  const { data: inboxFile } = useGetInboxFile(selectedInboxFileId);

  const handleClick = () => {};

  return inboxFile ? (
    <Button
      buttonStyle="white"
      label="Responsible members"
      onClick={handleClick}
      icon={
        <UserIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
      }
      iconPosition="center"
      disabled={false}
      roundedLeft={false}
      roundedRight={false}
      borderRight={false}
      ringOnFocus
      width="w-52"
    />
  ) : null;
}
