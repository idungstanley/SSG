/* eslint-disable max-len */
import React from 'react';

export default function PersonAddIcon({ color }: { color?: string }) {
  return (
    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.8831 5.13288V3.73288H9.48309V2.86625H10.8831V1.46625H11.7497V2.86625H13.1497V3.73288H11.7497V5.13288H10.8831ZM5.39976 4.29442C4.82477 4.29442 4.33658 4.09373 3.93519 3.69235C3.5338 3.29096 3.33311 2.80277 3.33311 2.22778C3.33311 1.65278 3.5338 1.16459 3.93519 0.763216C4.33658 0.361827 4.82477 0.161133 5.39976 0.161133C5.97474 0.161133 6.46293 0.361827 6.86432 0.763216C7.26571 1.16459 7.46641 1.65278 7.46641 2.22778C7.46641 2.80277 7.26571 3.29096 6.86432 3.69235C6.46293 4.09373 5.97474 4.29442 5.39976 4.29442ZM0.933105 8.838V7.6893C0.933105 7.45414 0.994005 7.23574 1.11581 7.0341C1.23759 6.83246 1.40789 6.66796 1.62669 6.5406C2.20789 6.20641 2.81708 5.95022 3.45426 5.77202C4.09143 5.59382 4.73993 5.50472 5.39976 5.50472C6.05958 5.50472 6.70808 5.59382 7.34526 5.77202C7.98243 5.95022 8.59162 6.20641 9.17282 6.5406C9.39162 6.66796 9.56192 6.83246 9.68371 7.0341C9.80551 7.23574 9.86641 7.45414 9.86641 7.6893V8.838H0.933105ZM1.79976 7.97135H8.99976V7.6893C8.99976 7.60459 8.9744 7.52534 8.92369 7.45155C8.87299 7.37777 8.80304 7.31599 8.71386 7.26622C8.21728 6.98332 7.68718 6.76344 7.12356 6.6066C6.55993 6.44977 5.98533 6.37135 5.39976 6.37135C4.81418 6.37135 4.23958 6.44977 3.67596 6.6066C3.11233 6.76344 2.58223 6.98332 2.08566 7.26622C1.99647 7.31599 1.92652 7.37777 1.87582 7.45155C1.82511 7.52534 1.79976 7.60459 1.79976 7.6893V7.97135ZM5.40329 3.42778C5.73427 3.42778 6.01642 3.30993 6.24976 3.07423C6.48309 2.83854 6.59976 2.55521 6.59976 2.22423C6.59976 1.89327 6.48191 1.61112 6.24622 1.37778C6.01052 1.14445 5.72719 1.02778 5.39622 1.02778C5.06524 1.02778 4.78309 1.14563 4.54976 1.38132C4.31642 1.61702 4.19976 1.90035 4.19976 2.23132C4.19976 2.56229 4.3176 2.84445 4.55329 3.07778C4.78899 3.31112 5.07232 3.42778 5.40329 3.42778Z"
        fill={color ? color : '#424242'}
      />
    </svg>
  );
}
