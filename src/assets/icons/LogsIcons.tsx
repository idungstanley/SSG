import React from 'react';
import { IconProps } from './IconType';
import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

export default function LogsIcons({ active = false, dimensions, color, ...props }: IconProps) {
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
        d="M9.25532 17H4C3.44772 17 3 16.5523 3 16V4C3 3.44772 3.44772 3 4 3H15.7021C16.2544 3 16.7021 3.44772 16.7021 4V10.2917"
        stroke={active && color ? ICONS_INTERACTIONS.active : !active && color ? color : ICONS_INTERACTIONS.default}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M16.4043 9.70834H16.7021"
        stroke={active && color ? ICONS_INTERACTIONS.active : !active && color ? color : ICONS_INTERACTIONS.default}
        strokeWidth="1.2"
      />
      <path
        d="M14.3192 11.4583V17"
        stroke={active && color ? ICONS_INTERACTIONS.active : !active && color ? color : ICONS_INTERACTIONS.default}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M11.6383 13.7917C11.6383 13.7917 14.0213 11.1667 14.3192 11.1667C14.617 11.1667 17 13.7917 17 13.7917"
        stroke={active && color ? ICONS_INTERACTIONS.active : !active && color ? color : ICONS_INTERACTIONS.default}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M5.38298 7.375H12.8298M5.38298 10.2917H9.25532"
        stroke={active && color ? ICONS_INTERACTIONS.active : !active && color ? color : ICONS_INTERACTIONS.default}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
