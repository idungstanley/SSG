import React from 'react';

interface ColumnProps {
  title: string;
  value: string;
}

export default function Column({ title, value }: ColumnProps) {
  return (
    <div className="p-1 font-medium">
      <p>
        {`${title}:`}
        <span className="font-semibold text-indigo-600 pl-1">{value}</span>
      </p>
    </div>
  );
}
