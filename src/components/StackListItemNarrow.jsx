import React from 'react';
import PropTypes from 'prop-types';

function StackListItemNarrow({
  title,
  description,
  icon,
  button,
  paddingVertical,
  paddingHorizontal,
  onClick,
  selected,
}) {
  return (
    <li className="bg-white">
      <div
        className={`relative flex items-center space-x-3 py-${paddingVertical} px-${paddingHorizontal} min-w-0 flex-1 flex items-center space-x-3 ${
          selected && 'ring-2 ring-inset ring-indigo-500'
        } ${onClick && 'hover:bg-gray-50'}`}
      >
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="min-w-0 flex-1">
          {onClick ? (
            <button
              type="button"
              className="block focus:outline-none"
              onClick={onClick}
            >
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true" />

              <div className="flex flex-col text-left">
                <p className="text-sm font-medium text-gray-900 inline-flex break-all">
                  {title}
                </p>
                <p className="text-sm font-normal text-gray-500 truncate">
                  {description}
                </p>
              </div>
            </button>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-900 truncate">
                {title}
              </p>
              <p className="text-sm font-normal text-gray-500 truncate">
                {description}
              </p>
            </>
          )}
        </div>
        {icon && button}
      </div>
    </li>
  );
}

StackListItemNarrow.defaultProps = {
  description: null,
  icon: null,
  button: null,
  paddingVertical: 4,
  paddingHorizontal: 0,
  onClick: null,
  selected: false,
};

StackListItemNarrow.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  button: PropTypes.object,
  paddingVertical: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  onClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  selected: PropTypes.bool,
};

export default StackListItemNarrow;
