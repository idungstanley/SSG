import React from 'react';

function CarretIcon({ color }: { color: string }) {
  // const [fill, setFill] = useState('#B2B2B2');
  return (
    <svg width="7" height="3" viewBox="0 0 7 3" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.14018 2.76994L0.721482 0.69677C0.446865 0.461385 0.613328 0.0113932 0.97502 0.0113932H5.81241C6.17411 0.0113932 6.34057 0.461385 6.06595 0.69677L3.64725 2.76994C3.50136 2.89499 3.28607 2.89499 3.14018 2.76994Z"
        fill={color}
        stroke="white"
        strokeWidth="0.0208333"
      />
    </svg>
  );
}

export default CarretIcon;
