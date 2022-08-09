import React from 'react';
import Header from './Header';
import Body from './Body';

function Table() {
  return (
    <div className="flex-1 align-middle inline-block min-w-full border-b border-gray-200">
      <table className="min-w-full">
        <Header />
        <Body />
      </table>
    </div>
  );
}

export default Table;
