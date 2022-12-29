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
  textSize = 'text-sm',
}: AvatarWithInitialsProps) {
  return (
    <span
      className={`inline-flex items-center justify-center ${height} ${width} ${
        roundedStyle === 'circular' && 'rounded-full'
      } ${roundedStyle === 'rounded' && 'rounded-md'}`}
      style={{ backgroundColor: backgroundColour }}
    >
      <span className={`font-medium leading-none text-white ${textSize}`}>
        {initials}
      </span>
    </span>
  );
}

export default AvatarWithInitials;
