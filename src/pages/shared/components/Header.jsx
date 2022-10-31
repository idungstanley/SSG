import React from 'react';

function Header() {
  return (
    <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 h-20">
      <div className="flex-1 min-w-0 items-center">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Shared with me</h1>
      </div>
    </div>
  );
}

export default Header;
