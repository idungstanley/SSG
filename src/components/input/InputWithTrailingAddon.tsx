import React from 'react';

interface inputWithTrailingAddonTypes {
  label: string;
  icon: string;
  addOn: string;
  placeholder: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint: string;
  cornerHint: string;
}
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
}: inputWithTrailingAddonTypes) {
  return (
    <div>
      {label && (
        <div className="flex justify-between mb-1">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          {cornerHint && (
            <span className="text-sm text-gray-500">{cornerHint}</span>
          )}
        </div>
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
            className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full placeholder-gray-400 rounded-none rounded-l-md ${
              icon && 'pl-10'
            } sm:text-sm border-gray-300`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
        <span className="inline-flex items-center px-3 text-gray-500 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 sm:text-sm">
          {addOn}
        </span>
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
