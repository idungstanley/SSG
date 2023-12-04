/* eslint-disable max-len */
import React from 'react';

interface IMapIconProps {
  color?: string;
}

export default function MapIcon({ color }: IMapIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_17845_163593" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_17845_163593)">
        <path
          d="M9.99998 13.9728C11.4028 12.8467 12.4687 11.7524 13.1979 10.6899C13.9271 9.6274 14.2917 8.6177 14.2917 7.66081C14.2917 6.85397 14.1457 6.16599 13.8539 5.59688C13.562 5.02776 13.2003 4.56694 12.7687 4.2144C12.3371 3.86187 11.8722 3.60605 11.374 3.44694C10.8758 3.28784 10.4204 3.20829 10.0076 3.20829C9.59486 3.20829 9.13835 3.28784 8.6381 3.44694C8.13785 3.60605 7.67103 3.86187 7.23765 4.2144C6.80424 4.56694 6.441 5.02776 6.14792 5.59688C5.85483 6.16599 5.70829 6.85397 5.70829 7.66081C5.70829 8.6177 6.07287 9.6274 6.80204 10.6899C7.53122 11.7524 8.5972 12.8467 9.99998 13.9728ZM9.99929 15.3798C9.89078 15.3798 9.78523 15.3651 9.68265 15.3357C9.58006 15.3063 9.48338 15.2596 9.3926 15.1955C7.69924 13.8557 6.43963 12.5643 5.61377 11.3213C4.78792 10.0782 4.375 8.86091 4.375 7.66931C4.375 6.71872 4.54193 5.8818 4.87579 5.15856C5.20967 4.43533 5.64806 3.83172 6.19096 3.34775C6.73386 2.86378 7.34028 2.49733 8.01023 2.2484C8.68017 1.99947 9.34342 1.875 9.99998 1.875C10.6704 1.875 11.3371 1.99947 12.0001 2.2484C12.6631 2.49733 13.2661 2.86378 13.809 3.34775C14.3519 3.83172 14.7903 4.43395 15.1242 5.15442C15.458 5.87488 15.625 6.71317 15.625 7.66931C15.625 8.86091 15.212 10.0782 14.3862 11.3213C13.5603 12.5643 12.3007 13.8557 10.6074 15.1955C10.5155 15.2596 10.4183 15.3063 10.3158 15.3357C10.2133 15.3651 10.1078 15.3798 9.99929 15.3798ZM10.0026 9.04163C10.4196 9.04163 10.7735 8.89547 11.0641 8.60317C11.3547 8.31085 11.5 7.95615 11.5 7.53906C11.5 7.12198 11.3538 6.76815 11.0615 6.47756C10.7692 6.18697 10.4145 6.04167 9.9974 6.04167C9.58031 6.04167 9.22648 6.18782 8.9359 6.48013C8.6453 6.77245 8.5 7.12715 8.5 7.54423C8.5 7.96131 8.64615 8.31515 8.93846 8.60573C9.23078 8.89633 9.58548 9.04163 10.0026 9.04163ZM5.0389 18.125C4.86365 18.125 4.70919 18.0581 4.57552 17.9244C4.44184 17.7906 4.375 17.6352 4.375 17.458C4.375 17.2809 4.44184 17.1255 4.57552 16.992C4.70919 16.8584 4.86365 16.7917 5.0389 16.7917H14.9611C15.1363 16.7917 15.2908 16.8585 15.4245 16.9923C15.5581 17.126 15.625 17.2814 15.625 17.4586C15.625 17.6358 15.5581 17.7911 15.4245 17.9246C15.2908 18.0582 15.1363 18.125 14.9611 18.125L5.0389 18.125Z"
          fill={color ? color : '#424242'}
          opacity="1"
        />
      </g>
    </svg>
  );
}
