import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InboxIcon } from '@heroicons/react/solid';
import { UploadIcon } from '@heroicons/react/outline';
import SelectInboxMenu from './SelectInboxMenu';
import { Button } from '../../../../../components';

function Header() {
  const navigate = useNavigate();
  const { inboxId } = useParams();

  const goBackToInbox = () => {
    navigate(`/inbox/${inboxId}`);
  };

  return (
    <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 h-20">
      <div className="flex items-center">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate mr-5 inline-block align-middle">Inbox</h1>
        <div className="w-96 z-40">
          <SelectInboxMenu />
        </div>
      </div>

      <div className="flex lg:mt-0 lg:ml-4 space-x-3">
        <Button
          buttonStyle="white"
          label="Upload"
          onClick={() => ({})}
          icon={<UploadIcon className="mr-2.5 h-5 w-5 text-gray-500" aria-hidden="true" />}
          iconPosition="center"
          disabled
          ringOnFocus
        />

        <Button
          buttonStyle="white"
          label="Back to inbox"
          onClick={goBackToInbox}
          icon={<InboxIcon className="mr-2.5 h-5 w-5 text-gray-500" aria-hidden="true" />}
          iconPosition="center"
          disabled={false}
          ringOnFocus
          width="w-44"
        />
      </div>
    </div>
  );
}

export default Header;
