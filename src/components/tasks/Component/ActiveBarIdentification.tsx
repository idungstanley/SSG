import React from 'react';

interface ActiveBarProps {
  showBar: boolean;
}
export default function ActiveBarIdentification({ showBar }: ActiveBarProps) {
  return showBar ? (
    <span className="absolute top-0 bottom-0 left-0 rounded-r-lg bg-alsoit-purple-300" style={{ width: '2px' }} />
  ) : null;
}
