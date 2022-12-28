import React from 'react';

interface ColumnsProps {
  data?: {
    id: number;
    title: string;
    value: string;
  }[];
}

function Columns({ data }: ColumnsProps) {
  if (!data) {
    return null;
  }

  return (
    <div className="p-1 font-medium">
      {data.map((i) => (
        <p key={i.id}>
          {i.title}
          <span className="font-semibold text-indigo-600 pl-1">{i.value}</span>
        </p>
      ))}
    </div>
  );
}

export default Columns;
