import React from 'react';
import TemplatesIcon from '../../../../../assets/icons/Templates';

function Header() {
  return (
    <div className="w-full">
      <div className="border-2 flex items-center text-center py-1 px-2 bg-white">
        <TemplatesIcon />
        <h1 className="text-base-xl mx-2">Properties</h1>
      </div>
    </div>
  );
}

export default Header;
