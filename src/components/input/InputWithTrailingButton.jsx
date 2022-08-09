import React from 'react';
import PropTypes from 'prop-types';

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
}) {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="flex rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            name={name}
            id={name}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300 placeholder-gray-400"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
        <button
          type="button"
          onClick={buttonOnClick}
          className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
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

InputWithTrailingButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  buttonInner: PropTypes.string.isRequired,
  buttonOnClick: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
};
