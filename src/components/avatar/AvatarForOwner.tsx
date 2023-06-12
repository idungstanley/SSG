import React from 'react';
import watcherBadge from '../../assets/icons/watcherBadge.svg';
import AssigneeCloth from '../../assets/icons/assigneeCloth';

interface AvatarWithInitialsProps {
  initials: string;
  height?: string;
  width?: string;
  backgroundColour?: string;
  roundedStyle?: string;
  textSize?: string;
  textColor?: string;
}

function AvatarForOwner({
  initials,
  textColor = 'white',
  height = 'h-7',
  width = 'w-7',
  backgroundColour = '#35C6BE',
  roundedStyle = 'circular',
  textSize = '10px'
}: AvatarWithInitialsProps) {
  return (
    <AssigneeCloth>
      <div className="absolute" style={{ left: '1px', top: '1px' }}>
        <span
          className={`inline-flex items-center justify-center z-10 relative ${height} ${width} ${
            roundedStyle === 'circular' && 'rounded-full'
          } ${roundedStyle === 'rounded' && 'rounded'}`}
          style={{ backgroundColor: backgroundColour }}
        >
          <span className="font-bold leading-none " style={{ fontSize: textSize, color: textColor }}>
            {initials}
          </span>
        </span>
        <img src={watcherBadge} alt="" className="absolute bottom-0.5 h-3 w-3 z-20" style={{ left: '22px' }} />
      </div>
    </AssigneeCloth>
  );
}

export default AvatarForOwner;
