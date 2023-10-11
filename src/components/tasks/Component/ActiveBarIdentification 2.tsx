import React from 'react';
import { useAppSelector } from '../../../app/hooks';

interface ActiveBarProps {
  showBar: boolean;
}
export default function ActiveBarIdentification({ showBar }: ActiveBarProps) {
  const { baseColor } = useAppSelector((state) => state.account);

  return showBar ? (
    <span className="absolute top-0 bottom-0 left-0 w-0.5 rounded-r-lg" style={{ backgroundColor: baseColor }} />
  ) : null;
}
