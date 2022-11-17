import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CogIcon } from '@heroicons/react/solid';
import { UploadIcon } from '@heroicons/react/outline';
import SelectInboxMenu from './SelectInboxMenu';
import { setShowUploadModal } from '../../../../../features/inbox/inboxSlice';
import { Button } from '../../../../../components';
import { deleteInbox } from '../../../../../features/inbox/inboxesService';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inboxId } = useParams();
  const queryClient = useQueryClient();

  const upload = () => {
    dispatch(setShowUploadModal(true));
  };

  const goToSettings = () => {
    navigate(`/inbox/${inboxId}/settings`);
  };

  const deleteMutation = useMutation(deleteInbox, {
    onSuccess: () => {
      queryClient.invalidateQueries(['inboxes']);
      // eslint-disable-next-line no-console
      console.log('deleted');
    },
  });

  const handleDelete = async () => {
    await deleteMutation.mutateAsync({
      id: inboxId,
    });
    navigate('/inbox');
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
          onClick={upload}
          icon={<UploadIcon className="mr-2.5 h-5 w-5 text-gray-500" aria-hidden="true" />}
          iconPosition="center"
          disabled={false}
          ringOnFocus
        />

        <Button
          buttonStyle="white"
          label="Inbox settings"
          onClick={goToSettings}
          icon={<CogIcon className="mr-2.5 h-5 w-5 text-gray-500" aria-hidden="true" />}
          iconPosition="center"
          disabled={false}
          ringOnFocus
          width="w-44"
        />

        <Button
          buttonStyle="danger"
          label="Delete inbox"
          onClick={handleDelete}
          icon={<CogIcon className="mr-2.5 h-5 w-5 text-gray-500" aria-hidden="true" />}
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
