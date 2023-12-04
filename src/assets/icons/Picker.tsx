import React from 'react';

function Picker() {
  return (
    <div className="cursor-pointer hover:filter hover:red-500">
      <svg width="14" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17.0313L11 9.03125" stroke="#919191" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M13 7.53125L15.5 5.03125" stroke="#919191" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M12.0847 11.0311L14.4986 13.6143" stroke="#919191" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M6.08468 5.03109L8.49862 7.61429" stroke="#919191" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M10.7442 6.53549L10.7288 2.99998" stroke="#919191" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M14 9.80846L17.5355 9.78952" stroke="#919191" strokeWidth="1.2" strokeLinecap="round" />
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
