import React from 'react';
import { palette } from '../../../utils/Colors';
import { ListColourProps } from '../../tasks/ListItem';
import { cl } from '../../../utils';
import DefaultColour from '../../../assets/icons/DefaultColour';
import { useAppSelector } from '../../../app/hooks';

interface PaletteProps {
  handleClick: (value: string | null | ListColourProps) => void;
  activeColor?: string;
}

export default function ColorPalette({ handleClick, activeColor }: PaletteProps) {
  const { colourPaletteData } = useAppSelector((state) => state.account);

  const style = {
    height: '20px',
    width: '20px'
  };

  const colorBoxes = colourPaletteData.map((c) => (
    <div
      key={c.id}
      className={cl(activeColor === c.color ? 'border rounded-md flex items-center justify-center' : '', 'w-6 h-6')}
      style={{ borderColor: activeColor === c.color ? `${c.color}` : '' }}
      onClick={() => handleClick(c.color)}
    >
      {c.color === null ? (
        <DefaultColour />
      ) : (
        <div style={{ backgroundColor: `${c.color}`, ...style }} className="rounded-md"></div>
      )}
    </div>
  ));

  return (
    <button type="button" className="grid grid-cols-8 gap-3.5 p-2 font-semibold bg-white w-full rounded">
      {colorBoxes}
    </button>
  );
}
