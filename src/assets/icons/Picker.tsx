import React from 'react';

function Picker() {
  const hoverColor = 'red';
  // const iconColor = 'red';
  return (
    <div className="hover:filter hover:red-500 cursor-pointer">
      <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.17548 1.76172V4.46616M9.33452 5.6252H12.0389M8.17548 9.48869V6.78425M7.01644 5.6252H4.31201"
          stroke="#999999"
          strokeWidth="0.579521"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M8.17548 1.76172V4.46616M9.33452 5.6252H12.0389M8.17548 9.48869V6.78425M7.01644 5.6252H4.31201"
          stroke="#999999"
          strokeWidth="0.579521"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.35548 4.80385L6.12612 3.57449M10.2241 3.57449L8.99475 4.80385M10.2241 7.67249L8.99475 6.44313M6.34228 1.19922L6.86675 2.46567M3.74951 3.7922L5.01615 4.31666M3.75009 7.45922L5.01654 6.93417M6.34364 10.0512L6.86791 8.78459M10.0106 10.0499L9.4856 8.78362M12.6021 7.45574L11.3354 6.93186M12.5999 3.78872L11.3337 4.31415M10.0041 1.19941L9.48116 2.46663M6.33726 1.20134L6.86173 2.46779"
          stroke="#999999"
          strokeWidth="0.579521"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M6.85487 6.47464L1.08123 12.2612L0.602051 13.1987L1.53936 12.7196L7.32613 6.9459L6.85487 6.47464ZM8.03322 5.29629L7.56196 5.76755L8.03322 6.23901L8.50448 5.76755C8.56694 5.70504 8.60203 5.62029 8.60203 5.53192C8.60203 5.44355 8.56694 5.35879 8.50448 5.29629C8.44197 5.23382 8.35722 5.19873 8.26885 5.19873C8.18048 5.19873 8.09573 5.23382 8.03322 5.29629Z"
          stroke="black"
          strokeOpacity="0.65"
          strokeWidth="0.386348"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <style>
          {`
          svg:hover path,
          svg:hover circle,
          svg:hover ellipse,
          svg:hover rect {
            stroke: #BF01FE;
          }
        `}
        </style>
      </svg>
    </div>
  );
}

export default Picker;
