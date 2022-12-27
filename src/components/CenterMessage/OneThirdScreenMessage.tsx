/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import EmptyStateSimple from '../emptyState/EmptyStateSimple';

interface Iprops {
  title: string;
  description: string;
  ctaText?: string;
  ctaOnClick?: () => void;
  showCta?: boolean;
  showIcon?: boolean;
}
export default function OneThirdScreenMessage(props: Iprops) {
  return (
    <div className="flex flex-1 bg-white h-1/3">
      <div className="m-auto">
        <EmptyStateSimple {...props} />
      </div>
    </div>
  );
}

OneThirdScreenMessage.defaultProps = {
  props: {},
};
