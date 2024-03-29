import React from 'react';

interface iconProps {
  color?: string;
  dimension?: {
    width: string;
    height: string;
  };
}

export default function SubtaskIcon({ color = '#424242', dimension }: iconProps) {
  return (
    <div>
      <svg
        width={dimension?.width ?? '18'}
        height={dimension?.height ?? '18'}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Subtask">
          <g id="Group 843">
            <g id="Group 823">
              <path
                id="Vector 16"
                d="M2 5.9V3.1C2 3.04477 2.04477 3 2.1 3H9.9C9.95523 3 10 3.04477 10 3.1V5.9C10 5.95523 9.95523 6 9.9 6H2.1C2.04477 6 2 5.95523 2 5.9Z"
                stroke={color}
              />
              <path
                id="Vector 21"
                d="M6 10.9V8.1C6 8.04477 6.04477 8 6.1 8H13.9C13.9552 8 14 8.04477 14 8.1V10.9C14 10.9552 13.9552 11 13.9 11H6.1C6.04477 11 6 10.9552 6 10.9Z"
                stroke={color}
              />
              <path
                id="Vector 22"
                d="M10 15.9V13.1C10 13.0448 10.0448 13 10.1 13H17.9C17.9552 13 18 13.0448 18 13.1V15.9C18 15.9552 17.9552 16 17.9 16H10.1C10.0448 16 10 15.9552 10 15.9Z"
                stroke={color}
              />
              <path id="Vector 23" d="M4 6.5V9.4C4 9.45523 4.04477 9.5 4.1 9.5H5.5" stroke={color} />
              <path id="Vector 24" d="M8 11.5V14.4C8 14.4552 8.04477 14.5 8.1 14.5H9.5" stroke={color} />
            </g>
            <path
              id="Vector 53"
              d="M13.5 3.5V5M13.5 6.5V5M13.5 5H15M13.5 5H12"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
