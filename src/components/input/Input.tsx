import React from 'react';

interface InputDataTypes {
  label?: string;
  placeholder?: string;
  hint?: string;
  name: string;
  cornerHint?: string;
  type?: string;
  autoComplete?: string;
  value?: string;
  leadingIcon?: string | JSX.Element;
  trailingIcon?: string | JSX.Element;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  trailingClick?: () => void;
  bgColor?: string;
  borderRadius?: string;
}
function Input({
  label,
  placeholder,
  hint,
  cornerHint,
  name,
  type = 'text',
  autoComplete,
  value,
  onChange,
  leadingIcon,
  trailingIcon,
  trailingClick,
  bgColor,
  borderRadius
}: InputDataTypes) {
  const handleTrailingIconClick = () => {
    if (trailingClick) {
      trailingClick();
    }
  };
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <label htmlFor={name} className="block text-sm text-gray-700">
            {label}
          </label>
          {cornerHint && <span className="text-sm text-gray-500">{cornerHint}</span>}
        </div>
      )}
      <div className="relative">
        {leadingIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-1.5 pointer-events-none">{leadingIcon}</div>
        )}

        <input
          type={type}
          id={name}
          name={name}
          autoComplete={autoComplete}
          className={`appearance-none block w-full px-3  ${leadingIcon && 'pl-8'} ${
            trailingIcon && 'pr-10'
          } border border-gray-300 ${
            borderRadius ? borderRadius : name === 'search' && !borderRadius ? 'rounded-md py-0.5' : 'rounded-md py-2'
          } shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${bgColor}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ fontSize: '13px' }}
        />

        {trailingIcon && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={handleTrailingIconClick}
          >
            {trailingIcon}
          </div>
        )}
      </div>
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
    </div>
  );
}

export default Input;
