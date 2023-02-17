import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../app/hooks';
import {
  setShowAddHotKeyDropdown,
  setShowRemoveHotKeyDropdown,
} from '../../../../features/workspace/workspaceSlice';

export interface IColumn {
  name: string;
  id: number;
  label?: string;
  source?: string;
  subTab?: JSX.Element;
  icon?: JSX.Element;
  onclick?: () => void;
  isVisible?: boolean;
}

interface CustomDropdownProps {
  title: string;
  listItems: IColumn[] | undefined;
  handleClick: (id: number | undefined) => void;
}

export default function CustomDropdown({
  title,
  listItems,
  handleClick,
}: CustomDropdownProps) {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { showAddHotKeyDropdown, showRemoveHotKeyDropdown } = useAppSelector(
    (state) => state.workspace
  );
  useEffect(() => {
    const checkClickedOutSide = (e: MouseEvent) => {
      if (ref.current && e.target && !ref.current.contains(e.target as Node)) {
        if (showAddHotKeyDropdown === true) {
          dispatch(setShowAddHotKeyDropdown(false));
        } else if (showRemoveHotKeyDropdown === true) {
          dispatch(setShowRemoveHotKeyDropdown(false));
        }
      }
    };
    document.addEventListener('click', checkClickedOutSide);
    return () => {
      document.removeEventListener('click', checkClickedOutSide);
    };
  }, []);
  return (
    <div className="h-auto" ref={ref}>
      <div className="overflow-y-auto h-auto border-gray-200 border absolute top-24 bottom-36 right-12 mt-3 w-56 rounded-lg shadow-2xl drop-shadow-2xl drop-shadow-md py-1 bg-white"
      style={{zIndex: '999'}}
      >
        <button type="button" className="p-2 font-semibold">
          {title}
        </button>
        {title && <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />}
        {listItems?.map((listItem) => (
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
        {listItems?.length === 0 && (
          <div className="text-sm p-2 font-medium">There is no Item on this list. . .</div>
        )}
      </div>
    </div>
  );
}

CustomDropdown.defaultProps = {
  title: '',
};
