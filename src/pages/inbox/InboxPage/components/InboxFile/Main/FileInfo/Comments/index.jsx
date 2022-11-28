/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TrashIcon } from '@heroicons/react/solid';
import { Spinner } from '../../../../../../../../common';
import {
  useDeleteInboxFileComment,
  useGetInboxFileComments,
  usePostInboxFileComment,
} from '../../../../../../../../features/inbox/inboxService';
import FullScreenMessage from '../../../../../../../shared/components/FullScreenMessage';

function Comments() {
  const fileId = useSelector((state) => state.inbox.selectedInboxFileId);
  const [value, setValue] = useState('');

  const { mutate: sendComment } = usePostInboxFileComment(fileId, value);
  const { mutate: deleteComment } = useDeleteInboxFileComment(fileId);
  const { status, data } = useGetInboxFileComments(fileId);
  const comments = data?.data?.comments;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.length > 2) {
      sendComment();
      setValue('');
    }
  };

  const handleDelete = (id) => {
    deleteComment({
      fileId,
      messageId: id,
    });
  };

  return (
    <div className="h-full flex-1">
      <div className="relative h-full">
        <div className="absolute inset-0 flex h-full overflow-hidden flex-col">
          <div className="w-full overflow-y-scroll flex-1 h-full p-6 space-y-6">
            <form onSubmit={(e) => handleSubmit(e)} className="relative">
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base pr-12"
                placeholder="Enter comment"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                type="submit"
                onClick={(e) => handleSubmit(e)}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 absolute top-2 right-2 cursor-pointer transition-all duration-300 ${
                  value.length > 2 ? 'stroke-current text-indigo-600' : null
                } stroke-current hover:text-indigo-600 `}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </form>

            {status === 'loading' ? (
              <div className="mx-auto mt-3 mb-6 w-6 justify-center">
                <Spinner size={22} color="#0F70B7" />
              </div>
            ) : status === 'success' ? (
              comments?.length ? (
                <ul role="list" className="divide-y divide-gray-200">
                  {comments.map((i) => (
                    <li key={i.id} className="py-4 flex justify-between">
                      <p className="pl-1">{i.message}</p>
                      <TrashIcon
                        onClick={() => handleDelete(i.id)}
                        className="w-6 h-6 text-gray-300 cursor-pointer hover:text-red-500 transition-all duration-300"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <FullScreenMessage
                  title="No messages yes."
                  description="Create one."
                />
              )
            ) : (
              <FullScreenMessage
                title="Oops, an error occurred :("
                description="Please try again later."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
