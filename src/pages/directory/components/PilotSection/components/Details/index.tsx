import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import DetailsSection from '../../../../../../components/Pilot/components/DetailsSection';
import SectionArea from '../../../../../../components/Pilot/components/SectionArea';
import { useGetDirectory, useGetDirectoryTemplate } from '../../../../../../features/directory/directoryService';

export default function Details() {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { id, type } = pilotSideOver;

  const { data: template } = useGetDirectoryTemplate(id, type === 'template');

  const { data: directory } = useGetDirectory(id, type === 'directory');

  const data = template || directory;

  const config = data
    ? [
        {
          id: 1,
          key: type + ' name',
          value: data.name
        }
      ]
    : null;

  return config ? (
    <>
      <SectionArea label="Details" icon={<InformationCircleIcon className="w-4 h-4" />} />
      <DetailsSection config={config} />
    </>
  ) : null;
}
