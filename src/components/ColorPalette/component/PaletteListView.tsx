import React, { useState } from 'react';
import { palette } from '../../../utils/Colors';
import { VerticalScroll } from '../../ScrollableContainer/VerticalScroll 2';
import RoundedCheckbox from '../../Checkbox/RoundedCheckbox';

interface ItemProps {
  item: {
    hex_code: string;
    library_name: string;
    colour: string;
  };
}

export default function PaletteListView() {
  return (
    <VerticalScroll>
      <div className="ml-5 table-container">
        <table className="h-32" style={{ width: '250px', display: 'grid', gridTemplateColumns: '30px 90px auto' }}>
          <thead className="w-full contents">
            <tr className="w-full h-6 text-xs text-left bg-gray-200 contents">
              <th className="ml-2.5 text-center p-2">
                <span className="relative w-5 h-5 px-2 bg-white border border-gray-300 rounded">
                  <div
                    className="absolute left-0 origin-top-left transform rotate-45 bg-gray-300"
                    style={{ top: '0px', height: '1px', width: '20px' }}
                  ></div>
                </span>
              </th>
              <th className="p-2">HEX CODE</th>
              <th className="p-2">LIBRARY NAME</th>
            </tr>
          </thead>
          <tbody className="contents">
            {palette.map((item, index) => (
              <Row item={item} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </VerticalScroll>
  );
}

function Row({ item, key }: { item: string; key: number }) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
  };

  return (
    <tr className="divide-y divide-gray-300 contents" key={key}>
      <td className="p-2">
        <div className="flex items-center justify-between gap-1">
          <RoundedCheckbox
            onChange={onChange}
            isChecked={isChecked}
            styles="w-2 h-2 rounded-full cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
          />
          <div className="w-5 h-5 px-2 rounded" style={{ backgroundColor: `${item}` }}></div>
        </div>
      </td>
      <td className="p-2">
        <div>{item}</div>
      </td>
      <td className="p-2 text-xs truncate">
        <div>COLOUR NAME</div>
      </td>
    </tr>
  );
}
