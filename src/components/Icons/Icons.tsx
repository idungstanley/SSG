import React from 'react';

interface IconProps {
  src: string;
}
function Icons({ src }: IconProps) {
  return (
    <div className="w-5 h-5">
      <img src={src} alt="" className="w-full h-full text-red" style={{ fill: 'red' }} />
    </div>
  );
}

export default Icons;
