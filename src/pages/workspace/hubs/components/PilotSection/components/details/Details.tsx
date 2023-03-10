import React, { useMemo } from 'react';
import AddTo from '../attachments/AddTo';
import DetailsIndex from './properties/DetailsIndex';
import DetailsSubTab from './DetailsSubTab';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../../../../../../../app/hooks';
import SectionArea from '../../../../../../../components/Pilot/components/SectionArea';

export const DetailOptions = [
  {
    id: 1,
    element: <DetailsIndex />
  },
  {
    id: 2,
    element: <AddTo />
  }
];
export default function Details() {
  const { activeSubDetailsTabId, showPilot } = useAppSelector((state) => state.workspace);
  const selectedSubSection = useMemo(
    () => DetailOptions.find((option) => option.id === activeSubDetailsTabId),
    [activeSubDetailsTabId]
  );

  return (
    <>
      <SectionArea label="Details" icon={<InformationCircleIcon className="w-4 h-4" />} />
      <section className="flex flex-col overflow-y-scroll h-fit ">
        {showPilot && <DetailsSubTab />}
        <div>{selectedSubSection ? selectedSubSection.element : null}</div>
      </section>
    </>
  );
}
