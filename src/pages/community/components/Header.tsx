import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <section className="flex items-center justify-between">
      <p className="text-gray-700">Now</p>

      <div className="flex items-center justify-between gap-5">
        {children}

        <EllipsisHorizontalIcon className="w-4 h-4 text-gray-500" aria-hidden="true" />
      </div>
    </section>
  );
}
