import React from 'react';
import ListIconComponent from '../../ItemsListInSidebar/components/ListIconComponent';

interface ItemProps {
  activeShape?: string;
  handleSelection: (value: string) => void;
}
export default function ListIconSelection({ activeShape, handleSelection }: ItemProps) {
  const listIconDetails = [
    { id: 1, shape: 'two-square' },
    { id: 2, shape: 'two-circle' },
    { id: 3, shape: 'circle-in-square' },
    { id: 4, shape: 'square-in-circle' }
  ];

  const listIcons = listIconDetails.map((icon) => {
    return (
      <span
        key={icon.id}
        onClick={() => handleSelection(icon.shape)}
        className={`${activeShape === icon.shape ? 'bg-red-400 rounded-md' : ''} cursor-pointer flex items-center p-1`}
      >
        <ListIconComponent shape={icon.shape} innerColour="white" outterColour="gray" />
      </span>
    );
  });

  return (
    <div className="w-full p-1.5 mt-1 border rounded-md border-gray-300">
      <span className="flex items-center justify-between gap-2">{listIcons}</span>
    </div>
  );
}
