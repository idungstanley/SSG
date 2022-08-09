import React from 'react';
import PropTypes from 'prop-types';

function Input({
  label,
  placeholder,
  hint,
  cornerHint,
  name,
  type,
  autoComplete,
  value,
  onChange,
  leadingIcon,
  trailingIcon,
}) {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
          {cornerHint && <span className="text-sm text-gray-500">{cornerHint}</span>}
        </div>
      )}
      <div className="relative">

        {leadingIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{leadingIcon}</div>}

        <input
          type={type}
          id={name}
          name={name}
          autoComplete={autoComplete}
          className={`appearance-none block w-full px-3 py-2 ${leadingIcon && 'pl-10'} ${trailingIcon && 'pr-10'} border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {trailingIcon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{trailingIcon}</div>}

      </div>
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
    </div>
  );
}

Input.defaultProps = {
  label: null,
  placeholder: null,
  hint: null,
  cornerHint: null,
  type: 'text',
  autoComplete: null,
  value: null,
  leadingIcon: null,
  trailingIcon: null,
};

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  hint: PropTypes.string,
  cornerHint: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.string.isRequired,
  leadingIcon: PropTypes.string,
  trailingIcon: PropTypes.string,
};

export default Input;
