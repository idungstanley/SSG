import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';

function Checkbox({
  checked,
  onChange,
  height,
  width,
  loading,
  disabled,
  spinnerSize,
  name,
  label,
  description,
}) {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center">
        {loading ? (
          <div className="-mt-2">
            <Spinner size={spinnerSize} color="#FC6061" />
          </div>
        ) : (
          <input
            type="checkbox"
            name={name}
            id={name}
            onChange={onChange}
            checked={checked}
            disabled={disabled || loading}
            className={`focus:ring-primary-500 ${height} ${width} text-primary-600 border-gray-300 rounded ${disabled && 'opacity-50 bg-gray-100'}`}
          />
        )}
      </div>

      {label && description === null && (
        <label htmlFor="remember-me" className="ml-2 -mt-0.5 block text-sm text-gray-900">{label}</label>
      )}

      {label && description && (
        <div className="ml-2 text-sm -mt-0.2">
          <label htmlFor={name} className="font-medium text-gray-900">{label}</label>
          {description && <p className="text-gray-500">{description}</p>}
        </div>
      )}
    </div>
  );
}

Checkbox.defaultProps = {
  loading: false,
  disabled: false,
  spinnerSize: 20,
  label: null,
  description: null,
  checked: false,
  height: 'h-6',
  width: 'w-6',
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  spinnerSize: PropTypes.number,
  label: PropTypes.string,
  description: PropTypes.string,
};

export default Checkbox;
