import React from 'react';

interface Props {
  shapes: string;
  innerColour?: string;
  outterColour?: string;
}

export default function ListIconComponent({ shapes, innerColour = 'pink', outterColour = 'black' }: Props) {
  const TwoSquare = 'two-square';
  const TwoCircle = 'two-circle';
  const SquareInCircle = 'square-in-circle';
  const CircleInSquare = 'circle-in-sqaure';
  return (
    <div className="flex items-center justify-center">
      <span
        className={`flex items-center justify-center w-3 h-3 ${
          shapes === TwoCircle || shapes === SquareInCircle
            ? 'rounded-full'
            : shapes === TwoSquare || shapes === CircleInSquare
            ? ''
            : 'rounded-full'
        }`}
        style={{
          backgroundColor: outterColour
        }}
      >
        <span
          className={`w-1.5 h-1.5 ${
            shapes === TwoSquare || shapes === SquareInCircle
              ? ''
              : shapes === TwoCircle || shapes === CircleInSquare
              ? 'rounded-full'
              : ''
          }`}
          style={{
            backgroundColor: innerColour
          }}
        ></span>
      </span>
    </div>
  );
}
