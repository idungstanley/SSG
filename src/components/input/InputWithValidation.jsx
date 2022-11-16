import React from 'react';
import PropTypes from 'prop-types';

const icons = [
  {
    path: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
  },
  {
    path: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
  },
  {
    path: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
  },
];

export default function InputWithValidation({
  id,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  message,
  isFocused,
}) {
  const label = placeholder.split(' ').at(-1);

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1 ml-1"
      >
        {label[0].toUpperCase() + label.slice(1)}
      </label>
      <div className="absolute top-8 left-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-5 h-5 stroke-current ${
            message ? 'text-red-700' : 'text-gray-400'
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              label === 'email'
                ? icons[1].path
                : label === 'password'
                  ? icons[0].path
                  : icons[2].path
            }
          />
        </svg>
      </div>

      <input
        className={`appearance-none block w-full px-3 py-2 pl-8 border ${
          message ? 'border-red-700' : 'border-gray-300'
        } rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:${
          message ? 'ring-red-700' : 'ring-gray-300'
        } focus:${message ? 'border-red-700' : 'border-gray-300'} sm:text-sm`}
        id={id}
        type={type}
        placeholder={
          placeholder
        }
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={isFocused}
      />
      <p className="block text-sm font-medium text-red-700 mt-1 h-5 ml-1">
        {message}
      </p>
    </div>
  );
}

InputWithValidation.defaultProps = {
  message: '',
  isFocused: false,
};

InputWithValidation.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  message: PropTypes.string,
  isFocused: PropTypes.bool,
};
