import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  setChecked: (i: boolean) => void;
}

export function Checkbox({ checked, setChecked, ...props }: CheckboxProps) {
  return (
    <input
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      type="checkbox"
      className="h-4 w-4 rounded-md border-gray-300 focus:ring-gray-500 cursor-pointer"
      {...props}
    />
  );
}
