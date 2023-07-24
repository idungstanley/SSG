import React from 'react';

interface BadgeProps {
  value?: string | number | readonly string[] | undefined;
  textColour?: string;
  backgroundColour?: string;
  paddingHorizontal?: string;
  paddingVertical?: string;
  textSize?: string;
  fontWeight?: string;
  otherStyles?: string | null;
}

function Badge({
  value,
  textColour = 'text-red-800',
  backgroundColour = 'bg-red-100',
  paddingHorizontal = 'px-2',
  paddingVertical = 'py-0.5',
  textSize = 'text-xs',
  fontWeight = 'font-semibold',
  otherStyles = null
}: BadgeProps) {
  return (
    <span
      className={`select-none inline-flex text-center items-center ${paddingHorizontal} ${paddingVertical} rounded-full ${textSize} ${fontWeight} ${backgroundColour} ${textColour} ${otherStyles}`}
    >
      {value}
    </span>
  );
}

export default Badge;
