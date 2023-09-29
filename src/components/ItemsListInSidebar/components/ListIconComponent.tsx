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
  const SolidSquare = 'solid-square';
  const SolidCircle = 'solid-circle';
  const TwoSquare = 'two-square';
  const TwoCircle = 'two-circle';
  const SquareInCircle = 'square-in-circle';
  const CircleInSquare = 'circle-in-square';
  return (
    <>
      {type === 'colourToggle' ? (
        <div
          className="relative flex items-center justify-between"
          style={{ height: '22px', width: shape === SolidSquare || shape === SolidCircle ? '22px' : '44px' }}
        >
          <button
            className={`${isOutterFrameActive ? 'border-primary-500 border z-2' : 'border-gray-200'}  ${
              shape === SolidSquare || shape === SolidCircle ? 'rounded' : 'rounded-l-md'
            } flex items-center justify-center p-1 absolute left-0 border`}
            onClick={outterFrameClick}
          >
            <span
              className={`w-3 h-3 ${
                shape === TwoCircle || shape === SquareInCircle || shape === SolidCircle
                  ? 'rounded-full'
                  : shape === TwoSquare || shape === CircleInSquare || shape === SolidSquare
                  ? ''
                  : 'rounded-full'
              }`}
              style={{
                backgroundColor: outterColour ? outterColour : 'black'
              }}
            ></span>
          </button>
          {shape !== SolidCircle && shape !== SolidSquare && (
            <button
              className={`${
                isInnerFrameActive ? 'border-primary-500 rounded-r-md z-2' : 'border-gray-200'
              } flex items-center justify-center p-1 absolute right-0 border rounded-r-md`}
              onClick={innerFrameClick}
            >
              <span
                className={`w-3 h-3 ${
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
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span
            className={`flex items-center justify-center w-3 h-3 ${
              shape === TwoCircle || shape === SquareInCircle || shape === SolidCircle
                ? 'rounded-full'
                : shape === TwoSquare || shape === CircleInSquare || shape === SolidSquare
                ? ''
                : 'rounded-full'
            }`}
            style={{
              backgroundColor: outterColour ? outterColour : 'black'
            }}
          >
            <span
              className={`${
                shape === TwoSquare || shape === SquareInCircle
                  ? 'w-1.5 h-1.5'
                  : shape === TwoCircle || shape === CircleInSquare
                  ? 'rounded-full w-1.5 h-1.5'
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
