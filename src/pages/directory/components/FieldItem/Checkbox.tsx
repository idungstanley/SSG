import React from 'react';

interface CheckboxProps {
  disabled: boolean;
  checked: boolean;
  setChecked: (i: boolean) => void;
  label: string;
}

export default function Checkbox({
  disabled,
  checked,
  setChecked,
  label,
}: CheckboxProps) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <input
          disabled={disabled}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          id={label}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
      </div>

      <label htmlFor={label} className="font-medium text-gray-700 ml-3 text-sm">
        {label}
      </label>
    </div>
  );
}
