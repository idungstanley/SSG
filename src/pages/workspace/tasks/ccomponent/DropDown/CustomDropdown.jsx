import React from 'react';
import PropTypes from 'prop-types';

export default function CustomDropdown({ title, listItems, clickAction }) {
  return (
    <div className="">
      <div className="origin-top-right absolute bottom-20 top-12 right-5 z-10 -mt-3 w-48 rounded-md shadow-lg py-1 bg-gray-300 h-full">
        <button type="button">{title}</button>
        {title && <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />}
        {listItems.map((listItem) => (
          <>
            <button
              type="button"
              className="capitalize cursor-pointer p-2 hover:bg-gray-300"
              onClick={() => clickAction(listItem)}
              key={listItem}
            >
              {listItem}
            </button>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          </>
        ))}
      </div>
    </div>
  );
}

CustomDropdown.defaultProps = {
  title: '',
};

CustomDropdown.propTypes = {
  title: PropTypes.string,
  listItems: PropTypes.array.isRequired,
  clickAction: PropTypes.func.isRequired,
};
