import React from 'react';

export interface IColumn {
  name?: string;
  id?: number;
  label?: string;
  source?: string;
  subTab?: JSX.Element;
  icon?: JSX.Element;
  onclick?: () => void;
  isVisible?: boolean;
}

interface CustomDropdownProps {
  title: string;
  listItems: IColumn[];
  handleClick: (id: number | undefined) => void;
}

export default function CustomDropdown({
  title,
  listItems,
  handleClick,
}: CustomDropdownProps) {
  return (
    <div className="">
      <div className="overflow-y-auto border-gray-200 border absolute bottom-20 top-16 z-50 right-12 mt-3 w-56 rounded-lg shadow-2xl drop-shadow-2xl drop-shadow-md py-1 bg-white">
        <button type="button">{title}</button>
        {title && <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />}
        {listItems.map((listItem) => (
          <div
            key={listItem.name}
            className="hover:bg-gray-300 w-full"
            onClick={() => handleClick(listItem.id)}
          >
            <button
              type="button"
              className="capitalize flex cursor-pointer p-2 items-center gap-2"
              onClick={() => listItem.onclick}
              key={listItem.name}
            >
              <span className="w-4 h-4 text-sm">
                {listItem.icon ? (
                  listItem.icon
                ) : (
                  <img
                    src={listItem.source}
                    alt={listItem.name + ' icon'}
                    className="w-3 h-3"
                  />
                )}
              </span>
              {listItem.name ? listItem.name : listItem.label}
            </button>
            {/* <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

CustomDropdown.defaultProps = {
  title: '',
};
