/* eslint-disable max-len */
import React from 'react';

interface ITimeChartIconProps {
  color?: string;
}

export default function TimeChartIcon({ color }: ITimeChartIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.79883 3.99609L3.79883 15.9961"
        stroke={color ? color : '#424242'}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M16.2988 16.5961C16.6302 16.5961 16.8988 16.3275 16.8988 15.9961C16.8988 15.6647 16.6302 15.3961 16.2988 15.3961V16.5961ZM16.2988 15.3961L3.79883 15.3961V16.5961H16.2988V15.3961Z"
        fill={color ? color : '#424242'}
      />
      <path
        d="M3.79883 11.4961C3.79883 11.4961 7.29593 8.44638 7.70508 8.49671C8.11422 8.54704 11.2207 11.2461 11.2988 11.1962C11.377 11.1462 14.3462 9.55091 16.2988 8.49671"
        stroke={color ? color : '#424242'}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
