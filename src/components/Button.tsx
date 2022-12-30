import React from 'react';
import Spinner from '../common/Spinner';
import { classNames } from '../utils';

interface ButtonProps {
  buttonStyle?: string;
  onClick?: () => Promise<void> | void;
  loading?: boolean;
  label?: string | null;
  icon?: string | JSX.Element;
  width?: string | number;
  height?: string;
  padding?: string;
  disabled?: boolean;
  iconPosition?: string;
  ringOnFocus?: boolean;
  roundedLeft?: boolean;
  roundedRight?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
  value?: string | number | readonly string[] | undefined;
}

function Button({
  buttonStyle,
  onClick,
  loading = false,
  label,
  icon,
  width = 'w-auto',
  height = 'h-10',
  padding = 'px-4 py-2',
  disabled = false,
  iconPosition = 'left',
  ringOnFocus = false,
  roundedLeft = true,
  roundedRight = true,
  borderLeft = true,
  borderRight = true,
  value,
}: ButtonProps) {
  let buttonClassName;
  let hoverBackgroundColor;

  if (buttonStyle === 'primary') {
    hoverBackgroundColor = 'hover:bg-primary-700';
    buttonClassName =
      'border border-transparent shadow-sm text-sm font-medium text-white bg-primary-600 focus:outline-none';
  } else if (buttonStyle === 'secondary') {
    hoverBackgroundColor = 'hover:bg-primary-200';
    buttonClassName =
      'border border-transparent text-sm font-medium text-primary-700 bg-primary-100 focus:outline-none';
  } else if (buttonStyle === 'danger') {
    hoverBackgroundColor = 'hover:bg-red-700';
    buttonClassName =
      'border border-transparent shadow-sm text-sm font-medium text-white bg-red-600 focus:ring-red-500';
  } else if (buttonStyle === 'white') {
    hoverBackgroundColor = 'hover:bg-gray-50';
    buttonClassName =
      'border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white focus:outline-none';
  }

  if (ringOnFocus === true) {
    // What about danger which already have a ring?
    buttonClassName = `${buttonClassName} focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-primary-600`;
  }

  if (roundedLeft) {
    buttonClassName = `${buttonClassName} rounded-l-md`;
  }

  if (roundedRight) {
    buttonClassName = `${buttonClassName} rounded-r-md`;
  }

  if (!borderLeft) {
    buttonClassName = `${buttonClassName} border-l-0`;
  }

  if (!borderRight) {
    buttonClassName = `${buttonClassName} border-r-0`;
  }

  return (
    <button
      value={value}
      onClick={onClick}
      type="button"
      disabled={disabled || loading}
      className={classNames(
        disabled || loading
          ? ('opacity-50' as string)
          : (hoverBackgroundColor as string),
        `${buttonClassName} ${width} ${height} ${padding} inline-flex items-center justify-center`
      )}
    >
      {loading ? (
        <div className="items-center justify-center w-full -mt-1">
          <Spinner
            size={10}
            color={buttonStyle === 'primary' ? '#ffffff' : '#6B7280'}
          />
        </div>
      ) : (
        <>
          {icon && iconPosition === 'center' && (
            <span className="">{icon}</span>
          )}
          {icon && (iconPosition === 'left' || iconPosition === null) && (
            <span className="mr-1">{icon}</span>
          )}
          {label && <span>{label}</span>}
          {icon && iconPosition === 'right' && (
            <span className="ml-1">{icon}</span>
          )}
        </>
      )}
    </button>
  );
}

export default Button;
