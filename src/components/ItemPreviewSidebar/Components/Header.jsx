import React from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { resetSelectedFilesAndFolders } from '../../../features/explorer/explorerSlice';
import PermissionsManagement from '../../PermissionsManagement';

export default function Header({ id, type }) {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between mb-5 items-center">
      <svg
        onClick={() => dispatch(resetSelectedFilesAndFolders())}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 p cursor-pointer text-gray-400 hover:text-red-400 transition duration-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      <PermissionsManagement selectedDataId={id} type={type} />
    </div>
  );
}

Header.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
