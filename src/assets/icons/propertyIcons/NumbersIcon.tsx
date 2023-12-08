/* eslint-disable max-len */
import React from 'react';
import { PropertyIconProps } from './AltRouteIcon';

export default function NumbersIcon({ color }: PropertyIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_4980_219865" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_4980_219865)">
        <path
          d="M7.66511 13.1154L7.14588 15.234C7.11489 15.3579 7.05213 15.4524 6.95758 15.5176C6.86303 15.5828 6.75646 15.6154 6.63788 15.6154C6.47121 15.6154 6.33286 15.5518 6.22283 15.4247C6.11279 15.2975 6.08448 15.148 6.1379 14.976L6.59783 13.1154H4.327C4.16033 13.1154 4.01717 13.0462 3.89752 12.9078C3.77787 12.7695 3.74475 12.6143 3.79817 12.4423C3.83449 12.3237 3.89858 12.2257 3.99046 12.1482C4.08233 12.0708 4.19451 12.0321 4.327 12.0321H6.86867L7.75969 8.46794H5.23886C5.07219 8.46794 4.92903 8.39876 4.80938 8.26041C4.68972 8.12207 4.65661 7.96689 4.71002 7.79489C4.74634 7.6763 4.81044 7.57827 4.90231 7.50083C4.99419 7.42337 5.10637 7.38464 5.23886 7.38464H8.03052L8.67475 4.76604C8.70572 4.64211 8.76849 4.54756 8.86304 4.48239C8.95758 4.41723 9.06415 4.38464 9.18275 4.38464C9.3494 4.38464 9.48775 4.44821 9.59779 4.57533C9.70783 4.70247 9.73615 4.85204 9.68273 5.02404L9.09779 7.38464H12.21L12.8542 4.76604C12.8852 4.64211 12.948 4.54756 13.0425 4.48239C13.1371 4.41723 13.2436 4.38464 13.3622 4.38464C13.5289 4.38464 13.6672 4.44821 13.7773 4.57533C13.8873 4.70247 13.9156 4.85204 13.8622 5.02404L13.2773 7.38464H15.6731C15.8398 7.38464 15.9829 7.45382 16.1026 7.59216C16.2222 7.73051 16.2553 7.88569 16.2019 8.05771C16.1656 8.17629 16.1015 8.27431 16.0096 8.35177C15.9178 8.42921 15.8056 8.46794 15.6731 8.46794H13.0064L12.1154 12.0321H14.7612C14.9279 12.0321 15.0711 12.1012 15.1907 12.2396C15.3104 12.3779 15.3435 12.5331 15.2901 12.7051C15.2537 12.8237 15.1896 12.9217 15.0978 12.9992C15.0059 13.0766 14.8937 13.1154 14.7612 13.1154H11.8446L11.3253 15.234C11.2944 15.3579 11.2316 15.4524 11.137 15.5176C11.0425 15.5828 10.9359 15.6154 10.8173 15.6154C10.6507 15.6154 10.5123 15.5518 10.4023 15.4247C10.2923 15.2975 10.2639 15.148 10.3174 14.976L10.7773 13.1154H7.66511ZM7.93594 12.0321H11.0481L11.9391 8.46794H8.82696L7.93594 12.0321Z"
          fill={color ? color : '#424242'}
        />
      </g>
    </svg>
  );
}