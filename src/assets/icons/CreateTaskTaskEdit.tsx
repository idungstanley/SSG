import React from 'react';
import ICONS_INTERACTIONS from '../../utils/Constants/IconInteractions';

interface Props {
  active?: boolean;
  dimensions?: {
    height: number;
    width: number;
  };
  color?: string;
}

export default function CreateTaskTaskEdit({ active, dimensions, color }: Props) {
  return (
    <div>
      <svg
        width={dimensions?.width ?? '27'}
        height={dimensions?.height ?? '28'}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="0.957031" width="20" height="20" rx="4.16667" fill="#F4F4F4" />
        <path
          // eslint-disable-next-line max-len
          d="M15.7113 12.3285L14.4613 11.0785C14.3831 11.0003 14.2772 10.9565 14.1667 10.9565C14.0562 10.9565 13.9502 11.0003 13.8721 11.0785L10 14.9505V16.7897H11.8392L15.7113 12.9176C15.7894 12.8395 15.8332 12.7335 15.8332 12.623C15.8332 12.5126 15.7894 12.4066 15.7113 12.3285ZM11.4942 15.9564H10.8333V15.2955L12.9167 13.2122L13.5775 13.873L11.4942 15.9564ZM14.1667 13.2839L13.5058 12.623L14.1667 11.9622L14.8275 12.623L14.1667 13.2839ZM10.8333 11.7897V10.123H11.6667V11.7897H10.8333ZM9.16667 11.7897V9.28971H10V11.7897H9.16667ZM7.5 11.7897V7.62305H8.33333V11.7897H7.5Z"
          fill={active ? ICONS_INTERACTIONS.active : color && !active ? color : ICONS_INTERACTIONS.default}
        />
        <path
          d="M8.33333 16.7897H5.83333C5.61239 16.7895 5.40055 16.7016 5.24432 16.5454C5.08809 16.3892 5.00022 16.1773 5 15.9564V5.95638C5.00022 5.73543 5.08809 5.5236 5.24432 5.36737C5.40055 5.21114 5.61239 5.12327 5.83333 5.12305H12.5C12.7209 5.12327 12.9328 5.21114 13.089 5.36737C13.2452 5.5236 13.3331 5.73543 13.3333 5.95638V10.123H12.5V5.95638H5.83333V15.9564H8.33333V16.7897Z"
          fill={active ? ICONS_INTERACTIONS.active : color && !active ? color : ICONS_INTERACTIONS.default}
        />
      </svg>
    </div>
  );
}
