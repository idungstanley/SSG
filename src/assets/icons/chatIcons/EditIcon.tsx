/* eslint-disable max-len */
import React from 'react';

interface Props {
  color?: string;
}

export default function EditIcon({ color }: Props) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_5348_140128)">
        <rect width="14" height="14" rx="1.75" fill="white" />
        <mask id="mask0_5348_140128" maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
          <rect width="14" height="14" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_5348_140128)">
          <path
            d="M3.06612 11.025H3.83117L9.1014 5.75481L8.33634 4.98974L3.06612 10.26V11.025ZM11.0746 5.12212L8.97463 3.01094L9.63872 2.34684C9.82569 2.15989 10.0467 2.06641 10.3017 2.06641C10.5567 2.06641 10.7777 2.15989 10.9647 2.34684L11.7443 3.12648C11.9215 3.30372 12.0083 3.52658 12.0045 3.79506C12.0008 4.06354 11.9103 4.28639 11.7331 4.46363L11.0746 5.12212ZM2.68921 11.9583C2.5389 11.9583 2.40858 11.9032 2.29827 11.7929C2.18797 11.6826 2.13281 11.5522 2.13281 11.4019V10.0782C2.13281 10.0079 2.14552 9.94101 2.17095 9.87744C2.19637 9.81387 2.23638 9.75479 2.29098 9.7002L8.32736 3.66381L10.4273 5.76378L4.39094 11.8002C4.33635 11.8548 4.27727 11.8948 4.21371 11.9202C4.15013 11.9456 4.0832 11.9583 4.0129 11.9583H2.68921Z"
            fill={color ? color : '#919191'}
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_5348_140128">
          <rect width="14" height="14" rx="1.75" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
