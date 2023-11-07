import React from 'react';

interface TagActionsProps {
  items: {
    name: string;
    icon: JSX.Element;
    onClick: VoidFunction;
  }[];
}

export default function TagActions({ items }: TagActionsProps) {
  return (
    <div className="px-1 py-1">
      {items.map((item) => (
        <div key={item.name}>
          <button
            onClick={item.onClick}
            className="group flex gap-4 w-full items-center rounded-md p-1 text-sm hover:bg-gray-300"
          >
            {item.icon}
            {item.name}
          </button>
        </div>
      ))}
    </div>
  );
}
