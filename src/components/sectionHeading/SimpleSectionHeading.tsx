import React, { ReactNode } from 'react';

interface SimpleSectionHeadingProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

function SimpleSectionHeading({ title, description, actions }: SimpleSectionHeadingProps) {
  return (
    <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <div>
        <h3 className="text-xl leading-6 font-medium text-gray-900">{title}</h3>
        {description && (
          <p className="mt-2 max-w-4xl text-sm text-gray-500">{description}</p>
        )}
      </div>
      {actions && (
        <div className="mt-3 flex sm:mt-0 sm:ml-4 space-x-3">{actions}</div>
      )}
    </div>
  );
}

export default SimpleSectionHeading;
