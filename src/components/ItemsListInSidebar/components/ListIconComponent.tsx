import React from 'react';

interface Props {
  shape?: string;
  innerColour?: string;
  outterColour?: string;
  type?: string;
  innerFrameClick?: () => void;
  outterFrameClick?: () => void;
  isInnerFrameActive?: boolean;
  isOutterFrameActive?: boolean;
}

export default function ListIconComponent({
  shape,
  innerColour,
  outterColour,
  type,
  innerFrameClick,
  outterFrameClick,
  isOutterFrameActive,
  isInnerFrameActive
}: Props) {
  const TwoSquare = 'two-square';
  const TwoCircle = 'two-circle';
  const SquareInCircle = 'square-in-circle';
  const CircleInSquare = 'circle-in-square';
  return (
    <>
      {type === 'colourToggle' ? (
        <div className="flex items-center justify-between border border-gray-300 divide-x divide-gray-400 rounded-md">
          <button
            className={`${isOutterFrameActive && 'bg-green-200'} flex items-center justify-center p-1 `}
            onClick={outterFrameClick}
          >
            <span
              className={`w-3 h-3 border border-current ${
                shape === TwoCircle || shape === SquareInCircle
                  ? 'rounded-full'
                  : shape === TwoSquare || shape === CircleInSquare
                  ? ''
                  : 'rounded-full'
              }`}
              style={{
                backgroundColor: outterColour ? outterColour : 'black'
              }}
            ></span>
          </button>
          <button
            className={`${isInnerFrameActive && 'bg-green-200'} flex items-center justify-center p-1 `}
            onClick={innerFrameClick}
          >
            <span
              className={`w-3 h-3 border border-current ${
                shape === TwoSquare || shape === SquareInCircle
                  ? ''
                  : shape === TwoCircle || shape === CircleInSquare
                  ? 'rounded-full'
                  : ''
              }`}
              style={{
                backgroundColor: innerColour ? innerColour : 'white'
              }}
            ></span>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span
            className={`flex items-center justify-center w-3 h-3 ${
              shape === TwoCircle || shape === SquareInCircle
                ? 'rounded-full'
                : shape === TwoSquare || shape === CircleInSquare
                ? ''
                : 'rounded-full'
            }`}
            style={{
              backgroundColor: outterColour
            }}
          >
            <span
              className={`w-1.5 h-1.5 ${
                shape === TwoSquare || shape === SquareInCircle
                  ? ''
                  : shape === TwoCircle || shape === CircleInSquare
                  ? 'rounded-full'
                  : ''
              }`}
              style={{
                backgroundColor: innerColour
              }}
            ></span>
          </span>
        </div>
      )}
    </>
  );
}
