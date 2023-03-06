import React from 'react';
import { Button } from '../../../components';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';

interface navProps {
  navName: string | null;
  newd: string | null;
  Cleared: string | null;
  Assigned: string | null;
  buttonLabel: string | null;
}

function Nav({ navName, newd, Cleared, Assigned, buttonLabel }: navProps) {
  return (
    <nav className="flex items-center justify-between p-3 bg-white border-gray-200">
      <section className="space-x-5 text-gray-500">
        <span className="font-bold">{navName}</span>
        <span className="px-2 py-1 text-sm rounded-full hover:bg-gray-100">{newd}</span>
        <span className="px-2 py-1 text-sm rounded-full hover:bg-gray-100">{Cleared}</span>
      </section>
      <section className="flex items-center space-x-5 text-gray-500">
        <span>
          <Button buttonStyle="primary" label={buttonLabel} padding="py-2 px-4" height="h-6" width="w-full" />
        </span>
        <span className="px-2 py-1 text-sm rounded-full hover:bg-gray-100">{Assigned}</span>
        <span className="px-2 py-1 text-sm rounded-full hover:bg-gray-100">@mentions</span>
        <span className="flex items-center px-2 py-1 text-xl font-bold rounded-full hover:bg-gray-200">
          <EllipsisHorizontalCircleIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      </section>
    </nav>
  );
}

export default Nav;
