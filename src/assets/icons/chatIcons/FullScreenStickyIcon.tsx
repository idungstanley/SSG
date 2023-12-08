/* eslint-disable max-len */
import React from 'react';

interface Props {
  color?: string;
}

export default function FullScreenStickyIcon({ color }: Props) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.09357 8.4013L5.4187 6.07617C5.47792 6.01695 5.55465 5.99257 5.64888 6.00304C5.74311 6.01351 5.82724 6.05576 5.90128 6.12979C5.97531 6.20383 6.01756 6.28796 6.02803 6.38219C6.0385 6.47642 6.01412 6.55315 5.9549 6.61238L3.62977 8.9375L5.42884 9.13741C5.53164 9.14883 5.61821 9.18864 5.68854 9.25686C5.75887 9.32507 5.80001 9.41296 5.81195 9.52052C5.82391 9.62808 5.80271 9.70905 5.74835 9.76341C5.69399 9.81776 5.61303 9.83897 5.50546 9.82701L2.94826 9.54287C2.82642 9.52934 2.72267 9.47974 2.637 9.39407C2.55134 9.3084 2.50173 9.20465 2.4882 9.08282L2.20406 6.52561C2.19263 6.42281 2.21569 6.34476 2.27323 6.29145C2.33075 6.23815 2.4133 6.21747 2.52086 6.22943C2.62843 6.24138 2.71618 6.28132 2.78413 6.34927C2.85208 6.41722 2.89203 6.50498 2.90397 6.61254L3.09357 8.4013Z"
        fill={color ? color : '#282828'}
      />
      <path
        d="M8.9162 3.66511L6.59107 5.99023C6.53184 6.04946 6.45512 6.07384 6.36088 6.06337C6.26665 6.0529 6.18252 6.01065 6.10849 5.93661C6.03445 5.86258 5.9922 5.77845 5.98173 5.68422C5.97126 5.58999 5.99564 5.51326 6.05487 5.45403L8.38 3.1289L6.58092 2.929C6.47813 2.91758 6.39156 2.87776 6.32123 2.80954C6.2509 2.74134 6.20976 2.65345 6.19781 2.54589C6.18586 2.43832 6.20706 2.35736 6.26142 2.303C6.31578 2.24864 6.39674 2.22744 6.5043 2.2394L9.06151 2.52353C9.18335 2.53707 9.2871 2.58667 9.37276 2.67234C9.45843 2.758 9.50803 2.86175 9.52157 2.98359L9.8057 5.5408C9.81713 5.6436 9.79408 5.72165 9.73654 5.77495C9.67901 5.82826 9.59647 5.84893 9.4889 5.83697C9.38134 5.82503 9.29358 5.78508 9.22563 5.71713C9.15768 5.64918 9.11774 5.56143 9.10579 5.45386L8.9162 3.66511Z"
        fill={color ? color : '#282828'}
      />
    </svg>
  );
}