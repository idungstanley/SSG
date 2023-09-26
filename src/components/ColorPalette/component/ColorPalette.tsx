import React from 'react';
import { palette } from '../../../utils/Colors';
import { ListColourProps } from '../../tasks/ListItem';
import { cl } from '../../../utils';

interface PaletteProps {
  handleClick: (value: string | ListColourProps) => void;
  activeColor?: string;
}

export default function ColorPalette({ handleClick, activeColor }: PaletteProps) {
  const style = {
    height: '20px',
    width: '20px'
  };

  const colorBoxes = palette.map((c) => (
    <div
      key={c}
      className={cl(activeColor === c ? 'border rounded-md flex items-center justify-center w-6 h-6' : '')}
      style={{ borderColor: activeColor === c ? `${c}` : '' }}
    >
      <div style={{ backgroundColor: `${c}`, ...style }} className="rounded-md" onClick={() => handleClick(c)}></div>
    </div>
  ));

  return (
    <button type="button" className="grid grid-cols-8 gap-3.5 p-2 font-semibold">
      {colorBoxes}
    </button>
  );
}
