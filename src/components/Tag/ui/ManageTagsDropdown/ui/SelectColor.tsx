import React from 'react';
import { cl } from '../../../../../utils';
import { colors } from '../../../../tags/colors';

interface SelectProps {
  color: string;
  onClick: (color: string) => void;
}

export function SelectColor({ color, onClick }: SelectProps) {
  return (
    <div className="flex flex-wrap items-center text-teal- space-x-3 left-0 h-fit p-2 mt-2 w-48">
      {colors.map((i, index) => (
        <div key={index}>
          <button
            onClick={() => onClick(i.value)}
            className={cl(
              `bg-${i}-700`,
              'rounded-md cursor-pointer block m-1 p-2 text-sm ',
              i.value === color ? 'h-5 w-5' : 'h-4 w-4'
            )}
            style={{ backgroundColor: i.value }}
          ></button>
        </div>
      ))}
    </div>
  );
}
