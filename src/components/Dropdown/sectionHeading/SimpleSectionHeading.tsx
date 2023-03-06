import React, { ReactNode } from 'react';

interface SimpleSectionHeadingProps {
  title: string;
  description?: string | null;
  actions?: ReactNode;
}

function SimpleSectionHeading({ title, description, actions }: SimpleSectionHeadingProps) {
  return (
    <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <div>
        <h3 className="text-xl font-medium leading-6 text-gray-900">{title}</h3>
        {description && <p className="max-w-4xl mt-2 text-sm text-gray-500">{description}</p>}
      </div>
      {actions && <div className="flex mt-3 space-x-3 sm:mt-0 sm:ml-4">{actions}</div>}
    </div>
  );
}

export default SimpleSectionHeading;
