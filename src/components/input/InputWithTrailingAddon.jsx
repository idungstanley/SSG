import React from 'react';
import PropTypes from 'prop-types';

export default function InputWithTrailingAddon({
  label,
  icon,
  addOn,
  placeholder,
  name,
  type,
  value,
  onChange,
  hint,
  cornerHint,
}) {
  return (
    <div>
      {label && (
        <div className="flex justify-between mb-1">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
          {cornerHint && <span className="text-sm text-gray-500">{cornerHint}</span>}
        </div>
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
            className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full placeholder-gray-400 rounded-none rounded-l-md ${icon && 'pl-10'} sm:text-sm border-gray-300`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
        <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">{addOn}</span>
      </div>
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
    </div>
  );
}

InputWithTrailingAddon.defaultProps = {
  label: null,
  icon: null,
  placeholder: null,
  type: 'text',
  hint: null,
  cornerHint: null,
};

InputWithTrailingAddon.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  addOn: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  hint: PropTypes.string,
  cornerHint: PropTypes.string,
};
