import React from 'react';
import ListIconComponent from '../../ItemsListInSidebar/components/ListIconComponent';
import { InlineBorderLabel } from '../../Dropdown/MenuDropdown';

interface ItemProps {
  activeShape?: string;
  handleSelection: (value: string) => void;
}
export default function ListIconSelection({ activeShape, handleSelection }: ItemProps) {
  const listIconDetails = [
    { shape: 'solid-circle', category: 'CIRCLE' },
    { shape: 'solid-square', category: 'SQUARE' },
    { shape: 'two-circle', category: 'CIRCLE' },
    { shape: 'two-square', category: 'SQUARE' },
    { shape: 'square-in-circle', category: 'CIRCLE' },
    { shape: 'circle-in-square', category: 'SQUARE' }
  ];

  const Categories = [...new Set(listIconDetails.map(({ category }) => category))];
  const listIcons = Categories.map((uniqueCategory, categoryIndex) => (
    <div key={categoryIndex} className="flex flex-col w-full">
      <InlineBorderLabel label={uniqueCategory} />
      <div className="flex items-center justify-around w-full">
        {listIconDetails
          .filter((item) => item.category === (uniqueCategory as string))
          .map((filteredShapes, filteredIndex) => {
            return (
              <span
                key={filteredIndex}
                onClick={() => handleSelection(filteredShapes.shape)}
                className={`${
                  activeShape === filteredShapes.shape ? 'border-primary-500 border p-0.5 rounded-md' : ''
                } cursor-pointer flex items-center p-0.5`}
              >
                <ListIconComponent shape={filteredShapes.shape} innerColour="white" outterColour="#626262" />
              </span>
            );
          })}
      </div>
    </div>
  ));

  return (
    <div className="py-1 my-1 bg-white border border-gray-300 rounded-md h-fit">
      <span className="flex flex-col items-center justify-between w-full gap-1">{listIcons}</span>
    </div>
  );
}
