import React from 'react';
import { PropTypes } from 'prop-types';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { Spinner } from '../../../common';
import OneThirdScreenMessage from '../../CenterMessage/OneThirdScreenMessage';

export default function List({
  status, comments, onEdit, onDelete,
}) {
  return status === 'loading' ? (
    <div className="mx-auto mt-3 mb-6 w-6 justify-center">
      <Spinner size={22} color="#0F70B7" />
    </div>
  ) : status === 'success' ? (
    comments?.length ? (
      <ul className="divide-y divide-gray-200">
        {comments.map((i) => (
          <li key={i.id} className="py-4 flex justify-between">
            <p className="pl-1">{i.message}</p>
            <div className="flex gap-3">
              {i.can_modify ? (
                <PencilIcon
                  onClick={() => onEdit(i.id, i.message)}
                  className="w-6 h-6 text-gray-300 cursor-pointer hover:text-indigo-500 transition-all duration-300"
                />
              ) : null}
              <TrashIcon
                onClick={() => onDelete(i.id)}
                className="w-6 h-6 text-gray-300 cursor-pointer hover:text-red-500 transition-all duration-300"
              />
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <OneThirdScreenMessage
        title="No messages yes."
        description="Create one."
      />
    )
  ) : (
    <OneThirdScreenMessage
      title="Oops, an error occurred :("
      description="Please try again later."
    />
  );
}

List.defaultProps = {
  comments: [],
};

List.propTypes = {
  status: PropTypes.string.isRequired,
  comments: PropTypes.array,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
