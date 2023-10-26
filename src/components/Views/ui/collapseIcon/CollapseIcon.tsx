import React from 'react';

interface ChevronProps {
  onToggle: VoidFunction;
  active: boolean;
  color?: string;
  hoverBg?: string;
  iconColor?: string;
}
// eslint-disable-next-line react/display-name
export default function CollapseIcon({ onToggle, active, color }: ChevronProps) {
  return (
    <div onClick={onToggle}>
      {active ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            // eslint-disable-next-line max-len
            d="M9.5211 8.25453C9.58991 8.18766 9.62431 8.10353 9.62431 8.00213C9.62431 7.90073 9.58991 7.81562 9.5211 7.74682L7.7391 5.96482C7.6455 5.87122 7.52552 5.84946 7.37914 5.89953C7.23278 5.94961 7.1596 6.04476 7.1596 6.18498L7.1596 9.82013C7.1596 9.95828 7.23278 10.0523 7.37914 10.1022C7.52552 10.152 7.6455 10.1301 7.7391 10.0365L9.5211 8.25453ZM15.5826 7.99353C15.5826 9.03675 15.3853 10.0192 14.9906 10.941C14.5958 11.8628 14.0527 12.6696 13.3612 13.3615C12.6696 14.0533 11.8635 14.5967 10.9427 14.9916C10.0219 15.3865 9.03809 15.584 7.99118 15.584C6.94427 15.584 5.96339 15.3866 5.04856 14.9919C4.13371 14.5972 3.33036 14.0541 2.63852 13.3625C1.94666 12.671 1.40327 11.8648 1.00837 10.944C0.613468 10.0233 0.416016 9.03943 0.416016 7.99253C0.416016 6.94561 0.613378 5.96473 1.0081 5.0499C1.40282 4.13505 1.94595 3.33171 2.63747 2.63986C3.32902 1.948 4.13355 1.40462 5.05108 1.00971C5.96861 0.61481 6.94897 0.417358 7.99218 0.417358C9.03541 0.417358 10.0179 0.61472 10.9397 1.00944C11.8615 1.40416 12.6683 1.94729 13.3601 2.63882C14.052 3.33036 14.5954 4.13489 14.9903 5.05242C15.3852 5.96995 15.5826 6.95032 15.5826 7.99353ZM14.4993 8.00067C14.4993 6.19512 13.8674 4.66039 12.6035 3.3965C11.3396 2.13262 9.80488 1.50067 7.99933 1.50067C6.19377 1.50067 4.65905 2.13262 3.39516 3.3965C2.13127 4.66039 1.49933 6.19512 1.49933 8.00067C1.49933 9.80623 2.13127 11.3409 3.39516 12.6048C4.65905 13.8687 6.19377 14.5007 7.99933 14.5007C9.80488 14.5007 11.3396 13.8687 12.6035 12.6048C13.8674 11.3409 14.4993 9.80623 14.4993 8.00067Z"
            fill="#ECECEC"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.0841 7.99906C15.0841 11.912 11.912 15.0841 7.99906 15.0841C4.08613 15.0841 0.914062 11.912 0.914062 7.99906C0.914062 4.08613 4.08613 0.914062 7.99906 0.914062C11.912 0.914062 15.0841 4.08613 15.0841 7.99906Z"
            fill="white"
            stroke="white"
          />
          <path
            d="M7.56596 9.76896L5.14726 7.69579C4.87265 7.46041 5.03911 7.01042 5.4008 7.01042H10.2382C10.5999 7.01042 10.7663 7.46041 10.4917 7.69579L8.07304 9.76896C7.92714 9.89402 7.71186 9.89402 7.56596 9.76896Z"
            fill={color}
            stroke="white"
            strokeWidth="0.0208333"
          />
          <rect x="0.514063" y="0.514063" width="14.97" height="14.97" rx="7.485" stroke="white" strokeWidth="0.2" />
        </svg>
      )}
    </div>
  );
}
