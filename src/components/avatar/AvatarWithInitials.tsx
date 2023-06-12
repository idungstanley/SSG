import React from 'react';
import assigneeCloth from '../../assets/icons/assigneeCloth.svg';
import nonWatcherBadge from '../../assets/icons/nonWatcherBadge.svg';

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
  height = 'h-7',
  width = 'w-7',
  backgroundColour = '#4D98F2',
  roundedStyle = 'circular',
  textSize = '10px',
  badge
}: AvatarWithInitialsProps) {
  return (
    <div className="relative">
      <span
        className={`inline-flex items-center justify-center z-50 ${height} ${width} ${
          roundedStyle === 'circular' && 'rounded-full'
        } ${roundedStyle === 'rounded' && 'rounded'}`}
        style={{ backgroundColor: backgroundColour }}
      >
        <span className="font-bold leading-none " style={{ fontSize: textSize, color: textColor }}>
          {initials}
        </span>
      </span>
      {badge && (
        <img src={nonWatcherBadge} alt="" className="absolute bottom-1.5 h-3 w-3 z-20" style={{ left: '27px' }} />
      )}
    </div>
  );
}

export default AvatarWithInitials;
