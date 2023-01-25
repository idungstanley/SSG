import React from 'react';
import { ChevronRightIcon, FolderIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { VscTriangleRight } from 'react-icons/vsc';
import { FaFolderOpen } from 'react-icons/fa';

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
        <div className="flex items-center pl-1">
          <FaFolderOpen
            className="h-4 w-4 stroke-current text-gray-400"
            aria-hidden="true"
          />
          {pages?.map((page) => (
            <li key={page.name} className="flex">
              <div className="flex items-center">
                <VscTriangleRight
                  className="h-3 w-3 stroke-current text-gray-400"
                  aria-hidden="true"
                />
                <Link
                  to={page.href || ''}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-600 cursor-none select-none"
                  aria-current="page"
                >
                  <span>{page.name}</span>
                </Link>
              </div>
            </li>
          ))}
        </div>
      </ol>
    </nav>
  );
}
export default Breadcrumb;
