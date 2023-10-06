import React from 'react';
import AssigneeCloth from '../../assets/icons/assigneeCloth';
import OwnerBadge from '../../assets/icons/watcherBadge.svg';

interface AvatarWithInitialsProps {
  image_path: string;
  height?: string;
  width?: string;
  roundedStyle?: string;
}

function AvatarForOwnerWithImage({
  image_path,
  height = 'h-7',
  width = 'w-7',
  roundedStyle = 'circular'
}: AvatarWithInitialsProps) {
  return (
    <AssigneeCloth>
      <div className="absolute" style={{ left: '2px', top: '2px' }}>
        <span className={`${height} ${width} ${roundedStyle} flex items-center justify-center bg-red-500 `}>
          <img
            className={` ${height} ${width} ${roundedStyle === 'circular' && 'rounded-full'} ${
              roundedStyle === 'rounded' && 'rounded'
            }`}
            src={image_path}
          />
        </span>
        <img src={OwnerBadge} alt="" className="absolute h-2 w-2 z-5" style={{ left: '23px', bottom: '1px' }} />
      </div>
    </AssigneeCloth>
  );
}

export default AvatarForOwnerWithImage;
