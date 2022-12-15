import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import {
  useCreateItemComment,
  useDeleteItemComment,
  useEditItemComment,
  useGetItemComments,
} from '../../features/general/multiRequests';
import { Spinner } from '../../common';
import OneThirdScreenMessage from '../CenterMessage/OneThirdScreenMessage';

export default function Comments({ itemId, type }) {
  const [message, setMessage] = useState('');
  const isInbox = type === 'inbox' || 'inbox_file';
  const [showWindow, setShowWindow] = useState(isInbox);
  const [editId, setEditId] = useState(null);

  const { mutate: sendComment } = useCreateItemComment(itemId);
  const { mutate: editComment } = useEditItemComment(itemId);
  const { mutate: deleteComment } = useDeleteItemComment(itemId);
  const { status, data } = useGetItemComments({
    type,
    id: itemId,
  });

  const comments = data?.data?.comments;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.length > 2) {
      if (editId) {
        editComment({
          id: editId,
          message,
        });
        setEditId(null);
      } else {
        sendComment({
          message,
          type,
          id: itemId,
        });
      }

      setMessage('');
    }
  };

  const handleDelete = (id) => {
    deleteComment({
      id,
    });
  };

  const handleEdit = (id, value) => {
    setMessage(value);
    setEditId(id);
  };

  return (
    <div className="relative inset-0 flex h-full overflow-hidden flex-col">
      {!isInbox ? (
        <button
          type="button"
          onClick={() => setShowWindow((prev) => !prev)}
          className="text-left my-3 text-gray-600 underline cursor-pointer"
        >
          {showWindow ? 'Hide Comments' : 'Show Comments'}
        </button>
      ) : null}

      {showWindow ? (
        <div className="w-full overflow-y-scroll h-full flex-1 space-y-3">
          <form onSubmit={(e) => handleSubmit(e)} className="relative">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base pr-12"
              placeholder="Enter comment"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
                message.length > 2 ? 'stroke-current text-indigo-600' : null
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
              <ul className="divide-y divide-gray-200">
                {comments.map((i) => (
                  <li key={i.id} className="py-4 flex justify-between">
                    <p className="pl-1">{i.message}</p>
                    <div className="flex gap-3">
                      {i.can_modify ? (
                        <PencilIcon
                          onClick={() => handleEdit(i.id, i.message)}
                          className="w-6 h-6 text-gray-300 cursor-pointer hover:text-indigo-500 transition-all duration-300"
                        />
                      ) : null}
                      <TrashIcon
                        onClick={() => handleDelete(i.id)}
                        className="w-6 h-6 text-gray-300 cursor-pointer hover:text-red-500 transition-all duration-300"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <OneThirdScreenMessage
                title="No messages yes."
                description="Create one."
              />
            )
          ) : (
            <OneThirdScreenMessage
              title="Oops, an error occurred :("
              description="Please try again later."
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

Comments.propTypes = {
  itemId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
