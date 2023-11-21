import React, { useState } from 'react';

export default function OpenSubtask() {
  const [color, setColor] = useState('black');
  return (
    <div onMouseEnter={() => setColor('#BF01FE')} onMouseLeave={() => setColor('black')}>
      <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.75164 8.69927L4.84223 6.31038C4.89202 6.27187 4.93199 6.22411 4.95939 6.17036C4.98679 6.11661 5.00098 6.05815 5.00098 5.99899C5.00098 5.93983 4.98679 5.88138 4.95939 5.82763C4.93199 5.77388 4.89202 5.72611 4.84223 5.68761L1.75164 3.29872C1.45664 3.07073 1.00098 3.25975 1.00098 3.6101V8.38857C1.00098 8.73892 1.45664 8.92794 1.75164 8.69927Z"
          fill={color}
          fillOpacity="0.35"
        />
      </svg>
    </div>
  );
}
