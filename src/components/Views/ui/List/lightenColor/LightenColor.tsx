import React from 'react';
import colorNames from 'color-name-list';
import { CommonColors } from './CommonColors';

type RgbTuple = [number, number, number];

export default function LightenColor(color: string, lightenAmount: number): string {
  function getColorCode(input: string): string {
    const normalizedInput = input.toLowerCase();

    if (CommonColors[normalizedInput]) {
      return CommonColors[normalizedInput];
    }

    if (colorNames[normalizedInput]) {
      const rgb = colorNames[normalizedInput] as RgbTuple;
      const hex = `#${rgb[0].toString(16).padStart(2, '0')}${rgb[1].toString(16).padStart(2, '0')}${rgb[2]
        .toString(16)
        .padStart(2, '0')}`;
      return hex;
    }

    if (/^#?([a-f\d]{6})$/i.test(normalizedInput)) {
      return normalizedInput;
    }

    return input;
  }

  const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const match = hexRegex.exec(getColorCode(color));

  if (match) {
    const [, r, g, b] = match;
    const newR = Math.min(255, Math.round(parseInt(r, 16) + (255 - parseInt(r, 16)) * lightenAmount));
    const newG = Math.min(255, Math.round(parseInt(g, 16) + (255 - parseInt(g, 16)) * lightenAmount));
    const newB = Math.min(255, Math.round(parseInt(b, 16) + (255 - parseInt(b, 16)) * lightenAmount));

    const newColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB
      .toString(16)
      .padStart(2, '0')}`;
    return newColor;
  } else {
    return 'fbf6ff';
  }
}
