import React from 'react';
import PropTypes from 'prop-types';

function Badge({
  value,
  textColour,
  backgroundColour,
  paddingHorizontal,
  paddingVertical,
  textSize,
  fontWeight,
  otherStyles,
}) {
  return (
    <span className={`select-none inline-flex text-center items-center ${paddingHorizontal} ${paddingVertical} rounded-full ${textSize} ${fontWeight} ${backgroundColour} ${textColour} ${otherStyles}`}>{value}</span>
  );
}

Badge.defaultProps = {
  textColour: 'text-red-800',
  backgroundColour: 'bg-red-100',
  paddingHorizontal: 'px-2',
  paddingVertical: 'py-0.5',
  textSize: 'text-xs',
  fontWeight: 'font-semibold',
  otherStyles: null,
};

Badge.propTypes = {
  value: PropTypes.string.isRequired,
  textColour: PropTypes.string,
  backgroundColour: PropTypes.string,
  paddingHorizontal: PropTypes.string,
  paddingVertical: PropTypes.string,
  textSize: PropTypes.string,
  fontWeight: PropTypes.string,
  otherStyles: PropTypes.string,
};

export default Badge;
