import React from 'react';

interface InitialsAvatarProps {
  size: number;
  colour: string;
  initials: string;
}

function InitialsAvatar({ size, colour, initials }: InitialsAvatarProps) {
  return (
    <div
      className={`h-${size} w-${size} rounded-full flex-shrink-0 flex items-center justify-center text-white font-medium`}
      style={{
        backgroundColor: colour,
        fontSize: size === 6 ? '0.6rem' : '0.85rem',
      }}
    >
      {initials}
    </div>
  );
}
export default InitialsAvatar;
