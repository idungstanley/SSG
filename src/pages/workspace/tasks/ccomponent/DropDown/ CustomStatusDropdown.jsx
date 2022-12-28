import React from 'react';
import PropTypes from 'prop-types';

export default function CustomStatusDropdown({
  title,
  listItems,
  clickAction,
}) {
  return (
    <div className="">
      <div className="origin-top-right absolute bottom-20 left-10 right-50 z-10 -mt-3 w-fit min:w-48 rounded-md shadow-lg py-1 px-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search statuses"
          className="p-2 w-full border-0  focus:outline-none"
        />
        <div>{title}</div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        {listItems.map((listItem, i) => (
          <div className="relative" key={listItem.id}>
            <div
              className={`cursor-pointer p-2 hover:${listItem.color} hover:text-white hover:rounded w-full text-left before:h-2.5 before:w-2.5 before:block before:absolute before:rounded-sm before:${listItem.color} before:top-4 before:left-2 pl-6`}
              onClick={() => clickAction(listItem.status)}
            >
              {listItem.status}
            </div>
            {i === listItems.length - 2 ? (
              <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

CustomStatusDropdown.defaultProps = {
  title: '',
};

CustomStatusDropdown.propTypes = {
  title: PropTypes.string,
  listItems: PropTypes.array.isRequired,
  clickAction: PropTypes.func.isRequired,
};
