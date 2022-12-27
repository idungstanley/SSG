import React from 'react';
import { PropTypes } from 'prop-types';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { Spinner } from '../../../common';
import FullScreenMessage from "../../CenterMessage/FullScreenMessage";

const regex = /@[\S]*/g;

export default function List({
  status, comments, onEdit, onDelete,
}) {
  return status === 'loading' ? (
    <div className="mx-auto mt-3 mb-6 w-6 justify-center">
      <Spinner size={8} color="#0F70B7" />
    </div>
  ) : status === 'success' ? (
    comments?.length ? (
      <ul className="divide-y divide-gray-200">
        {comments.map((item) => (
          <li key={item.id} className="py-4 flex items-center justify-between">
            <p>{item.message.replaceAll(regex, '')}</p>

            <div className="flex gap-3 items-center">
              <div className="flex gap-2">
                {item.mention_users?.map((user) => (
                  <div
                    key={user.id}
                    className="bg-indigo-100 border text-sm px-3 py-1 border-primary-400 rounded-2xl"
                  >
                    {user.name}
                  </div>
                ))}
              </div>
              {item.can_modify ? (
                <>
                  <PencilIcon
                    onClick={() => onEdit(item.id, item.message, item.mention_users)}
                    className="w-6 h-6 text-gray-300 cursor-pointer hover:text-indigo-500 transition-all duration-300"
                  />
                  <TrashIcon
                    onClick={() => onDelete(item.id)}
                    className="w-6 h-6 text-gray-300 cursor-pointer hover:text-red-500 transition-all duration-300"
                  />
                </>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <FullScreenMessage
        title="No messages yes."
        description="Create one."
      />
    )
  ) : (
    <FullScreenMessage
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
