import React from 'react';
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
    <nav className="flex py-2 bg-white h-7" aria-label="Breadcrumb">
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
            className="w-4 h-4 text-gray-400 stroke-current"
            aria-hidden="true"
          />
          {pages?.map((page) => (
            <li key={page.name} className="flex">
              <div className="flex items-center">
                <VscTriangleRight
                  className="w-3 h-3 text-gray-400 stroke-current"
                  aria-hidden="true"
                />
                <Link
                  to={page.href || ''}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-500 select-none hover:text-gray-600 cursor-none"
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
