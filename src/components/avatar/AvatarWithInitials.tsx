import React from 'react';
import { useAppSelector } from '../../app/hooks';
interface AvatarWithInitialsProps {
  initials: string;
  height?: string;
  width?: string;
  backgroundColour?: string;
  roundedStyle?: string;
  textSize?: string;
  textColor?: string;
}

function AvatarWithInitials({
  initials,
  textColor = 'white',
  height = 'h-10',
  width = 'w-10',
  backgroundColour = '#6B7280',
  roundedStyle = 'circular',
  textSize = '12px'
}: AvatarWithInitialsProps) {
  const { CompactView, CompactViewWrap } = useAppSelector((state) => state.task);
  return (
    <span
      className={`inline-flex p-1 items-center justify-center  ${height} ${width} ${
        roundedStyle === 'circular' && 'rounded-full'
      } ${roundedStyle === 'rounded' && 'rounded'}`}
      style={{ backgroundColor: backgroundColour }}
    >
      <span
        className="font-bold leading-none "
        style={{ fontSize: `${CompactView || CompactViewWrap ? '7px' : textSize}`, color: textColor }}
      >
        {initials}
      </span>
    </span>
  );
}

export default AvatarWithInitials;
