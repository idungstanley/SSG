import React from 'react';
import DefaultBoxTemp from './DefaultBoxTemp';

export default function Trending() {
  return (
    <div className="mt-10">
      <h1 className="text-lg text-black font-bold p-2">Trending (0)</h1>
      <DefaultBoxTemp title="You have no trending tasks" />
    </div>
  );
}
