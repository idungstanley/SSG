import React, { DetailedHTMLProps, SVGAttributes } from 'react';

interface defaultPin extends DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement> {
  dimensions?: {
    width: string;
    height: string;
  };
}

function DefaultPinIcon({ dimensions, ...props }: defaultPin) {
  return (
    <svg
      width={dimensions?.width ? dimensions.width : '10'}
      height={dimensions?.height ? dimensions.height : '15'}
      viewBox="0 0 10 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.58309 7.17611L9.40677 8.99982V10.0831H5.54142V14.4164L4.99977 14.9581L4.45813 14.4164V10.0831H0.592773V8.99982L2.41646 7.17611V1.49982H1.41646V0.416504H8.58309V1.49982H7.58309V7.17611ZM2.12477 8.99982H7.87477L6.49977 7.62482V1.49982H3.49977V7.62482L2.12477 8.99982Z"
        fill="#919191"
      />
    </svg>
  );
}

export default DefaultPinIcon;
