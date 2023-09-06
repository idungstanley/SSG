import React from 'react';
import ThreeDotIcon from '../../../assets/icons/ThreeDotIcon';

export default function StatusCollectionBoard() {
  return (
    <div className="w-full gap-2 p-3 rounded-lg bg-alsoit-gray-50">
      <div className="mb-4 ">STATUS MANAGER</div>
      <div className="flex items-center justify-between py-1 mb-2 border-b border-alsoit-purple-300">
        <div className="text-alsoit-purple-300">New Collection</div>
        <ThreeDotIcon />
      </div>
      <div
        style={{ fontSize: '8px' }}
        className="text-right underline underline-offset-4 text-primary-400 decoration-primary-400"
      >
        Save to Template
      </div>
    </div>
  );
}
