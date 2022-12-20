/* eslint-disable react/no-array-index-key */
import React from 'react';
import { PropTypes } from 'prop-types';
import Dropdown from './Dropdown';

export default function Form({
  handleSubmit,
  onChange,
  message,
  showDropdown,
  setUsers,
}) {
  const regex = /@[\S]+/g;
  const config = [];
  message
    .split(' ')
    .map((i) => config.push({ word: i, isMatch: !!i.match(regex) }));

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="relative">
      <input
        type="text"
        className="block w-full rounded-md text-white caret-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base pr-12"
        placeholder="Enter comment"
        value={message}
        onChange={(e) => onChange(e)}
      />
      <div className="absolute top-2.5 left-3">
        {config.map((word, index) => (
          <span
            className={`${word.isMatch ? 'text-primary-700' : ''}`}
            key={index}
          >
            {`${word.word} `}
          </span>
        ))}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        type="submit"
        onClick={(e) => handleSubmit(e)}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-6 h-6 absolute top-2 right-2 cursor-pointer transition-all duration-300 ${
          message.length > 2 ? 'stroke-current text-indigo-600' : null
        } stroke-current hover:text-indigo-600 `}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        />
      </svg>
      <Dropdown show={showDropdown} setUsers={setUsers} />
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  setUsers: PropTypes.func.isRequired,
};
