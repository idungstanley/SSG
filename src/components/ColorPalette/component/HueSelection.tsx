// import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
// import { Movable } from 'webrix/components';
// import { useDimensions } from 'webrix/hooks';

// interface HueSelectorProps {
//   hsv: string;
//   onChange: () => void;
// }

// const HueSelector = memo(({ hsv, onChange }: HueSelectorProps) => {
//   const movable = useRef();
//   const { width } = useDimensions(movable);
//   const [left, setLeft] = useState<number>(0);

//   const props = Movable.useMove(
//     useMemo(
//       () => [
//         trackpad(movable),
//         transform((v) => v.left, clamp(0, width)),
//         update((next) => {
//           setLeft(next);
//           onChange(convert.hsv.rgb(map(0, width, 0, 360)(next), hsv[1], hsv[2]));
//         })
//       ],
//       [onChange, width, hsv]
//     )
//   );

//   useEffect(() => {
//     setLeft(map(0, 360, 0, width)(hsv[0]));
//   }, [width]);

//   return (
//     <Movable className="hue-selector" ref={movable} {...props}>
//       <div
//         className="pointer"
//         style={{ left, '--color': `rgb(${convert.hsv.rgb(map(0, width, 0, 360)(left), 100, 100)})` }}
//       />
//     </Movable>
//   );
// });

import React from 'react';

export default function HueSelection() {
  return <div></div>;
}
