import React, { useState } from 'react';
import ThreeDotIcon from '../../../assets/icons/ThreeDotIcon';
import AlsoitMenuDropdown from '../../DropDowns';

const collections = [
  { label: 'Bespoke to Entity', onclick: () => ({}) },
  { label: 'Parent Entity', onclick: () => ({}) },
  { label: 'Shared Entity', onclick: () => ({}) },
  { label: 'Template Collection', onclick: () => ({}) }
];

export default function StatusCollectionBoard() {
  const [showCollectionDropdown, setShowCollectionDropdown] = useState<null | HTMLDivElement>(null);

  const handleShowCollection = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowCollectionDropdown(event.currentTarget);
  };
  const handleCloseCollectionMenu = () => {
    setShowCollectionDropdown(null);
  };

  return (
    <div className="w-full gap-2 p-3 rounded-lg bg-alsoit-gray-50">
      <div className="mb-4 ">STATUS MANAGER</div>
      <div className="flex items-center justify-between py-1 mb-2 border-b border-alsoit-purple-300">
        <div className="text-alsoit-purple-300">New Collection</div>
        <div onClick={(e) => handleShowCollection(e)}>
          <ThreeDotIcon />
        </div>
      </div>
      <div
        style={{ fontSize: '8px' }}
        className="text-right underline underline-offset-4 text-primary-400 decoration-primary-400"
      >
        Save to Template
      </div>
      <AlsoitMenuDropdown
        handleClose={handleCloseCollectionMenu}
        anchorEl={showCollectionDropdown as HTMLDivElement | null}
      >
        <div className="flex flex-col w-48 p-2 space-y-2">
          {collections.map((item, index) => (
            <div
              className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-alsoit-gray-75"
              key={index}
              onClick={item.onclick}
            >
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}
