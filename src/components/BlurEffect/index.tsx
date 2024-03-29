import { CSSProperties } from 'react';

interface BlurEffectProps {
  top: string;
  right: string;
  bottom: string;
  left: string;
  width: string;
  height: string;
  backgroundImage: string;
  style?: CSSProperties;
}

export default function BlurEffect({
  top = '0',
  right = '-5px',
  bottom = '0',
  left = 'auto',
  width = '55px',
  height = '45px',
  backgroundImage = 'linear-gradient(to right, transparent , white)',
  style
}: BlurEffectProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: top,
        right: right,
        bottom: bottom,
        left: left,
        width: width,
        height: height,
        backgroundImage: backgroundImage,
        ...style
      }}
    >
      &nbsp;
    </div>
  );
}
