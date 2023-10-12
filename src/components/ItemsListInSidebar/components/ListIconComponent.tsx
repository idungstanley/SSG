import React from 'react';
import { COLOUR_SHAPES } from '../../../utils/Colors';

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
  return (
    <>
      {type === 'colourToggle' ? (
        <div
          className="relative flex items-center justify-between"
          style={{
            height: '22px',
            width: shape === COLOUR_SHAPES.SolidSquare || shape === COLOUR_SHAPES.SolidCircle ? '22px' : '44px'
          }}
        >
          <button
            className={`${isOutterFrameActive ? 'border-primary-500 border z-2' : 'border-gray-200'}  ${
              shape === COLOUR_SHAPES.SolidSquare || shape === COLOUR_SHAPES.SolidCircle ? 'rounded' : 'rounded-l-md'
            } flex items-center justify-center p-1 absolute left-0 border`}
            onClick={outterFrameClick}
          >
            <span
              className={`w-3 h-3 ${
                shape === COLOUR_SHAPES.TwoCircle ||
                shape === COLOUR_SHAPES.SquareInCircle ||
                shape === COLOUR_SHAPES.SolidCircle
                  ? 'rounded-full'
                  : shape === COLOUR_SHAPES.TwoSquare ||
                    shape === COLOUR_SHAPES.CircleInSquare ||
                    shape === COLOUR_SHAPES.SolidSquare
                  ? ''
                  : 'rounded-full'
              }`}
              style={{
                backgroundColor: outterColour ? outterColour : 'black'
              }}
            ></span>
          </button>
          {shape !== COLOUR_SHAPES.SolidCircle && shape !== COLOUR_SHAPES.SolidSquare && (
            <button
              className={`${
                isInnerFrameActive ? 'border-primary-500 rounded-r-md z-2' : 'border-gray-200'
              } flex items-center justify-center p-1 absolute right-0 border rounded-r-md`}
              onClick={innerFrameClick}
            >
              <span
                className={`w-3 h-3 ${
                  shape === COLOUR_SHAPES.TwoSquare || shape === COLOUR_SHAPES.SquareInCircle
                    ? ''
                    : shape === COLOUR_SHAPES.TwoCircle || shape === COLOUR_SHAPES.SquareInCircle
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
              shape === COLOUR_SHAPES.TwoCircle ||
              shape === COLOUR_SHAPES.SquareInCircle ||
              shape === COLOUR_SHAPES.SolidCircle
                ? 'rounded-full'
                : shape === COLOUR_SHAPES.TwoCircle ||
                  shape === COLOUR_SHAPES.CircleInSquare ||
                  shape === COLOUR_SHAPES.SolidSquare
                ? ''
                : 'rounded-full'
            }`}
            style={{
              backgroundColor: outterColour ? outterColour : 'black'
            }}
          >
            <span
              className={`${
                shape === COLOUR_SHAPES.TwoSquare || shape === COLOUR_SHAPES.SquareInCircle
                  ? 'w-1.5 h-1.5'
                  : shape === COLOUR_SHAPES.TwoCircle || shape === COLOUR_SHAPES.CircleInSquare
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
