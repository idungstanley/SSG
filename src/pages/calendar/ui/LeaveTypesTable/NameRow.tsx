import { useEffect, useRef } from 'react';
import { cl } from '../../../../utils';

interface InputProps {
  defaultValue?: string;
  onBlur?: (i: string) => void;
  onChange?: (i: string) => void;
  disabled?: boolean;
}

export function NameRow({ defaultValue, onBlur, onChange, disabled }: InputProps) {
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.value = defaultValue ?? '';
    }
  }, [defaultValue]);

  const handleChange = () => {
    if (titleRef.current && onChange) {
      onChange(titleRef.current.value);
    }
  };

  const handleFocusOff = () => {
    if (titleRef.current && onBlur) {
      const value = titleRef.current.value;
      if (value.length > 2 && value !== defaultValue) {
        onBlur(titleRef.current.value);
      }
    }
  };

  return (
    <input
      onChange={handleChange}
      onBlur={handleFocusOff}
      required
      disabled={disabled}
      minLength={3}
      ref={titleRef}
      type="text"
      className={cl(
        'block bg-transparent focus:shadow-sm focus:ring-1 focus:ring-inset focus:ring-gray-300 w-fit rounded-md border-0 py-1.5 text-gray-900 text-sm leading-6'
      )}
      placeholder="New leave type..."
    />
  );
}
