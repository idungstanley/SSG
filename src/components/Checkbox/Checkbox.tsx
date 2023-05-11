import { InputHTMLAttributes } from 'react';
import { cl } from '../../utils';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  setChecked: (i: boolean) => void;
  styles?: string;
}

export function Checkbox({ setChecked, styles, ...props }: CheckboxProps) {
  return (
    <input
      onChange={(e) => setChecked(e.target.checked)}
      type="checkbox"
      className={cl('mx-auto h-4 w-4 rounded-md border-gray-300 cursor-pointer', styles)}
      {...props}
    />
  );
}
