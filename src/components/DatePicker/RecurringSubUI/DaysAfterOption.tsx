import { Dispatch, SetStateAction } from 'react';
import { TypeOptionsProps } from '../RecurringTypes';

interface Props {
  setOptions: Dispatch<SetStateAction<TypeOptionsProps | undefined>>;
}

export function DaysAfterOption({ setOptions }: Props) {
  return (
    <div className="flex space-x-1.5 py-1.5 items-center">
      <input
        type="number"
        className="no-control-num-input text-alsoit-text-md w-10 px-1.5 py-0.5 rounded-md border-alsoit-gray-75 border"
        onChange={(e) => setOptions((prev) => ({ ...prev, after: e.target.value }))}
      />
      <span className="text-alsoit-text-md font-semibold">day(s) after completion</span>
    </div>
  );
}
