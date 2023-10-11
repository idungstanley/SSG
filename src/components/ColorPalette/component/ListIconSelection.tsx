import React from 'react';
import ListIconComponent from '../../ItemsListInSidebar/components/ListIconComponent';
import { InlineBorderLabel } from '../../Dropdown/MenuDropdown';

interface ItemProps {
  activeShape?: string;
  handleSelection: (value: string) => void;
}
export const listIconDetails = [
  { shape: 'solid-circle', category: 'CIRCLE', label: 'Solid circle' },
  { shape: 'solid-square', category: 'SQUARE', label: 'Solid Square' },
  { shape: 'two-circle', category: 'CIRCLE', label: 'Double circles' },
  { shape: 'two-square', category: 'SQUARE', label: 'Double Square' },
  { shape: 'square-in-circle', category: 'CIRCLE', label: 'Square in circle' },
  { shape: 'circle-in-square', category: 'SQUARE', label: 'Circle in square' }
];
export default function ListIconSelection({ activeShape, handleSelection }: ItemProps) {
  const Categories = [...new Set(listIconDetails.map(({ category }) => category))];
  const listIcons = Categories.map((uniqueCategory, categoryIndex) => (
    <div key={categoryIndex} className="flex flex-col w-full">
      <InlineBorderLabel label={uniqueCategory} />
      <div className="flex flex-col w-full gap-1 px-4">
        {listIconDetails
          .filter((item) => item.category === (uniqueCategory as string))
          .map((filteredShapes, filteredIndex) => {
            return (
              <span
                key={filteredIndex}
                onClick={() => handleSelection(filteredShapes.shape)}
                className={`${
                  activeShape === filteredShapes.shape ? 'bg-primary-200 rounded-md' : ''
                } cursor-pointer  p-1 flex items-center justify-between`}
              >
                <div className="flex items-center gap-1">
                  <ListIconComponent shape={filteredShapes.shape} innerColour="white" outterColour="#626262" />
                  <p>{filteredShapes.label}</p>
                </div>
                <label className="switch">
                  <input
                    className="inputShow"
                    type="checkbox"
                    checked={activeShape === filteredShapes.shape}
                    onChange={() => ({})}
                  />
                  <div className={`slider ${filteredShapes.shape ? 'checked' : ''}`}></div>
                </label>
              </span>
            );
          })}
      </div>
    </div>
  ));

  return (
    <div className="bg-white w-52 h-fit">
      <span className="flex flex-col items-center justify-between w-full gap-1">{listIcons}</span>
    </div>
  );
}
