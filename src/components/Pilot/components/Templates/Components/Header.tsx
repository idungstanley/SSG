import React from 'react';
import TemplatesIcon from '../../../../../assets/icons/Templates';

function Header() {
  return (
    <div className="w-full">
      <div className="border-2 flex items-center text-center py-1 bg-white">
        <TemplatesIcon />
        <h1 className="text-base-xl mx-4">Templates</h1>
        <button className="p-0.5 border-blue-400 border-solid border-2 rounded-lg text-xs">ADD</button>
      </div>
    </div>
  );
}

export default Header;
