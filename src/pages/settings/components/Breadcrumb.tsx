import React from 'react';
import { CogIcon } from '@heroicons/react/24/outline';
import { Breadcrumb as BreadcrumbComponent } from '../../../components';

interface BreadcrumbProps {
  pages: {
    name: string;
    current: boolean;
    href: string;
  }[];
}

export default function Breadcrumb({ pages }: BreadcrumbProps) {
  return (
    <BreadcrumbComponent
      pages={pages}
      rootIcon={
        <CogIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
      }
    />
  );
}
