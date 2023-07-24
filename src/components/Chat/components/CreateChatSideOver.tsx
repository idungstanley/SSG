import React, { useState } from 'react';
import Input from '../../input/Input';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useCreateChat } from '../../../features/chat/chatService';
import { setShowCreateChatSideOver } from '../../../features/chat/chatSlice';
import SideOver from '../../SideOver';

export default function CreateChatSideOver() {
  const dispatch = useAppDispatch();
  const { showCreateChatSideOver } = useAppSelector((state) => state.chat);
  const [name, setName] = useState('');
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { type, id } = pilotSideOver;

  const { mutate: onCreate } = useCreateChat(id);

  const onClose = () => {
    dispatch(setShowCreateChatSideOver(false));
    setName('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id && type) {
      onCreate({ id, type, name });
    }
    onClose();
  };

  return (
    <SideOver show={showCreateChatSideOver} onClose={onClose} title="Create new Chat">
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5 px-4 sm:px-6">
        <Input name="name" value={name} placeholder="enter chat name:" onChange={(e) => setName(e.target.value)} />
        <button
          type="submit"
          className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none ring-0 focus:ring-0"
        >
          Create
        </button>
      </form>
    </SideOver>
  );
}
