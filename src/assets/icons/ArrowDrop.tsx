import React from 'react';

export default function ArrowDrop({ color }: { color: string }) {
  return (
    <div>
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="arrow_drop_down">
          <mask
            id="mask0_10220_2885"
            style={{ maskType: 'alpha' }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="21"
            height="20"
          >
            <rect id="Bounding box" x="0.5" width="20" height="20" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_10220_2885)">
            <path
              id="arrow_drop_down_2"
              d="M10.0242 11.4102L8.59145 9.97756C8.3671 9.7532 8.31181 9.49252 8.42559 9.19552C8.53937 8.89851 8.76026 8.75 9.08826 8.75H12.0065C12.3206 8.75 12.5346 8.89851 12.6484 9.19552C12.7621 9.49252 12.7068 9.7532 12.4825 9.97756L11.0498 11.4102C10.9771 11.4829 10.8959 11.5382 10.8062 11.5761C10.7165 11.6141 10.6267 11.633 10.537 11.633C10.4472 11.633 10.3575 11.6141 10.2677 11.5761C10.178 11.5382 10.0968 11.4829 10.0242 11.4102Z"
              fill={color}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
