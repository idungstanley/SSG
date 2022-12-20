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

export default function Comments({ itemId, type }) {
  const [message, setMessage] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const isInbox = type === 'inbox' || type === 'inbox_file';

  const [showWindow, setShowWindow] = useState(isInbox);
  const [editId, setEditId] = useState(null);

  const { mutate: sendComment } = useCreateItemComment(itemId);
  const { mutate: editComment } = useEditItemComment(itemId);
  const { mutate: deleteComment } = useDeleteItemComment(itemId);
  const { status, comments } = useGetItemComments({
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
        sendComment({
          message,
          type,
          id: itemId,
        });
      }

      setMessage('');
    }
  };

  const onDelete = (id) => {
    deleteComment({
      id,
    });
  };

  const onEdit = (id, value) => {
    setMessage(value);
    setEditId(id);
  };

  const onChange = (e) => {
    setMessage(e.target.value);

    if (e.target.value.at(-1) === '@' || e.target.selectionStart === '@') {
      setShowDropdown(true);
    } else if (showDropdown) {
      setShowDropdown(false);
    }

    // const regex = /@[\S]+/g;
    // const config = [];

    // message
    //   .split(' ')
    //   .map((i) => config.push({ word: i, isMatch: !!i.match(regex) }));

    console.log(e.target.selectionStart, e.target.value.length);
  };

  const setUsers = (user) => {
    console.log(selectedUserIds);
    setSelectedUserIds((prev) => [...prev, user.id]);
    setMessage((prev) => prev + user.name);
    setShowDropdown(false);
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
            handleSubmit={handleSubmit}
            onChange={onChange}
            message={message}
            showDropdown={showDropdown}
            setUsers={setUsers}
          />
          <List
            status={status}
            comments={comments}
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
