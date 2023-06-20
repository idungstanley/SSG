import { useState } from 'react';
import DatePicker from '../../../../../../Pilot/components/details/properties/subDetailsIndex/components/DatePicker';

interface DateProps {
  value: string;
  onChange: (i: string) => void;
}

export function Date({ value, onChange }: DateProps) {
  const [showDataPicker, setShowDatePicker] = useState(false);

  return (
    <button
      onClick={() => setShowDatePicker((prev) => !prev)}
      className="relative whitespace-nowrap block text-center appearance-none rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
    >
      {value}
      {showDataPicker ? <DatePicker initialDate={value} onChange={onChange} /> : null}
    </button>
  );
}
