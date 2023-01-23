import React, { useState } from 'react';
import {
  useCreateItemComment,
  useDeleteItemComment,
  useEditItemComment,
  useGetItemComments,
} from '../../features/general/commentsService';
import Form from './components/Form';
import List from './components/List';
import Dropdown from './components/Dropdown';
import { selectedUserType } from './components/componentType';
import { mentionTeamMemberInMessageReg } from '../../regex';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShowCommentsSideOver } from '../../features/general/slideOver/slideOverSlice';
import SideOver from '../SideOver';

export default function Comments() {
  const { commentsSideOver } = useAppSelector((state) => state.slideOver);
  const dispatch = useAppDispatch();
  const { type, id, show } = commentsSideOver;

  const [message, setMessage] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<selectedUserType[]>([]);
  const onClose = () => dispatch(setShowCommentsSideOver({ show: false }));

  const [editId, setEditId] = useState<null | string>(null);

  const { mutate: sendComment } = useCreateItemComment(id);
  const { mutate: editComment } = useEditItemComment(id);
  const { mutate: deleteComment } = useDeleteItemComment(id);

  const { status, data } = useGetItemComments({
    type,
    id,
  });

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
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
          (user) => `@[${user.id}] `
        )}`;

        sendComment({
          message: messageWithUserIds,
          type: type || 'file',
          id: id || '',
        });
      }
      setMessage('');
      setSelectedUsers([]);
    }
  };

  const onDelete = (id: string) => {
    deleteComment({
      id,
    });
  };

  const onEdit = (id: string, value: string, user: selectedUserType[]) => {
    setMessage(value.replaceAll(mentionTeamMemberInMessageReg, ''));
    setEditId(id);
    setSelectedUsers([...user]);
  };

  return (
    <SideOver show={show} onClose={onClose} title="Comments">
      <Form
        setMessage={setMessage}
        handleSubmit={handleSubmit}
        message={message}
        setShowDropdown={setShowDropdown}
      />
      <Dropdown
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
    </SideOver>
  );
}
