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
  textSize = '10px'
}: AvatarWithInitialsProps) {
  const { CompactView, CompactViewWrap } = useAppSelector((state) => state.task);
  return (
    <div className="relative ">
      <span
        className={`inline-flex  items-center justify-center ${height} ${width} ${
          roundedStyle === 'circular' && 'rounded-full'
        } ${roundedStyle === 'rounded' && 'rounded'}`}
        style={{ backgroundColor: backgroundColour }}
      >
        <span
          className="font-bold leading-none "
          style={{ fontSize: `${CompactView || CompactViewWrap ? '10px' : textSize}`, color: textColor }}
        >
          {initials}
        </span>
      </span>
    </div>
  );
}

export default AvatarWithInitials;
