import React from 'react';
import { palette } from '../../../utils/Colors';
import { ListColourProps } from '../../tasks/ListItem';

interface PaletteProps {
  handleClick: (value: string | ListColourProps) => void;
}

export default function ColorPalette({ handleClick }: PaletteProps) {
  const style = {
    height: '15px',
    width: '15px'
  };
  const colorBoxes = palette.map((c) => (
    <div style={{ backgroundColor: `${c}`, ...style }} key={c} className="rounded" onClick={() => handleClick(c)}></div>
  ));
  return (
    <button type="button" className="grid grid-cols-5 gap-3 p-2 font-semibold">
      {colorBoxes}
    </button>
  );
}
