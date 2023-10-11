import React, { useEffect, useState } from 'react';
import { VerticalScroll } from '../../ScrollableContainer/VerticalScroll';
import RoundedCheckbox from '../../Checkbox/RoundedCheckbox';
import DefaultColour from '../../../assets/icons/DefaultColour';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setSelectedListColours } from '../../../features/account/accountSlice';
import { IPaletteData } from '../../../features/workspace/workspace.interfaces';

export default function PaletteListView() {
  const dispatch = useAppDispatch();
  const { selectListColours, colourPaletteData } = useAppSelector((state) => state.account);
  const allChecked = colourPaletteData?.every((item) => selectListColours.includes(item.id as string));

  const handleGroupSelect = () => {
    const updatedSelectedColour = [...selectListColours];
    if (allChecked) {
      colourPaletteData.forEach((item) => {
        const indexInArray = updatedSelectedColour.indexOf(item.id as string);
        updatedSelectedColour.splice(indexInArray, 1);
      });
    } else {
      colourPaletteData.forEach((item) => {
        const indexInArray = updatedSelectedColour.indexOf(item.id as string);
        if (indexInArray === -1) {
          updatedSelectedColour.push(item.id as string);
        }
      });
    }
    dispatch(setSelectedListColours(updatedSelectedColour));
  };

  return (
    <VerticalScroll>
      <div className="w-full h-56 table-container">
        <table className="w-full" style={{ display: 'grid', gridTemplateColumns: '20px 44px 110px auto' }}>
          <tr className="w-full h-6 text-xs text-left contents">
            <th className="p-2 text-center">
              <RoundedCheckbox
                onChange={handleGroupSelect}
                isChecked={allChecked}
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
          {colourPaletteData.map((item, index) => item !== null && <Row item={item} key={index} />)}
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

function Row({ item, key }: { item: IPaletteData; key: number }) {
  const dispatch = useAppDispatch();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { selectListColours } = useAppSelector((state) => state.account);

  useEffect(() => {
    const isChecked = selectListColours.includes(item.id as string);
    if (isChecked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [selectListColours, item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const indexInArray = selectListColours.indexOf(item.id as string);
    const updatedSelectedColour = [...selectListColours];
    if (!selectListColours.includes(item.id as string)) {
      updatedSelectedColour.push(item.id as string);
    } else {
      updatedSelectedColour.splice(indexInArray, 1);
    }
    dispatch(setSelectedListColours(updatedSelectedColour as string[]));
    setIsChecked(isChecked);
  };

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
            style={{ backgroundColor: `${item.color}` }}
          ></div>
        </div>
      </td>
      <td className={`p-2 bg-white ${isChecked ? 'border-primary-400 border-y' : 'border-b border-gray-300'}`}>
        <div>{item.color}</div>
      </td>
      <td className={`p-2 bg-white ${isChecked ? 'border-primary-400 border-y border-r' : 'border-b border-gray-300'}`}>
        <div>{item.color_name}</div>
      </td>
    </tr>
  );
}
