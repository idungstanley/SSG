import { useState } from 'react';

interface InputProps {
  initialValue?: number;
  onChange: (i: number) => void;
}

export function Input({ initialValue, onChange }: InputProps) {
  const [count, setCount] = useState(initialValue ?? 1);

  return (
    <input
      className="block text-center w-10 appearance-none rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
      maxLength={3}
      type="text"
      value={count}
      onChange={(e) => {
        const value = Number(e.target.value);
        setCount(value);
        onChange(value);
      }}
      placeholder="#"
    />
  );
}
