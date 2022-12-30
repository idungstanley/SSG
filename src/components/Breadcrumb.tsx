import React from 'react';
import { Link } from 'react-router-dom';

interface pageType {
  name: string
  current: boolean
  href: string | null
}

interface BreadcrumbProps {
  pages: {
    name: string;
    current: boolean;
    href: string | null;
  }[];
  rootIcon?: JSX.Element;
  rootIconHref?: string;
}

function Breadcrumb({ pages, rootIcon, rootIconHref }: BreadcrumbProps) {
  return (
    <nav
      className="flex bg-white border-b border-gray-200"
      aria-label="Breadcrumb"
    >
      <ol className="flex w-full px-4 mx-auto space-x-4 sm:px-6 lg:px-6">
        {rootIcon && (
          <li className="flex">
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
        {pages.map((page) => (
          <li key={page.name} className="flex">
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 w-6 h-full text-gray-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              {page.current ? (
                <Link
                  to={page.href || '/'}
                  className="ml-4 text-sm font-medium text-gray-800 cursor-none select-none"
                  aria-current="page"
                >
                  {page.name}
                </Link>
              ) : (
                <Link
                  to={page.href || '/'}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={undefined}
                >
                  {page.name}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
export default Breadcrumb;
