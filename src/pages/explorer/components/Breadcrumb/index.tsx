import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
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
        <ArrowLeftCircleIcon
          className="h-6 w-6"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 2,
      onClick: () => ({}),
      icon: (
        <ArrowRightCircleIcon
          className="h-6 w-6"
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
          href: `/explorer/${ancestor.id}`,
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
            className="text-gray-400 focus:outline-none ring-0 focus:ring-0">
            {button.icon}
          </button>
        ))}
      </div>
      <Breadcrumb
        pages={pages}
        rootIcon={
          <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
        }
        rootIconHref="/explorer"/>
    </div>
  );
}
