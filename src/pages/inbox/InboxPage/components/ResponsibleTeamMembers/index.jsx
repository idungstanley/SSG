import { UserIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../../../../components';
import { useGetInboxFile } from '../../../../../features/inbox/inboxService';
import Modal from './Modal';

export default function ResponsibleTeamMembers() {
  // TODO: add modal with selection team member dropdown, list all members and removing members
  // * seelct team members from reusable component
  // * list all items as list blacklist emails

  const [showModal, setShowModal] = useState(false);
  const selectedInboxFileId = useSelector(
    (state) => state.inbox.selectedInboxFileId,
  );
  const { data: inboxFile } = useGetInboxFile(selectedInboxFileId);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  return inboxFile ? (
    <>
      {showModal ? <Modal setShowModal={setShowModal} /> : null}
      <Button
        buttonStyle="white"
        label="Responsible members"
        onClick={handleClick}
        icon={(
          <UserIcon
            className="mr-2.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        )}
        iconPosition="center"
        disabled={false}
        roundedLeft={false}
        roundedRight={false}
        borderRight={false}
        ringOnFocus
        width="w-52"
      />
    </>
  ) : null;
}
