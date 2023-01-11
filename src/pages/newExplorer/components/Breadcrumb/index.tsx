import { HomeIcon } from '@heroicons/react/outline';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetExplorerFolder } from '../../../../features/explorer/explorerService';
import Breadcrumb from '../../../../components/Breadcrumb';

export default function BreadcrumbSection() {
  const { folderId } = useParams();

  const { data } = useGetExplorerFolder(folderId);

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
    <>
      <Breadcrumb
        pages={pages}
        rootIcon={
          <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
        }
        rootIconHref="/explorer"
      />
    </>
  );
}
