import React from 'react';

function Drag() {
  return (
    <svg
      className="drag-svg text-[#adacac] hover:text-[#4b4949d3]"
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.998047" width="3" height="3" rx="0.5" className="fill-current" />
      <rect x="6.49805" width="3" height="3" rx="0.5" className="fill-current" />
      <rect x="0.998047" y="5.5" width="3" height="3" rx="0.5" className="fill-current" />
      <rect x="6.49805" y="5.5" width="3" height="3" rx="0.5" className="fill-current" />
      <rect x="0.998047" y="11" width="3" height="3" rx="0.5" className="fill-current" />
      <rect x="6.49805" y="11" width="3" height="3" rx="0.5" className="fill-current" />
    </svg>
  );
}

export default Drag;
