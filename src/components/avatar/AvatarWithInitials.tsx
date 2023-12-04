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
  height = 'h-7',
  width = 'w-7',
  backgroundColour = '#4D98F2',
  roundedStyle = 'circular',
  textSize = '8px',
  badge
}: AvatarWithInitialsProps) {
  const { CompactView } = useAppSelector((state) => state.task);

  const modeHeight = CompactView ? '19px' : '28px';
  const modeWidth = CompactView ? '19px' : '28px';

  return (
    <div className="relative flex items-center">
      <span
        className={`inline-flex items-center justify-center z-5 ${height} ${width} ${
          roundedStyle === 'circular' && 'rounded-full'
        } ${roundedStyle === 'rounded' && 'rounded'}`}
        style={{
          backgroundColor: backgroundColour,
          height: modeHeight,
          width: modeWidth
        }}
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
