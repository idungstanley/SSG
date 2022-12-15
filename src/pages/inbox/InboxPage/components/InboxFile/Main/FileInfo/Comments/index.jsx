import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TrashIcon, PencilIcon } from '@heroicons/react/solid';
import { Spinner } from '../../../../../../../../common';
import {
  useCreateItemComment,
  useDeleteItemComment,
  useEditItemComment,
  useGetItemComments,
} from '../../../../../../../../features/general/multiRequests';
import FullScreenMessage from '../../../../../../../shared/components/FullScreenMessage';

function Comments() {
  const fileId = useSelector((state) => state.inbox.selectedInboxFileId);
  const [value, setValue] = useState('');
  const [editId, setEditId] = useState(null);

  const { mutate: sendComment } = useCreateItemComment(fileId);
  const { mutate: editComment } = useEditItemComment(fileId);
  const { mutate: deleteComment } = useDeleteItemComment(fileId);
  const { status, data } = useGetItemComments({
    type: 'inbox_file',
    id: fileId,
  });
  const comments = data?.data?.comments;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.length > 2) {
      if (editId) {
        editComment({
          id: editId,
          message: value,
        });
        setEditId(null);
      } else {
        sendComment({
          message: value,
          type: 'inbox_file',
          id: fileId,
        });
      }

      setValue('');
    }
  };

  const handleDelete = (id) => {
    deleteComment({
      id,
    });
  };

  const handleEdit = (id, message) => {
    setValue(message);
    setEditId(id);
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
