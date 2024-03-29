import React from 'react';
import { OutputDateTime } from '../../../../../../app/helpers';
import { useAppSelector } from '../../../../../../app/hooks';
import { DetailsIcon } from '../../../../../../assets/icons';
import DetailsSection from '../../../../../../components/Pilot/components/DetailsSection';
import SectionArea from '../../../../../../components/Pilot/components/SectionArea';
import { useGetExplorerFile, useGetExplorerFolder } from '../../../../../../features/explorer/explorerService';

export default function Details() {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { id, type } = pilotSideOver;

  const { data: folder } = useGetExplorerFolder(id, type === 'folder');

  const { data: file } = useGetExplorerFile(id, type === 'file');

  const data = folder?.data.current_folder || file;

  const config = data
    ? [
        {
          id: 'last_modified_at',
          key: 'Last modified at',
          value: OutputDateTime(data.updated_at)
        },
        {
          id: 'created_at',
          key: 'Created at',
          value: OutputDateTime(data.created_at)
        }
      ]
    : null;

  return config ? (
    <>
      <SectionArea label="Details" icon={<DetailsIcon active={false} dimensions={{ width: 20, height: 20 }} />} />
      <DetailsSection config={config} />
    </>
  ) : null;
}
