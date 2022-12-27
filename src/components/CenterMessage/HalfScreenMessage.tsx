/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import EmptyStateSimple from '../emptyState/EmptyStateSimple';

interface Iprops {
  title: string;
  description: string;
  ctaText: string;
  ctaOnClick: () => void;
  showCta: boolean;
  showIcon: boolean;
}
export default function HalfScreenMessage(props: Iprops) {
  return (
    <div className="flex flex-1 bg-white h-2/4">
      <div className="m-auto">
        <EmptyStateSimple {...props} />
      </div>
    </div>
  );
}
