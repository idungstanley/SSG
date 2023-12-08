/* eslint-disable max-len */
import React from 'react';
import { PropertyIconProps } from './AltRouteIcon';

export default function AbOptionIcon({ color }: PropertyIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.90625 7.06693H10.3656C10.4595 7.52557 10.7089 7.93773 11.0716 8.23371C11.4343 8.5297 11.8881 8.69136 12.3562 8.69136C12.8244 8.69136 13.2782 8.5297 13.6409 8.23371C14.0036 7.93773 14.253 7.52557 14.3469 7.06693H16.0938C16.2015 7.06693 16.3048 7.02413 16.381 6.94794C16.4572 6.87176 16.5 6.76843 16.5 6.66068C16.5 6.55294 16.4572 6.44961 16.381 6.37342C16.3048 6.29723 16.2015 6.25443 16.0938 6.25443H14.3469C14.253 5.79579 14.0036 5.38364 13.6409 5.08765C13.2782 4.79166 12.8244 4.63 12.3562 4.63C11.8881 4.63 11.4343 4.79166 11.0716 5.08765C10.7089 5.38364 10.4595 5.79579 10.3656 6.25443H3.90625C3.79851 6.25443 3.69517 6.29723 3.61899 6.37342C3.5428 6.44961 3.5 6.55294 3.5 6.66068C3.5 6.76843 3.5428 6.87176 3.61899 6.94794C3.69517 7.02413 3.79851 7.06693 3.90625 7.06693ZM12.3562 5.44194C12.6795 5.44194 12.9895 5.57034 13.218 5.7989C13.4466 6.02746 13.575 6.33745 13.575 6.66068C13.575 6.98391 13.4466 7.29391 13.218 7.52247C12.9895 7.75103 12.6795 7.87943 12.3562 7.87943C12.033 7.87943 11.723 7.75103 11.4945 7.52247C11.2659 7.29391 11.1375 6.98391 11.1375 6.66068C11.1375 6.33745 11.2659 6.02746 11.4945 5.7989C11.723 5.57034 12.033 5.44194 12.3562 5.44194ZM3.90625 13.2419H5.73438C5.82826 13.7006 6.07763 14.1127 6.44034 14.4087C6.80305 14.7047 7.25685 14.8663 7.725 14.8663C8.19315 14.8663 8.64695 14.7047 9.00966 14.4087C9.37237 14.1127 9.62174 13.7006 9.71562 13.2419H16.0938C16.2015 13.2419 16.3048 13.1991 16.381 13.1229C16.4572 13.0467 16.5 12.9434 16.5 12.8357C16.5 12.7279 16.4572 12.6246 16.381 12.5484C16.3048 12.4722 16.2015 12.4294 16.0938 12.4294H9.71562C9.62174 11.9708 9.37237 11.5586 9.00966 11.2626C8.64695 10.9666 8.19315 10.805 7.725 10.805C7.25685 10.805 6.80305 10.9666 6.44034 11.2626C6.07763 11.5586 5.82826 11.9708 5.73438 12.4294H3.90625C3.79851 12.4294 3.69517 12.4722 3.61899 12.5484C3.5428 12.6246 3.5 12.7279 3.5 12.8357C3.5 12.9434 3.5428 13.0467 3.61899 13.1229C3.69517 13.1991 3.79851 13.2419 3.90625 13.2419ZM7.725 11.6169C8.04823 11.6169 8.35823 11.7453 8.58679 11.9739C8.81535 12.2024 8.94375 12.5124 8.94375 12.8357C8.94375 13.1589 8.81535 13.4689 8.58679 13.6974C8.35823 13.926 8.04823 14.0544 7.725 14.0544C7.40177 14.0544 7.09177 13.926 6.86321 13.6974C6.63465 13.4689 6.50625 13.1589 6.50625 12.8357C6.50625 12.5124 6.63465 12.2024 6.86321 11.9739C7.09177 11.7453 7.40177 11.6169 7.725 11.6169Z"
        fill={color ? color : '#424242'}
      />
    </svg>
  );
}