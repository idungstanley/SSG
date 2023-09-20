import React from 'react';
import { palette } from '../../../utils/Colors';
import { VerticalScroll } from '../../ScrollableContainer/VerticalScroll';

export default function PaletteListView() {
  return (
    <VerticalScroll>
      <div className="table-container">
        <table
          className="h-32 gap-2"
          style={{ width: '280px', display: 'grid', gridTemplateColumns: '25px 80px auto' }}
        >
          <thead className="w-full contents">
            <tr className="w-full h-6 text-xs text-left bg-gray-200 contents">
              <th>
                <span className="relative w-5 h-5 px-2 bg-white border border-gray-300 rounded">
                  <div
                    className="absolute left-0 origin-top-left transform rotate-45 bg-gray-300"
                    style={{ top: '1px', height: '1px', width: '21px' }}
                  ></div>
                </span>
              </th>
              <th>HEX CODE</th>
              <th className="">LIBRARY NAME</th>
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
  return (
    <tr className="border-b border-gray-200 contents" key={key}>
      <td>
        <div className="w-5 h-5 px-2 rounded" style={{ backgroundColor: `${item}` }}></div>
      </td>
      <td>
        <div>{item}</div>
      </td>
      <td className="text-xs truncate">
        <div>COLOUR NAME GOES HERE</div>
      </td>
    </tr>
  );
}
