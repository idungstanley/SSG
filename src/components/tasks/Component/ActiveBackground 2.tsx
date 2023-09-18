import React from 'react';
import { useAppSelector } from '../../../app/hooks';

interface ActiveBarProps {
  showBgColor: boolean;
}

export default function ActiveBackground({ showBgColor }: ActiveBarProps) {
  const { lightBaseColor } = useAppSelector((state) => state.account);

  return showBgColor ? (
    <span
      className="absolute inset-0 z-0 before:content before:absolute before:inset-0"
      style={{ backgroundColor: lightBaseColor }}
    />
  ) : null;
}
