import React from 'react';
import PropTypes from 'prop-types';


interface avatarType {
  colour: string;
  size: number;
  onClick: () => void;
}

function AvatarBg({ colour, size, onClick }: avatarType) {
  return (
    <button
      type="button"
      className={`rounded-full w-${size} h-${size}`}
      style={{ backgroundColor: colour }}
      onClick={onClick}
    />
  );
}

AvatarBg.defaultProps = {
  size: 2.5,
  colour: '#4ADE80',
};

AvatarBg.propTypes = {
  colour: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default AvatarBg;
