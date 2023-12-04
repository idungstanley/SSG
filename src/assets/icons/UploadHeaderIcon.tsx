/* eslint-disable max-len */
import React from 'react';

interface IUploadHeaderIconProps {
  color?: string;
}

export default function UploadHeaderIcon({ color }: IUploadHeaderIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_17851_120389" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_17851_120389)">
        <path
          d="M9.99998 12.9503C9.82263 12.9503 9.66719 12.8835 9.53365 12.75C9.4001 12.6165 9.33333 12.461 9.33333 12.2837V6.17948L7.7516 7.76121C7.61378 7.89903 7.45486 7.96928 7.27483 7.97194C7.09482 7.97461 6.9359 7.90703 6.79808 7.76921C6.65493 7.62606 6.58202 7.46714 6.57935 7.29246C6.57667 7.1178 6.64958 6.95621 6.79808 6.80771L9.43108 4.17471C9.52296 4.08284 9.61564 4.0174 9.70913 3.9784C9.8026 3.93941 9.89955 3.91992 9.99998 3.91992C10.1004 3.91992 10.1974 3.93941 10.2908 3.9784C10.3843 4.0174 10.477 4.08284 10.5689 4.17471L13.2019 6.80771C13.3397 6.94552 13.4113 7.1031 13.4166 7.28044C13.422 7.45779 13.3504 7.62071 13.2019 7.76921C13.0587 7.91238 12.8998 7.98263 12.7251 7.97996C12.5504 7.97728 12.3915 7.90437 12.2484 7.76121L10.6666 6.17948V12.2837C10.6666 12.461 10.5999 12.6165 10.4663 12.75C10.3328 12.8835 10.1773 12.9503 9.99998 12.9503ZM5.33975 16.25C4.89103 16.25 4.51389 16.0972 4.20833 15.7917C3.90278 15.4861 3.75 15.109 3.75 14.6603V13.1667C3.75 12.9893 3.81678 12.8339 3.95033 12.7003C4.08387 12.5668 4.23932 12.5 4.41667 12.5C4.59401 12.5 4.74946 12.5668 4.883 12.7003C5.01654 12.8339 5.08331 12.9893 5.08331 13.1667V14.6603C5.08331 14.7244 5.11002 14.7831 5.16344 14.8366C5.21687 14.89 5.27564 14.9167 5.33975 14.9167H14.6602C14.7243 14.9167 14.7831 14.89 14.8365 14.8366C14.8899 14.7831 14.9166 14.7244 14.9166 14.6603V13.1667C14.9166 12.9893 14.9834 12.8339 15.117 12.7003C15.2505 12.5668 15.4059 12.5 15.5833 12.5C15.7606 12.5 15.9161 12.5668 16.0496 12.7003C16.1832 12.8339 16.25 12.9893 16.25 13.1667V14.6603C16.25 15.109 16.0972 15.4861 15.7916 15.7917C15.4861 16.0972 15.1089 16.25 14.6602 16.25H5.33975Z"
          fill={color ? color : '#424242'}
        />
      </g>
    </svg>
  );
}