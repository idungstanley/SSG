import React from 'react';
import { useDispatch } from 'react-redux';
import { resetSelectedFilesAndFolders } from '../../../features/explorer/explorerSlice';
import PermissionManagement from '../../PermissionManagement';

export default function Header() {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between mb-5">
      <svg
        onClick={() => dispatch(resetSelectedFilesAndFolders())}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 text-gray-400 transition duration-300 cursor-pointer p hover:text-red-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      <PermissionManagement />
    </div>
  );
}
