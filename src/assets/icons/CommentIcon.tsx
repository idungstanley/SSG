/* eslint-disable max-len */
import React from 'react';
import { IconProps } from './IconType';
import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

export default function CommentIcon({ active = false, dimensions, color, ...props }: IconProps) {
  return (
    <svg
      {...props}
      width={dimensions?.width ?? '21'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="mask0_4205_9693" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
        <rect x="0.799988" width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_4205_9693)">
        <path
          d="M8.39616 14.2628C8.00673 14.2628 7.6754 14.1262 7.40216 13.8529C7.12893 13.5797 6.99231 13.2484 6.99231 12.8589V12.2756H15.9715L16.2359 12.5401V6H16.8192C17.2086 6 17.5399 6.13662 17.8132 6.40985C18.0864 6.68309 18.223 7.01442 18.223 7.40383V15.266C18.223 15.5628 18.0863 15.769 17.8128 15.8844C17.5393 15.9999 17.297 15.9521 17.086 15.7411L15.6077 14.2628H8.39616ZM5.99068 10.7756L4.51372 12.2539C4.30289 12.465 4.06072 12.5124 3.7872 12.3964C3.5137 12.2803 3.37695 12.073 3.37695 11.7745V3.82054C3.37695 3.43111 3.51357 3.09978 3.78681 2.82654C4.06004 2.55331 4.39138 2.41669 4.78081 2.41669H13.3321C13.7215 2.41669 14.0528 2.55331 14.326 2.82654C14.5993 3.09978 14.7359 3.43111 14.7359 3.82054V9.37179C14.7359 9.76121 14.5993 10.0925 14.326 10.3658C14.0528 10.639 13.7215 10.7756 13.3321 10.7756H5.99068ZM13.6526 9.69231V3.5H4.46027V10.2693L5.03722 9.69231H13.6526Z"
          fill={active && color ? ICONS_INTERACTIONS.active : !active && color ? color : ICONS_INTERACTIONS.default}
        />
      </g>
    </svg>
  );
}
