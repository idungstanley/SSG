import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CogIcon, TrashIcon, MailOpenIcon, ArchiveIcon,
} from '@heroicons/react/solid';
import { UploadIcon } from '@heroicons/react/outline';
import SelectInboxMenu from './SelectInboxMenu';
import { setShowUploadModal } from '../../../../../features/inbox/inboxSlice';
import { Button } from '../../../../../components';
import { useRestoreOrDeletInbox } from '../../../../../features/inbox/inboxesService';
import BlackListEmails from '../BlackListEmails';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inboxId } = useParams();
  const [showEmailsModal, setShowEmailsModal] = useState(false);

  const upload = () => {
    dispatch(setShowUploadModal(true));
  };

  const goToSettings = () => {
    navigate(`/inbox/${inboxId}/settings`);
  };

  const { mutate: deleteInbox } = useRestoreOrDeletInbox();

  const handleDelete = () => {
    deleteInbox({
      inboxId,
      isDeleted: false,
    });
    navigate('/inbox');
  };

  return (
    <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 h-20">
      <div className="flex items-center">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate mr-5 inline-block align-middle">
          Inbox
        </h1>
        <div className="w-96 z-40">
          <SelectInboxMenu />
        </div>
      </div>

      <div className="relative flex lg:mt-0 lg:ml-4 space-x-3">
        <Button
          buttonStyle="white"
          label="Multiple archive"
          onClick={() => setShowEmailsModal(!showEmailsModal)}
          icon={(
            <ArchiveIcon
              className="mr-2.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          )}
          iconPosition="center"
          disabled={false}
          ringOnFocus
        />
        <Button
          buttonStyle="white"
          label="Black list emails"
          onClick={() => setShowEmailsModal(!showEmailsModal)}
          icon={(
            <MailOpenIcon
              className="mr-2.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          )}
          iconPosition="center"
          disabled={false}
          ringOnFocus
        />
        {showEmailsModal ? (
          <BlackListEmails setShowModal={setShowEmailsModal} />
        ) : null}
        <Button
          buttonStyle="white"
          label="Upload"
          onClick={upload}
          icon={(
            <UploadIcon
              className="mr-2.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          )}
          iconPosition="center"
          disabled={false}
          ringOnFocus
        />

        <Button
          buttonStyle="white"
          label="Inbox settings"
          onClick={goToSettings}
          icon={(
            <CogIcon
              className="mr-2.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          )}
          iconPosition="center"
          disabled={false}
          ringOnFocus
          width="w-44"
        />

        <Button
          buttonStyle="danger"
          label="Delete"
          onClick={handleDelete}
          icon={(
            <TrashIcon
              className="mr-2.5 h-5 w-5 text-white"
              aria-hidden="true"
            />
          )}
          iconPosition="center"
          disabled={false}
          ringOnFocus
        />
      </div>
    </div>
  );
}

export default Header;
