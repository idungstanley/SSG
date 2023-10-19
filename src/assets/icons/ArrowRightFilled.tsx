import React from 'react';
import interactions from '../../utils/Constants/IconInteractions';

interface Props {
  active?: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
  color?: string;
}
function ArrowRightFilled({ active, dimensions, color }: Props) {
  return (
    <svg width="6" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.61786 5.80083L4.70844 3.41194C4.75823 3.37344 4.7982 3.32567 4.8256 3.27192C4.853 3.21817 4.86719 3.15971 4.86719 3.10056C4.86719 3.0414 4.853 2.98294 4.8256 2.92919C4.7982 2.87544 4.75823 2.82768 4.70844 2.78917L1.61786 0.400281C1.32286 0.172296 0.867188 0.361315 0.867188 0.711667V5.49013C0.867188 5.84048 1.32286 6.0295 1.61786 5.80083Z"
        fill="#919191"
      />
    </svg>
  );
}

export default ArrowRightFilled;
