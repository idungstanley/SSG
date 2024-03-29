import React, { useRef, useState } from 'react';
import {
  useCreateItemComment,
  useDeleteItemComment,
  useEditItemComment,
  useGetItemComments
} from '../../features/general/comments/commentsService';
import Form from './components/Form';
import List from './components/List';
import Dropdown from './components/Dropdown';
import { selectedUserType } from './components/componentType';
import { mentionTeamMemberInMessageReg } from '../../regex';
import { useAppSelector } from '../../app/hooks';

export default function CommentsForPilot() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const messageRef = useRef<HTMLInputElement>(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<selectedUserType[]>([]);

  const [editId, setEditId] = useState<null | string>(null);

  const { mutate: sendComment } = useCreateItemComment(activeItemId);
  const { mutate: editComment } = useEditItemComment(activeItemId);
  const { mutate: deleteComment } = useDeleteItemComment(activeItemId);

  const { status, data } = useGetItemComments({
    type: activeItemType as string,
    id: activeItemId
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();

    if (messageRef.current && messageRef.current.value.length > 2) {
      const message = messageRef.current.value;

      if (editId) {
        editComment({
          id: editId,
          message
        });
        setEditId(null);
      } else {
        const messageWithUserIds = `${message} ${selectedUsers.map((user) => `@[${user.id}] `)}`;

        sendComment({
          message: messageWithUserIds,
          type: activeItemType || 'file',
          id: activeItemId || ''
        });

        messageRef.current.value = '';
      }

      setSelectedUsers([]);
    }
  };

  const onDelete = (id: string) => {
    deleteComment({
      id
    });
  };

  const onEdit = (id: string, value: string, user: selectedUserType[]) => {
    if (messageRef.current) {
      messageRef.current.value = value.replaceAll(mentionTeamMemberInMessageReg, '');
    }
    setEditId(id);
    setSelectedUsers([...user]);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <Form messageRef={messageRef} handleSubmit={handleSubmit} setShowDropdown={setShowDropdown} />
        <Dropdown
          show={showDropdown}
          setShowDropdown={setShowDropdown}
          setSelectedUsers={setSelectedUsers}
          selectedUsers={selectedUsers}
        />
        <List status={status} comments={data} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </>
  );
}
