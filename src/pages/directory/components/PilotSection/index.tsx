import React, { useEffect } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Details from './components/Details';
import { useAppDispatch } from '../../../../app/hooks';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { useParams } from 'react-router-dom';
import { useGetDirectory, useGetDirectoryTemplate } from '../../../../features/directory/directoryService';

export const sections = [
  {
    id: 1,
    element: <Details />
  }
];

export const tabs = [
  {
    id: 1,
    label: 'Details',
    icon: <InformationCircleIcon className="w-4 h-4" />
  }
];

export const pilotConfig = { sections, tabs };

// ! move template and directory ids to global store
export default function PilotSection({ templateId }: { templateId: string | null }) {
  const dispatch = useAppDispatch();

  const { directoryId } = useParams();

  const { data: directory } = useGetDirectory(directoryId);

  const { data: template } = useGetDirectoryTemplate(templateId);

  // set data for pilot
  useEffect(() => {
    const selectedItemId = templateId || directoryId;
    const selectedItemType = templateId ? 'template' : 'directory';

    if (selectedItemId) {
      dispatch(
        setShowPilotSideOver({
          id: selectedItemId,
          type: selectedItemType,
          show: true,
          title: template?.name || directory?.name
        })
      );
    }
  }, [directory, template]);

  return null;
}
