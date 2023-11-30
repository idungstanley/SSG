import React from 'react';
import nonWatcherBadge from '../../assets/icons/nonWatcherBadge.svg';
import { useAppSelector } from '../../app/hooks';

interface AvatarWithInitialsProps {
  initials: string;
  height?: string;
  width?: string;
  backgroundColour?: string;
  roundedStyle?: string;
  textSize?: string;
  textColor?: string;
  badge?: boolean;
}

function AvatarWithInitials({
  initials,
  textColor = 'white',
  height = '28px',
  width = '28px',
  backgroundColour = '#4D98F2',
  roundedStyle = 'circular',
  textSize = '10px',
  badge
}: AvatarWithInitialsProps) {
  const { CompactView } = useAppSelector((state) => state.task);

  const modeHeight = CompactView ? '19px' : height;
  const modeWidth = CompactView ? '19px' : width;

  return (
    <div className="relative flex items-center">
      <span
        className={`inline-flex items-center justify-center z-5 ${roundedStyle === 'circular' && 'rounded-full'} ${
          roundedStyle === 'rounded' && 'rounded'
        }`}
        style={{ backgroundColor: backgroundColour, height: modeHeight, width: modeWidth }}
      >
        <span className="font-bold leading-none " style={{ fontSize: textSize, color: textColor }}>
          {initials}
        </span>
      </span>
      {badge && (
        <img
          src={nonWatcherBadge}
          alt=""
          className="absolute w-2 h-2 z-5"
          style={CompactView ? { left: '16px', top: '12px' } : { left: '25px', bottom: '1px' }}
        />
      )}
    </div>
  );
}

export default AvatarWithInitials;
