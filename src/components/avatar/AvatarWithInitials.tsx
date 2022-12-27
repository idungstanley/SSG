import React from 'react';
import PropTypes from 'prop-types';

interface avatarType {
  initials: string;
  height: string;
  width: string ;
  backgroundColour: string;
  roundedStyle: string ;
  textSize: string ;
}
function AvatarWithInitials({
  initials,
  height,
  width,
  backgroundColour,
  roundedStyle,
  textSize,
}: avatarType) {
  return (
    <span className={`inline-flex items-center justify-center ${height} ${width} ${roundedStyle === 'circular' && 'rounded-full'} ${roundedStyle === 'rounded' && 'rounded-md'}`} style={{ backgroundColor: backgroundColour }}>
      <span className={`font-medium leading-none text-white ${textSize}`}>{initials}</span>
    </span>
  );
}

AvatarWithInitials.defaultProps = {
  height: 'h-10',
  width: 'w-10',
  backgroundColour: '#6B7280',
  roundedStyle: 'circular',
  textSize: 'text-sm',
};

AvatarWithInitials.propTypes = {
  initials: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  backgroundColour: PropTypes.string,
  roundedStyle: PropTypes.string,
  textSize: PropTypes.string,
};

export default AvatarWithInitials;
