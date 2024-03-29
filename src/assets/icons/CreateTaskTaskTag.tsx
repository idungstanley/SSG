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
export default function CreateTaskTaskTag({ active, dimensions, color }: Props) {
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
        <rect x="2.5" y="3.45703" width="15" height="15" rx="2.5" fill="white" />
        <mask
          id="mask0_12559_186235"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="2"
          y="3"
          width="16"
          height="16"
        >
          <rect x="2.5" y="3.45703" width="15" height="15" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_12559_186235)">
          <path
            // eslint-disable-next-line max-len
            d="M11.0629 16.4106C10.9039 16.5692 10.7123 16.6485 10.4882 16.6485C10.264 16.6485 10.0726 16.5692 9.91391 16.4106L4.55453 11.0512C4.47831 10.9718 4.41859 10.8808 4.37538 10.7782C4.33216 10.6755 4.31055 10.573 4.31055 10.4707V6.08006C4.31055 5.85883 4.39066 5.66812 4.55088 5.50791C4.71108 5.34769 4.9018 5.26758 5.12303 5.26758H9.51366C9.61628 5.26758 9.71503 5.28494 9.80991 5.31967C9.90477 5.35439 9.9941 5.41278 10.0779 5.49483L15.4415 10.8529C15.6042 11.0156 15.6865 11.2085 15.6885 11.4316C15.6905 11.6548 15.6122 11.8457 15.4535 12.0043L11.0629 16.4106ZM10.4857 15.8301L14.879 11.4394L9.51634 6.08006H5.12303V10.4707L10.4857 15.8301ZM6.62233 8.3613C6.83914 8.3613 7.02367 8.28541 7.17591 8.13364C7.32815 7.98187 7.40427 7.79758 7.40427 7.58077C7.40427 7.36395 7.32838 7.17943 7.17661 7.02719C7.02484 6.87495 6.84055 6.79883 6.62373 6.79883C6.40692 6.79883 6.2224 6.87471 6.07016 7.02648C5.91792 7.17826 5.8418 7.36255 5.8418 7.57936C5.8418 7.79617 5.91768 7.9807 6.06945 8.13294C6.22122 8.28518 6.40552 8.3613 6.62233 8.3613Z"
            fill={active ? ICONS_INTERACTIONS.active : color && !active ? color : ICONS_INTERACTIONS.default}
          />
        </g>
      </svg>
    </div>
  );
}
