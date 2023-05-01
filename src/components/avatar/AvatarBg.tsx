import React from 'react';

interface avatarType {
  colour?: string;
  size?: number;
  onClick: () => void;
}

function AvatarBg({ colour = '#4ADE80', size = 2.5, onClick }: avatarType) {
  return (
    <button
      type="button"
      className={`rounded w-${size} h-${size} hover:w-20 hover:h-20`}
      style={{ backgroundColor: colour }}
      onClick={onClick}
    />
  );
}

export default AvatarBg;
