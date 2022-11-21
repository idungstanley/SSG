import React from 'react';
import Header from './Header';
import Body from './Body';

// ! make this component reusable for using in hidden and unhidden inboxes

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
