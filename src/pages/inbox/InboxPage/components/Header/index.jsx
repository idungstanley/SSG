import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CogIcon,
  TrashIcon,
  MailOpenIcon,
  ChatIcon,
} from '@heroicons/react/solid';
import { UploadIcon } from '@heroicons/react/outline';
import SelectInboxMenu from './SelectInboxMenu';
import { Button } from '../../../../../components';
import BlackListEmails from '../BlackListEmails';
import { useRestoreOrDeleteInbox } from '../../../../../features/inbox/inboxesService';
import MinMenuForResponsible from './MinMenuForResponsible';
import Comments from '../Comments';
import { setShowUploadModal } from '../../../../../features/general/uploadFile/uploadFileSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inboxId } = useParams();
  const [showEmailsModal, setShowEmailsModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const upload = () => {
    dispatch(setShowUploadModal(true));
  };

  const goToSettings = () => {
    navigate(`/inbox/${inboxId}/settings`);
  };

  const { mutate: deleteInbox } = useRestoreOrDeleteInbox();

  const handleDelete = () => {
    deleteInbox({
      inboxId,
      isDeleted: false,
    });
    navigate('/inbox');
  };

  const menuItems = [
    {
      buttonStyle: 'white',
      label: 'Blacklist',
      onClick: () => setShowEmailsModal((prev) => !prev),
      icon: (
        <MailOpenIcon
          className="mr-2.5 h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
      ),
    },
    {
      buttonStyle: 'white',
      label: 'Comments',
      onClick: () => setShowCommentsModal((prev) => !prev),
      icon: (
        <ChatIcon className="mr-2.5 h-5 w-5 text-gray-500" aria-hidden="true" />
      ),
    },
    {
      buttonStyle: 'white',
      label: 'Upload',
      onClick: upload,
      icon: (
        <UploadIcon
          className="mr-2.5 h-5 w-5 text-gray-500"
          aria-hidden="true"
        />
      ),
    },
    {
      buttonStyle: 'white',
      label: 'Settings',
      onClick: goToSettings,
      icon: (
        <CogIcon className="mr-2.5 h-5 w-5 text-gray-500" aria-hidden="true" />
      ),
    },
    {
      buttonStyle: 'danger',
      label: 'Delete',
      onClick: handleDelete,
      icon: (
        <TrashIcon className="mr-2.5 h-5 w-5 text-white" aria-hidden="true" />
      ),
    },
  ];

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
        <MinMenuForResponsible />
        {menuItems.map((i) => (
          <Button
            key={i.label}
            buttonStyle={i.buttonStyle}
            label={i.label}
            onClick={i.onClick}
            icon={i.icon}
            iconPosition="center"
            ringOnFocus
          />
        ))}

        {showCommentsModal ? (
          <Comments setShowModal={setShowCommentsModal} />
        ) : null}

        {showEmailsModal ? (
          <BlackListEmails setShowModal={setShowEmailsModal} />
        ) : null}
      </div>
    </div>
  );
}

export default Header;
