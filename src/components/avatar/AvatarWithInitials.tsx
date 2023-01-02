import React from 'react';

interface AvatarWithInitialsProps {
  initials: string;
  height?: string;
  width?: string;
  backgroundColour?: string;
  roundedStyle?: string;
  textSize?: string;
}
function AvatarWithInitials({
  initials,
  height = 'h-10',
  width = 'w-10',
  backgroundColour = '#6B7280',
  roundedStyle = 'circular',
  textSize = '8px ',
}: AvatarWithInitialsProps) {
  return (
    <span
      className={`inline-flex p-1 items-center justify-center ${height} ${width} ${
        roundedStyle === 'circular' && 'rounded-full'
      } ${roundedStyle === 'rounded' && 'rounded'}`}
      style={{ backgroundColor: backgroundColour }}
    >
      <span
        className="font-medium leading-none text-white"
        style={{ fontSize: textSize }}
      >
        {initials}
      </span>
    </span>
  );
}

export default AvatarWithInitials;
