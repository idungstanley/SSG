import React from 'react';
import Input from '../../input/Input';
import { AiOutlineSend } from 'react-icons/ai';

interface CreateMessageProps {
  message: string;
  setMessage: (i: string) => void;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function CreateMessage({
  message,
  sendMessage,
  setMessage,
}: CreateMessageProps) {
  return (
    <form className="flex gap-3 items-center" onSubmit={(e) => sendMessage(e)}>
      <Input
        name="message"
        value={message}
        placeholder="enter chat name:"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="inline-flex items-center cursor-pointer"
      >
        <AiOutlineSend
          className="h-6 w-6 stroke-current text-indigo-600 inline-block"
          aria-hidden="true"
        />
      </button>
    </form>
  );
}
