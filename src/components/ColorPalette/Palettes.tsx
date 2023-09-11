import React from 'react';
import { palette } from '../../utils/Colors';
import { ListColourProps } from '../tasks/ListItem';
import DefaultColour from '../../assets/icons/DefaultColour';

interface PaletteProps {
  handleClick: (value: string | ListColourProps | null) => void;
}

export default function Palletes({ handleClick }: PaletteProps) {
  const colorBoxes = [null, ...palette].map((c) => (
    <div className="w-5 h-5 flex justify-center items-center hover:border" key={c} onClick={() => handleClick(c)}>
      {c === null ? (
        <DefaultColour />
      ) : (
        <button style={{ backgroundColor: `${c}`, borderRadius: '2px' }} className="w-4 h-4 border"></button>
      )}
    </div>
  ));
  return (
    <button type="button" className="w-full flex flex-wrap gap-3 my-2">
      {colorBoxes}
    </button>
  );
}
