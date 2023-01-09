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
      className={`rounded-full w-${size} h-${size}`}
      style={{ backgroundColor: colour }}
      onClick={onClick}
    />
  );
}

export default AvatarBg;
