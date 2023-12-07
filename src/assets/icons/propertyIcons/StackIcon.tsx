/* eslint-disable max-len */
import React from 'react';

export default function StackIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.00039 9.37716C7.90612 9.37716 7.8141 9.36547 7.72435 9.34208C7.6346 9.3187 7.54749 9.28326 7.46302 9.23574L2.68322 6.63373C2.57952 6.57716 2.50636 6.50645 2.46375 6.42161C2.42114 6.33676 2.40002 6.24248 2.4004 6.13878C2.4004 6.03507 2.4217 5.9408 2.46431 5.85595C2.50693 5.7711 2.5799 5.70039 2.68322 5.64383L7.46302 3.04181C7.54787 2.99468 7.63517 2.95923 7.72492 2.93547C7.81467 2.91171 7.90649 2.90002 8.00039 2.9004C8.09467 2.9004 8.18668 2.91228 8.27643 2.93604C8.36618 2.95979 8.45329 2.99505 8.53776 3.04181L13.3176 5.64383C13.4213 5.70039 13.4944 5.7711 13.537 5.85595C13.5796 5.9408 13.6008 6.03507 13.6004 6.13878C13.6004 6.24248 13.5793 6.33676 13.537 6.42161C13.4948 6.50645 13.4216 6.57716 13.3176 6.63373L8.53776 9.23574C8.45292 9.28288 8.3658 9.31833 8.27643 9.34208C8.18706 9.36584 8.09504 9.37753 8.00039 9.37716ZM8.00039 8.24584L11.861 6.13878L8.00039 4.03171L4.13979 6.13878L8.00039 8.24584ZM8.00039 10.5085L12.4408 8.09029C12.4596 8.08086 12.5492 8.05729 12.7095 8.01958C12.8697 8.01958 13.0042 8.07388 13.1128 8.18249C13.2214 8.2911 13.2755 8.42535 13.2751 8.58524C13.2751 8.68894 13.2516 8.78322 13.2044 8.86807C13.1573 8.95291 13.0819 9.02362 12.9782 9.08019L8.53776 11.4984C8.45292 11.5455 8.3658 11.5809 8.27643 11.6047C8.18706 11.6285 8.09504 11.6402 8.00039 11.6398C7.90612 11.6398 7.8141 11.6281 7.72435 11.6047C7.6346 11.5813 7.54749 11.5459 7.46302 11.4984L3.02262 9.08019C2.91891 9.02362 2.84349 8.95291 2.79635 8.86807C2.74922 8.78322 2.72565 8.68894 2.72565 8.58524C2.72565 8.42497 2.77995 8.29072 2.88856 8.18249C2.99716 8.07426 3.13141 8.01996 3.2913 8.01958C3.33844 8.01958 3.38332 8.02675 3.42593 8.04108C3.46854 8.05541 3.51323 8.07181 3.55999 8.09029L8.00039 10.5085ZM8.00039 12.7711L12.4408 10.3529C12.4596 10.3435 12.5492 10.3199 12.7095 10.2822C12.8697 10.2822 13.0042 10.3365 13.1128 10.4451C13.2214 10.5537 13.2755 10.688 13.2751 10.8479C13.2751 10.9516 13.2516 11.0458 13.2044 11.1307C13.1573 11.2155 13.0819 11.2862 12.9782 11.3428L8.53776 13.761C8.45292 13.8081 8.3658 13.8436 8.27643 13.8673C8.18706 13.8911 8.09504 13.9028 8.00039 13.9024C7.90612 13.9024 7.8141 13.8907 7.72435 13.8673C7.6346 13.8439 7.54749 13.8085 7.46302 13.761L3.02262 11.3428C2.91891 11.2862 2.84349 11.2155 2.79635 11.1307C2.74922 11.0458 2.72565 10.9516 2.72565 10.8479C2.72565 10.6876 2.77995 10.5533 2.88856 10.4451C2.99716 10.3369 3.13141 10.2826 3.2913 10.2822C3.33844 10.2822 3.38332 10.2894 3.42593 10.3037C3.46854 10.318 3.51323 10.3344 3.55999 10.3529L8.00039 12.7711Z"
        fill={color ? color : '#424242'}
      />
    </svg>
  );
}
