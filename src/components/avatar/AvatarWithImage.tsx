import React from 'react';

interface AvatarWithInitialsProps {
  image_path: string;
  height?: string;
  width?: string;
  roundedStyle?: string;
}

function AvatarWithImage({
  image_path,
  height = 'h-10',
  width = 'w-10',
  roundedStyle = 'circular'
}: AvatarWithInitialsProps) {
  return (
    <div className="relative">
      <span className={`${height} ${width} ${roundedStyle} flex items-center justify-center `}>
        <img
          className={` ${height} ${width} ${roundedStyle === 'circular' && 'rounded-full'} ${
            roundedStyle === 'rounded' && 'rounded'
          }`}
          src={image_path}
        />
      </span>
    </div>
  );
}

export default AvatarWithImage;
