import React from 'react';
import Input from '../../input/Input';

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
    <form onSubmit={(e) => sendMessage(e)}>
      <Input
        name="message"
        value={message}
        placeholder="enter chat name:"
        onChange={(e) => setMessage(e.target.value)}
      />
      {/* <button
    type="submit"
    className="inline-flex w-full items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    Create
  </button> */}
    </form>
  );
}
