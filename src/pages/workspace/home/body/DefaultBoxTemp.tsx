import React from 'react';

export default function DefaultBoxTemp({ title }: { title: string }) {
  return (
    <div className="p-1">
      <p className="flex justify-center text-alsoit-gray-100 p-2 border w-full h-full">{title}</p>
    </div>
  );
}
