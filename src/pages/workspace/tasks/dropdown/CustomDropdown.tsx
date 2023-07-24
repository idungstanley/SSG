import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../app/hooks';
import { setShowAddHotKeyDropdown, setShowRemoveHotKeyDropdown } from '../../../../features/workspace/workspaceSlice';

export interface IColumn {
  name: string;
  id?: number;
  index?: number;
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

export default function CustomDropdown({ title, listItems, handleClick }: CustomDropdownProps) {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { showAddHotKeyDropdown, showRemoveHotKeyDropdown } = useAppSelector((state) => state.workspace);
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
    <div className="h- p-0.5" ref={ref}>
      <div
        className="absolute w-56 px-1 py-1 mt-3 overflow-y-auto bg-white border border-gray-200 rounded shadow-2xl h-fit top-24 right-12 drop-shadow-2xl drop-shadow-md"
        style={{ zIndex: '999' }}
      >
        <button type="button" className="p-2 font-semibold">
          {title}
        </button>
        {title && <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 pb-0.5 mb-1" />}
        {listItems?.map((listItem) => (
          <div
            key={listItem.name}
            className="w-full rounded hover:bg-gray-300"
            onClick={() => handleClick(listItem.index)}
          >
            <button
              type="button"
              className="flex items-center gap-2 p-2 capitalize cursor-pointer"
              onClick={() => listItem.onclick}
              key={listItem.name}
            >
              <span className="w-4 h-4 text-sm">
                {listItem.icon ? (
                  listItem.icon
                ) : (
                  <img src={listItem.source} alt={listItem.name + ' icon'} className="w-3 h-3" />
                )}
              </span>
              {listItem.name ? listItem.name : listItem.label}
            </button>
            {/* <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" /> */}
          </div>
        ))}
        {listItems?.length === 0 && <div className="p-2 text-sm font-medium">There is no Item on this list. . .</div>}
      </div>
    </div>
  );
}

CustomDropdown.defaultProps = {
  title: ''
};
