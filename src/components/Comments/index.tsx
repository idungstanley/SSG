import React, { useState } from 'react';
import {
  useCreateItemComment,
  useDeleteItemComment,
  useEditItemComment,
  useGetItemComments,
} from '../../features/general/multiRequests';
import Form from './components/Form';
import List from './components/List';
import Dropdown from './components/Dropdown';

const regex = /@[\S]*/g;

interface commentsType {
  itemId: string;
  type: string;
}

interface userType {
  id: string;
}

let onEdit: (id: string, value: string, user: userType[]) => void;

export default function Comments({ itemId, type }: commentsType) {
  const [message, setMessage] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<userType[]>([]);
  const isInbox = type === 'inbox' || type === 'inbox_file';
  const [showWindow, setShowWindow] = useState(isInbox);
  const [editId, setEditId] = useState<null | string>(null)
  const { mutate: sendComment } = useCreateItemComment(itemId);
  const { mutate: editComment } = useEditItemComment(itemId);
  const { mutate: deleteComment } = useDeleteItemComment(itemId);
  const { status, data } = useGetItemComments({
    type,
    id: itemId,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (message.length > 2) {
      if (editId) {
        editComment({
          id: editId,
          message,
        })
        setEditId(null)
      } else {
        const messageWithUserIds = `${message} ${selectedUsers.map(
          (user) => `@[${user.id}] `
        )}`

        sendComment({
          message: messageWithUserIds,
          type,
          id: itemId,
        })
      }
      setMessage('')
      setSelectedUsers([])
    }
  }

  const onDelete = (id: string) => {
    deleteComment({
      id,
    });
  };

  onEdit = (id, value, users) => {
    setMessage(value.replaceAll(regex, ''));
    setEditId(id);
    setSelectedUsers([...users]);
  };

  return (
    <div className="relative inset-0 flex flex-col h-full overflow-hidden">
      {!isInbox ? (
        <button
          type="button"
          onClick={() => setShowWindow((prev) => !prev)}
          className="my-3 text-left text-gray-600 underline cursor-pointer"
        >
          {showWindow ? 'Hide Comments' : 'Show Comments'}
        </button>
      ) : null}

      {showWindow ? (
        <div className="flex-1 w-full h-full space-y-3 overflow-y-scroll">
          <Form
            setMessage={setMessage}
            handleSubmit={handleSubmit}
            message={message}
            setShowDropdown={setShowDropdown}
          />
          <Dropdown
            isInbox={isInbox}
            show={showDropdown}
            setShowDropdown={setShowDropdown}
            setSelectedUsers={setSelectedUsers}
            selectedUsers={selectedUsers}
          />
          <List
            status={status}
            comments={data}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ) : null}
    </div>
  );
}


