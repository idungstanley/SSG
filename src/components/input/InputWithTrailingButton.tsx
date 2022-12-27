import React from 'react';
import PropTypes from 'prop-types';

interface inputWithTrailingButtonType {
  label: string;
  icon: string;
  buttonInner: string;
  buttonOnClick: () => void;
  placeholder: string;
  name: string;
  type: string;
  value: string;
  onChange: () => void;
}

export default function InputWithTrailingButton({
  label,
  icon,
  buttonInner,
  buttonOnClick,
  placeholder,
  name,
  type,
  value,
  onChange,
}: inputWithTrailingButtonType) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="flex rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            name={name}
            id={name}
            className="block w-full pl-10 placeholder-gray-400 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-md sm:text-sm"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
        <button
          type="button"
          onClick={buttonOnClick}
          className="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {buttonInner}
        </button>
      </div>
    </div>
  );
}

InputWithTrailingButton.defaultProps = {
  label: null,
  icon: null,
  placeholder: null,
  type: 'text',
};
