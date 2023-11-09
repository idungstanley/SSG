import React from 'react';

export default function MyWork() {
  return (
    <div className="mt-10">
      <h1 className="text-lg font-bold py-4">My Work</h1>
      <div className="flex space-x-3 border-b">
        <p className="border-b-4 pb-5 border-alsoit-purple-300 rounded-sm">To Do</p>
        <p>Comments</p>
        <p>Done</p>
        <p>Delegated</p>
      </div>
    </div>
  );
}
