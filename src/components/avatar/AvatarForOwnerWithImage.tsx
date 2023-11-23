import React from 'react';
import AssigneeCloth from '../../assets/icons/assigneeCloth';
import OwnerBadge from '../../assets/icons/watcherBadge.svg';
import { useAppSelector } from '../../app/hooks';

interface AvatarWithInitialsProps {
  image_path: string;
  height?: string;
  width?: string;
  roundedStyle?: string;
}

function AvatarForOwnerWithImage({ image_path, roundedStyle = 'circular' }: AvatarWithInitialsProps) {
  const { CompactView } = useAppSelector((state) => state.task);
  return (
    <AssigneeCloth height={CompactView ? '18' : '32'} width={CompactView ? '18' : '32'}>
      <div className="absolute" style={CompactView ? { left: '1px', top: '1px' } : { left: '2px', top: '2px' }}>
        <img
          className={`${CompactView ? 'h-4 w-4' : 'h-7 w-7'} ${roundedStyle === 'circular' && 'rounded-full'} ${
            roundedStyle === 'rounded' && 'rounded'
          }`}
          src={image_path}
        />
        <img
          src={OwnerBadge}
          alt=""
          className="absolute w-2 h-2 z-5"
          style={CompactView ? { left: '16px', bottom: '0.5px' } : { left: '23px', bottom: '1px' }}
        />
      </div>
    </AssigneeCloth>
  );
}

export default AvatarForOwnerWithImage;
