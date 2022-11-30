/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react';
import { useSelector } from 'react-redux';
import { TrashIcon } from '@heroicons/react/solid';
import {
  useDeleteEmailFromList,
  useGetEmailList,
} from '../../../../../features/inbox/inboxesService';
import { Spinner } from '../../../../../common';
import FullScreenMessage from '../../../../shared/components/FullScreenMessage';

export default function EmailList() {
  const { currentInboxId } = useSelector((state) => state.inbox);
  const { data, status } = useGetEmailList(currentInboxId);
  const { mutate: deleteEmail } = useDeleteEmailFromList(currentInboxId);
  const list = data?.data.list;

  const handleDelete = (emailId) => {
    deleteEmail({
      inboxId: currentInboxId,
      emailId,
    });
  };

  return status === 'loading' ? (
    <div className="mx-auto mt-3 mb-6 w-6 justify-center">
      <Spinner size={22} color="#0F70B7" />
    </div>
  ) : status === 'success' ? (
    list?.length ? (
      <ul role="list" className="divide-y divide-gray-200 border-t">
        {list.map((i) => (
          <li key={i.id} className="py-4 flex justify-between">
            <p className="pl-1">{i.email}</p>
            <TrashIcon
              onClick={() => handleDelete(i.id)}
              className="w-6 h-6 text-gray-300 cursor-pointer hover:text-red-500 transition-all duration-300"
            />
          </li>
        ))}
      </ul>
    ) : (
      <FullScreenMessage title="No emails yes." description="Create one." />
    )
  ) : (
    <FullScreenMessage
      title="Oops, an error occurred :("
      description="Please try again later."
    />
  );
}
