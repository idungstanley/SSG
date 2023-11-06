/* eslint-disable max-len */
import React from 'react';
import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';
import { IconProps } from './IconType';

export default function PropertyIcons({ active = false, dimensions, color, ...props }: IconProps) {
  return (
    <svg
      {...props}
      width={dimensions?.width ?? '20'}
      height={dimensions?.height ?? '20'}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.9411 3C6.68339 3 6.47449 3.20891 6.47449 3.46661C6.47449 3.72431 6.68339 3.93322 6.9411 3.93322H13.6603C14.2272 3.93322 14.6868 4.39282 14.6868 4.95976V14.6652C14.6868 15.2322 14.2272 15.6918 13.6603 15.6918H8.43425C7.8673 15.6918 7.4077 15.2322 7.4077 14.6652V11.3057C7.4077 11.0479 7.1988 10.839 6.9411 10.839C6.68339 10.839 6.47449 11.0479 6.47449 11.3057V14.6652C6.47449 15.7476 7.3519 16.625 8.43425 16.625H13.6603C14.7426 16.625 15.62 15.7476 15.62 14.6652V4.95976C15.62 3.87742 14.7426 3 13.6603 3H6.9411ZM7.44647 9.06593C7.44647 9.31332 7.24592 9.51387 6.99852 9.51387C6.75113 9.51387 6.55058 9.31332 6.55058 9.06593V8.02072H5.44795C5.20055 8.02072 5 7.82017 5 7.57278C5 7.32538 5.20055 7.12483 5.44795 7.12483H6.55058V5.70634C6.55058 5.45894 6.75113 5.25839 6.99852 5.25839C7.24592 5.25839 7.44647 5.45894 7.44647 5.70634V7.12483H8.43425C8.68164 7.12483 8.88219 7.32538 8.88219 7.57278C8.88219 7.82017 8.68164 8.02072 8.43425 8.02072H7.44647V9.06593Z"
        fill={active && color ? ICONS_INTERACTIONS.active : !active && color ? color : ICONS_INTERACTIONS.default}
      />
    </svg>
  );
}
