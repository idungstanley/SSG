import React from 'react';
import PropTypes from 'prop-types';

function InitialsAvatar({
  size,
  colour,
  initials,
}) {
  return (
    <div
      className={`h-${size} w-${size} rounded-full flex-shrink-0 flex items-center justify-center text-white font-medium`}
      style={{ backgroundColor: colour, fontSize: size === 6 ? '0.6rem' : '0.85rem' }}
    >
      {initials}
    </div>
  );
}

InitialsAvatar.propTypes = {
  size: PropTypes.string.isRequired,
  colour: PropTypes.string.isRequired,
  initials: PropTypes.string.isRequired,
};

export default InitialsAvatar;
