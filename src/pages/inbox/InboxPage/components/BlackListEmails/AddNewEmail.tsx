import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddEmailToList } from '../../../../../features/inbox/inboxService';

export default function AddNewEmail() {
  const [value, setValue] = useState('');
  const { inboxId } = useParams();
  const { mutate: addEmail } = useAddEmailToList(inboxId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addEmail({
      inboxId,
      email: value,
    });

    setValue('');
  };

  return (
    <form className="relative" onSubmit={(e) => handleSubmit(e)}>
      <label
        htmlFor="blacklist"
        className="block text-sm font-medium text-gray-600 mb-1 ml-1"
      >
        Add new email to blacklist
      </label>
      <div className="relative">
        <input
          id="blacklist"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-gray-300 focus:border-gray-300"
          type="email"
          placeholder="enter email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 absolute top-2 right-2 cursor-pointer transition-all duration-300 ${
              value.length ? 'stroke-current text-indigo-600' : ''
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
