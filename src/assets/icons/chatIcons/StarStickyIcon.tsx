/* eslint-disable max-len */
import React from 'react';

interface Props {
  color?: string;
}

export default function StarStickyIcon({ color }: Props) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.12055 7.96091L4.98721 6.85258L6.86846 7.96091L6.37263 5.86091L7.99138 4.47549L5.84763 4.28591L4.98721 2.28799L4.1268 4.28591L1.98305 4.47549L3.61638 5.86091L3.12055 7.96091ZM1.96849 9.52801L2.77505 6.14809L0.0996094 3.87422L3.60855 3.56911L4.98721 0.379883L6.36588 3.5837L9.87482 3.87422L7.19937 6.14809L8.00593 9.52801L4.98721 7.73541L1.96849 9.52801Z"
        fill={color ? color : '#282828'}
      />
    </svg>
  );
}
