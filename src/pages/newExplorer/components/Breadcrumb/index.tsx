import { ArrowCircleLeftIcon, ArrowCircleRightIcon, HomeIcon } from '@heroicons/react/outline';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetExplorerFolder } from '../../../../features/explorer/explorerService';
import Breadcrumb from '../../../../components/Breadcrumb';

export default function BreadcrumbSection() {
  const { folderId } = useParams();

  const { data } = useGetExplorerFolder(folderId);

  const navigationButtons = [
    {
      id: 1,
      onClick: () => ({}),
      icon: (
        <ArrowCircleLeftIcon
          className="h-4 w-4 stroke-current text-gray-400"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 2,
      onClick: () => ({}),
      icon: (
        <ArrowCircleRightIcon
          className="h-4 w-4 stroke-current text-gray-400"
          aria-hidden="true"
        />
      ),
    },
  ];

  const folder = data?.data.current_folder;

  const pages = folder?.ancestors
    ? [
        ...folder.ancestors.map((ancestor) => ({
          name: ancestor.name,
          current: false,
          href: `/new-explorer/${ancestor.id}`,
        })),
        ...[{ name: folder.name, current: true, href: null }],
      ]
    : null;

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {navigationButtons.map((button) => (
          <button
            onClick={button.onClick}
            key={button.id}
            type="button"
            className="inline-flex items-center rounded-full border border-transparent text-white shadow-sm focus:outline-none ring-0 focus:ring-0"
          >
            {button.icon}
          </button>
        ))}
      </div>
      <Breadcrumb
        pages={pages}
        rootIcon={
          <HomeIcon className="flex-shrink-0 h-4 w-4" aria-hidden="true" />
        }
        rootIconHref="/new-explorer"
      />
    </div>
  );
}
