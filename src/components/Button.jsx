import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Button({
  buttonStyle,
  onClick,
  loading,
  label,
  icon,
  width,
  height,
  padding,
  disabled,
  iconPosition,
  ringOnFocus,
  roundedLeft,
  roundedRight,
  borderLeft,
  borderRight,
}) {
  var buttonClassName;
  var hoverBackgroundColor;

  if (buttonStyle === 'primary') {
    hoverBackgroundColor = 'hover:bg-primary-700';
    buttonClassName = 'border border-transparent shadow-sm text-sm font-medium text-white bg-primary-600 focus:outline-none';
  } else if (buttonStyle === 'secondary') {
    hoverBackgroundColor = 'hover:bg-primary-200';
    buttonClassName = 'border border-transparent text-sm font-medium text-primary-700 bg-primary-100 focus:outline-none';
  } else if (buttonStyle === 'danger') {
    hoverBackgroundColor = 'hover:bg-red-700';
    buttonClassName = 'border border-transparent shadow-sm text-sm font-medium text-white bg-red-600 focus:ring-red-500';
  } else if (buttonStyle === 'white') {
    hoverBackgroundColor = 'hover:bg-gray-50';
    buttonClassName = 'border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white focus:outline-none';
  }

  if (ringOnFocus === true) { // What about danger which already have a ring?
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
      onClick={onClick}
      type="button"
      disabled={disabled || loading}
      className={classNames((disabled || loading) ? 'opacity-50' : hoverBackgroundColor, `${buttonClassName} ${width} ${height} ${padding} inline-flex items-center justify-center`)}
    >
      {loading ? (
        <div className="items-center -mt-1 justify-center w-full">
          <Spinner size={18} color={buttonStyle === 'primary' ? '#ffffff' : '#6B7280'} />
        </div>
      ) : (
        <>
          {icon && iconPosition === 'center' && <span className="">{icon}</span>}
          {icon && (iconPosition === 'left' || iconPosition === null) && <span className="mr-1">{icon}</span>}
          {label && (<span>{label}</span>)}
          {icon && iconPosition === 'right' && <span className="ml-1">{icon}</span>}
        </>
      )}
    </button>
  );
}

Button.defaultProps = {
  loading: false,
  label: null,
  width: 'w-auto',
  height: 'h-10',
  padding: 'px-4 py-2',
  disabled: false,
  icon: null,
  iconPosition: 'left',
  ringOnFocus: false,
  roundedLeft: true,
  roundedRight: true,
  borderLeft: true,
  borderRight: true,
};

Button.propTypes = {
  buttonStyle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  label: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  disabled: PropTypes.bool,
  iconPosition: PropTypes.string,
  ringOnFocus: PropTypes.bool,
  roundedLeft: PropTypes.bool,
  roundedRight: PropTypes.bool,
  borderLeft: PropTypes.bool,
  borderRight: PropTypes.bool,
};

export default Button;
