import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
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

export default function Comments({ itemId, type }) {
  const [message, setMessage] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const isInbox = type === 'inbox' || type === 'inbox_file';

  const [showWindow, setShowWindow] = useState(isInbox);
  const [editId, setEditId] = useState(null);

  const { mutate: sendComment } = useCreateItemComment(itemId);
  const { mutate: editComment } = useEditItemComment(itemId);
  const { mutate: deleteComment } = useDeleteItemComment(itemId);
  const { status, data } = useGetItemComments({
    type,
    id: itemId,
  });

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
        const messageWithUserIds = `${message} ${selectedUsers.map(
          (user) => `@[${user.id}] `,
        )}`;

        sendComment({
          message: messageWithUserIds,
          type,
          id: itemId,
        });
      }

      setMessage('');
      setSelectedUsers([]);
    }
  };

  const onDelete = (id) => {
    deleteComment({
      id,
    });
  };

  const onEdit = (id, value, users) => {
    setMessage(value.replaceAll(regex, ''));
    setEditId(id);
    setSelectedUsers([...users]);
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

Comments.propTypes = {
  itemId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
