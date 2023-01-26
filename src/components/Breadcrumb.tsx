import React from 'react';
import { ChevronRightIcon, FolderIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface IBreadcrumbItem {
  name: string;
  current: boolean;
  href: string | null;
}

interface BreadcrumbProps {
  pages: IBreadcrumbItem[] | null;
  rootIcon?: JSX.Element;
  rootIconHref?: string;
}

function Breadcrumb({ pages, rootIcon, rootIconHref }: BreadcrumbProps) {
  return (
    <nav className="flex bg-white py-3" aria-label="Breadcrumb">
      <ol className="flex w-full pl-2">
        {rootIcon && (
          <li className="flex pl-2">
            <div className="flex items-center text-gray-400">
              {rootIconHref ? (
                <Link to={rootIconHref} className="hover:text-gray-500">
                  {rootIcon}
                </Link>
              ) : (
                rootIcon
              )}
            </div>
          </li>
        )}
        {pages?.map((page) => (
          <li key={page.name} className="flex pl-1">
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />

              <Link
                to={page.href || ''}
                className="flex items-center gap-1 pl-1 text-sm font-semibold text-gray-500 hover:text-gray-600 cursor-none select-none"
                aria-current="page"
              >
                <FolderIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>{page.name}</span>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
export default Breadcrumb;
