import React, { useEffect, useState } from 'react';
import { palette } from '../../../utils/Colors';
import { VerticalScroll } from '../../ScrollableContainer/VerticalScroll';
import RoundedCheckbox from '../../Checkbox/RoundedCheckbox';
import { getColorName, initColors, ORIGINAL_COLORS } from 'ntc-ts';
import DefaultColour from '../../../assets/icons/DefaultColour';

export default function PaletteListView() {
  return (
    <VerticalScroll>
      <div className="w-full table-container">
        <table className="w-full h-36" style={{ display: 'grid', gridTemplateColumns: '20px 44px 110px auto' }}>
          <tr className="w-full h-6 text-xs text-left contents">
            <th className="p-2 text-center">
              <RoundedCheckbox
                onChange={() => ({})}
                isChecked={false}
                styles="w-2 h-2 rounded-full cursor-pointer focus:outline-1 focus:ring-transparent focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
              />
            </th>
            <th className="p-2 text-center border-b border-gray-300">
              <span className="flex items-center justify-between gap-1">
                <DefaultColour dimensions={{ width: 20, height: 20 }} />
              </span>
            </th>
            <th className="p-2 border-b border-gray-300">HEX CODE</th>
            <th className="p-2 border-b border-gray-300">LIBRARY NAME</th>
          </tr>
          {palette.map((item, index) => item !== null && <Row item={item} key={index} />)}
        </table>
      </div>
    </VerticalScroll>
  );
}

export type FORMATTED_COLOR = {
  exactMatch: boolean;
  name: string;
  rgb: string | null;
};

function Row({ item, key }: { item: string | null; key: number }) {
  initColors(ORIGINAL_COLORS);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [colorName, setColorName] = useState<string>('Missing Color');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
  };
  const colorProperty: FORMATTED_COLOR = getColorName(item);
  useEffect(() => {
    setColorName(colorProperty.name);
  }, []);

  return (
    <tr className="w-full bg-white contents" key={key}>
      <td className="p-2">
        <RoundedCheckbox
          onChange={onChange}
          isChecked={isChecked}
          styles="w-2 h-2 rounded-full cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
        />
      </td>
      <td className={`p-2 bg-white ${isChecked ? 'border-primary-400 border-y border-l' : 'border-b border-gray-300'}`}>
        <div className="flex items-center justify-between gap-1">
          <div
            className={`w-5 h-5 p-2 rounded ${isChecked ? 'bg-primary-100' : ''}`}
            style={{ backgroundColor: `${item}` }}
          ></div>
        </div>
      </td>
      <td className={`p-2 bg-white ${isChecked ? 'border-primary-400 border-y' : 'border-b border-gray-300'}`}>
        <div>{item}</div>
      </td>
      <td className={`p-2 bg-white ${isChecked ? 'border-primary-400 border-y border-r' : 'border-b border-gray-300'}`}>
        <div>{colorName}</div>
      </td>
    </tr>
  );
}
