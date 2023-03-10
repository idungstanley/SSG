import React from 'react';
import { useAppSelector } from '../../app/hooks';
import List from './components/List';
import AddNew from './components/AddNew';
import SectionArea from '../Pilot/components/SectionArea';
import { EyeIcon } from '@heroicons/react/24/outline';

export default function WatchersForPilot() {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const item = pilotSideOver?.type && pilotSideOver?.id ? { type: pilotSideOver.type, id: pilotSideOver.id } : null;

  return (
    <>
      <SectionArea label="Watchers" icon={<EyeIcon className="w-4 h-4" />} />

      <div className="flex flex-col pt-2">
        {item ? (
          <>
            <AddNew item={item} />
            <List item={item} />
          </>
        ) : null}
      </div>
    </>
  );
}
