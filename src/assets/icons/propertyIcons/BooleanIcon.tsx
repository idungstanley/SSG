/* eslint-disable max-len */
import React from 'react';
import { PropertyIconProps } from './AltRouteIcon';

export default function BooleanIcon({ color }: PropertyIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_5967_48440" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_5967_48440)">
        <path
          d="M10.0075 17.5836C8.96423 17.5836 7.98173 17.3863 7.05995 16.9915C6.13816 16.5968 5.33134 16.0537 4.63949 15.3622C3.94763 14.6706 3.40425 13.8645 3.00935 12.9437C2.61444 12.0229 2.41699 11.0391 2.41699 9.99216C2.41699 8.94524 2.61435 7.96437 3.00908 7.04953C3.4038 6.13469 3.94692 5.33134 4.63845 4.63949C5.32999 3.94763 6.13615 3.40425 7.05693 3.00935C7.97771 2.61444 8.96155 2.41699 10.0085 2.41699C11.0554 2.41699 12.0362 2.61435 12.9511 3.00908C13.8659 3.4038 14.6693 3.94692 15.3611 4.63845C16.053 5.32999 16.5964 6.13453 16.9913 7.05206C17.3862 7.96958 17.5836 8.94995 17.5836 9.99316C17.5836 11.0364 17.3863 12.0189 16.9915 12.9407C16.5968 13.8625 16.0537 14.6693 15.3622 15.3611C14.6706 16.053 13.8661 16.5964 12.9486 16.9913C12.031 17.3862 11.0507 17.5836 10.0075 17.5836ZM10.0003 16.5003C11.8059 16.5003 13.3406 15.8684 14.6045 14.6045C15.8684 13.3406 16.5003 11.8059 16.5003 10.0003C16.5003 9.09753 16.3336 8.25378 16.0003 7.46906C15.667 6.68433 15.2017 5.99336 14.6045 5.39614L5.41697 14.5836C6.0003 15.1809 6.68433 15.6496 7.46905 15.9899C8.25378 16.3302 9.09753 16.5003 10.0003 16.5003ZM10.1125 12.8561V12.1125H13.8561V12.8561H10.1125ZM7.22468 9.46824H7.96824V7.96824H9.46824V7.22468H7.96824V5.72468H7.22468V7.22468H5.72468V7.96824H7.22468V9.46824Z"
          fill={color ? color : '#424242'}
        />
      </g>
    </svg>
  );
}