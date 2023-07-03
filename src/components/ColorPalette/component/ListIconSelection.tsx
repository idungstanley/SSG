import React from 'react';
import ListIconComponent from '../../ItemsListInSidebar/components/ListIconComponent';

interface ItemProps {
  activeShape?: string;
  handleSelection: (value: string) => void;
}
export default function ListIconSelection({ activeShape, handleSelection }: ItemProps) {
  const listIconDetails = [
    { shape: 'solid-circle' },
    { shape: 'solid-square' },
    { shape: 'two-circle' },
    { shape: 'two-square' },
    { shape: 'square-in-circle' },
    { shape: 'circle-in-square' }
  ];

  const listIcons = listIconDetails.map((icon, index) => {
    return (
      <span
        key={index}
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
