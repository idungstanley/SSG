import React from 'react';
import PropTypes from 'prop-types';
import { PlusIcon } from '@heroicons/react/outline';

export default function CreateNewItemBtn({ onClick, title }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 border transition py-2 space-x-2 rounded-xl w-full"
      onClick={onClick}
    >
      <PlusIcon className="h-5 w-4" aria-hidden="true" />
      <p>{title}</p>
    </button>
  );
}

CreateNewItemBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
