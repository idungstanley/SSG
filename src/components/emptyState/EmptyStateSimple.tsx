import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import Button from '../Button';

interface Iprops {
  title: string;
  description: string;
  ctaText: string;
  ctaOnClick: () => void;
  showCta: boolean;
  showIcon: boolean;
}

export default function EmptyStateSimple({
  title,
  description,
  ctaText,
  ctaOnClick,
  showCta,
  showIcon,
}: Iprops) {
  return (
    <div className="text-center">
      {showIcon ? (
        <svg
          className="w-12 h-12 mx-auto text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
      ) : null}
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {showCta && (
        <div className="mt-6">
          <Button
            buttonStyle="primary"
            onClick={ctaOnClick}
            label={ctaText}
            width="w-40"
            icon={
              <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
            }
          />
        </div>
      )}
    </div>
  );
}

EmptyStateSimple.defaultProps = {
  ctaText: null,
  ctaOnClick: null,
  showCta: false,
  showIcon: true,
};
