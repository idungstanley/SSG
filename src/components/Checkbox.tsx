import React from 'react';
import Spinner from '../common/Spinner';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  name?: string;
  height: string;
  width: string;
  loading: boolean;
  disabled: boolean;
  spinnerSize: number;
  label?: string | null;
  description?: string | null;
}

function Checkbox({
  checked = false,
  onChange,
  height = 'h-6',
  width = 'w-6',
  loading = false,
  disabled = false,
  spinnerSize = 20,
  name,
  label,
  description,
}: CheckboxProps) {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center">
        {loading ? (
          <div>
            <Spinner size={spinnerSize < 10 ? spinnerSize : 8} color="#4f46e5" />
          </div>
        ) : (
          <input
            type="checkbox"
            name={name}
            id={name}
            onChange={onChange}
            checked={checked}
            disabled={disabled || loading}
            className={`focus:ring-primary-500 ${height} ${width} text-primary-600 border-gray-300 rounded ${
              disabled && 'opacity-50 bg-gray-100'
            }`}
          />
        )}
      </div>

      {label && description === null && (
        <label
          htmlFor="remember-me"
          className="ml-2 -mt-0.5 block text-sm text-gray-900"
        >
          {label}
        </label>
      )}

      {label && description && (
        <div className="ml-2 text-sm -mt-0.2">
          <label htmlFor={name} className="font-medium text-gray-900">
            {label}
          </label>
          {description && <p className="text-gray-500">{description}</p>}
        </div>
      )}
    </div>
  );
}

export default Checkbox;
