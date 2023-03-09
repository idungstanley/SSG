import React from 'react';

interface StackListItemNarrowProps {
  title: string;
  description: string | null;
  icon: string | JSX.Element;
  button: JSX.Element | null;
  paddingVertical?: number;
  paddingHorizontal?: number;
  onClick?: () => void;
  selected?: boolean;
}

function StackListItemNarrow({
  title,
  description,
  icon,
  button,
  paddingVertical = 4,
  paddingHorizontal = 0,
  onClick,
  selected = false
}: StackListItemNarrowProps) {
  return (
    <li className="bg-white">
      <div
        className={`relative flex items-center space-x-3 py-${paddingVertical} px-${paddingHorizontal} min-w-0 flex-1 flex items-center space-x-3 ${
          selected && 'ring-2 ring-inset ring-indigo-500'
        } ${onClick && 'hover:bg-gray-50'}`}
      >
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="flex-1 min-w-0">
          {onClick ? (
            <button type="button" className="block focus:outline-none" onClick={onClick}>
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />

              <div className="flex flex-col text-left">
                <p className="inline-flex text-sm font-medium text-gray-900 break-all">{title}</p>
                <p className="text-sm font-normal text-gray-500 truncate">{description}</p>
              </div>
            </button>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
              <p className="text-sm font-normal text-gray-500 truncate">{description}</p>
            </>
          )}
        </div>
        {icon && button}
      </div>
    </li>
  );
}

export default StackListItemNarrow;
