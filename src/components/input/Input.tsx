import React from 'react';


interface InputDataTypes {
  label: string ;
  placeholder: string ;
  hint: string;
  name: string;
  cornerHint: string;
  type: string;
  autoComplete: string;
  value: string;
  leadingIcon: string;
  trailingIcon: string;
  onChange: ()=> void;
}
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
}: InputDataTypes) {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
          {cornerHint && <span className="text-sm text-gray-500">{cornerHint}</span>}
        </div>
      )}
      <div className="relative">

        {leadingIcon && <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{leadingIcon}</div>}

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

        {trailingIcon && <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">{trailingIcon}</div>}

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

export default Input;
