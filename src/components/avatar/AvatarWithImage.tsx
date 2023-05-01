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
      <img
        className={`inline-flex items-center justify-center  ${height} ${width} ${
          roundedStyle === 'circular' && 'rounded-full'
        } ${roundedStyle === 'rounded' && 'rounded'}`}
        src={image_path}
      />
    </div>
  );
}

// <div className="relative ">
//   <span
//     className={`inline-flex  items-center justify-center ${height} ${width} ${
//       roundedStyle === 'circular' && 'rounded-full'
//     } ${roundedStyle === 'rounded' && 'rounded'}`}
//   >
//     <img className="w-full h-full rounded-full cursor-pointer" src={image_path} alt="avatar" />
//   </span>
// </div>

export default AvatarWithImage;
