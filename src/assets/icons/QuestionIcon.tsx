/* eslint-disable max-len */
import React from 'react';

interface IQuestionIconProps {
  color?: string;
}

export default function QuestionIcon({ color }: IQuestionIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_17851_120395" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_17851_120395)">
        <path
          d="M10.0295 14.6788C10.2551 14.6788 10.4464 14.6009 10.6035 14.4451C10.7605 14.2893 10.8391 14.0986 10.8391 13.873C10.8391 13.6474 10.7612 13.4561 10.6054 13.299C10.4496 13.142 10.2589 13.0634 10.0333 13.0634C9.80766 13.0634 9.61633 13.1413 9.45929 13.2971C9.30223 13.4529 9.2237 13.6436 9.2237 13.8692C9.2237 14.0948 9.3016 14.2862 9.45739 14.4432C9.61317 14.6003 9.80387 14.6788 10.0295 14.6788ZM10.0065 17.5826C8.96325 17.5826 7.98075 17.3853 7.05897 16.9906C6.13718 16.5958 5.33036 16.0527 4.63852 15.3612C3.94665 14.6696 3.40327 13.8635 3.00837 12.9427C2.61347 12.0219 2.41602 11.0381 2.41602 9.99118C2.41602 8.94427 2.61338 7.96339 3.0081 7.04856C3.40282 6.13371 3.94595 5.33036 4.63747 4.63852C5.32902 3.94666 6.13518 3.40327 7.05595 3.00837C7.97673 2.61347 8.96057 2.41602 10.0075 2.41602C11.0544 2.41602 12.0353 2.61338 12.9501 3.0081C13.8649 3.40282 14.6683 3.94595 15.3601 4.63747C16.052 5.32902 16.5954 6.13355 16.9903 7.05108C17.3852 7.96861 17.5826 8.94897 17.5826 9.99218C17.5826 11.0354 17.3853 12.0179 16.9906 12.9397C16.5958 13.8615 16.0527 14.6683 15.3612 15.3601C14.6696 16.052 13.8651 16.5954 12.9476 16.9903C12.0301 17.3852 11.0497 17.5826 10.0065 17.5826ZM9.99933 16.4993C11.8049 16.4993 13.3396 15.8674 14.6035 14.6035C15.8674 13.3396 16.4993 11.8049 16.4993 9.99933C16.4993 8.19377 15.8674 6.65905 14.6035 5.39516C13.3396 4.13127 11.8049 3.49933 9.99933 3.49933C8.19377 3.49933 6.65905 4.13127 5.39516 5.39516C4.13127 6.65905 3.49933 8.19377 3.49933 9.99933C3.49933 11.8049 4.13127 13.3396 5.39516 14.6035C6.65905 15.8674 8.19377 16.4993 9.99933 16.4993ZM10.0507 6.43202C10.4395 6.43202 10.776 6.55448 11.0602 6.79939C11.3444 7.04431 11.4865 7.35045 11.4865 7.71783C11.4865 8.0273 11.4002 8.30276 11.2277 8.5442C11.0552 8.78566 10.8535 9.00361 10.6227 9.19806C10.3202 9.46641 10.0504 9.76854 9.81333 10.1045C9.57623 10.4404 9.45661 10.8129 9.45447 11.2221C9.44913 11.3738 9.49963 11.494 9.60597 11.5827C9.71232 11.6713 9.83639 11.7157 9.97818 11.7157C10.1301 11.7157 10.2581 11.6727 10.3623 11.5867C10.4665 11.5007 10.534 11.3871 10.565 11.2461C10.6345 10.9459 10.7597 10.6815 10.9408 10.4529C11.1219 10.2243 11.3181 10.0069 11.5293 9.80075C11.833 9.50472 12.0842 9.17499 12.283 8.81158C12.4817 8.44815 12.581 8.05828 12.581 7.64197C12.581 6.98172 12.3348 6.43231 11.8423 5.99375C11.3498 5.55518 10.7604 5.33589 10.0741 5.33589C9.5841 5.33589 9.12647 5.44914 8.70127 5.67564C8.27606 5.90213 7.92612 6.22075 7.65145 6.63152C7.56394 6.75707 7.5407 6.89475 7.58174 7.04456C7.62279 7.19435 7.71693 7.29934 7.86418 7.35954C8.01625 7.4303 8.16547 7.44057 8.31183 7.39035C8.45819 7.34014 8.58052 7.26269 8.67881 7.158C8.84761 6.95286 9.04847 6.78058 9.28137 6.64116C9.51427 6.50173 9.77071 6.43202 10.0507 6.43202Z"
          fill={color ? color : '#424242'}
        />
      </g>
    </svg>
  );
}
