import React, { useMemo } from 'react';
import AddTo from '../../../../../components/Pilot/components/details/properties/attachments/AddTo';
import DetailsIndex from './properties/DetailsIndex';
import { useAppSelector } from '../../../../../app/hooks';
import DetailsSubTab from './DetailsSubTab';

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
    <section className="flex flex-col overflow-y-scroll h-fit ">
      {showPilot && <DetailsSubTab />}
      <div>{selectedSubSection ? selectedSubSection.element : null}</div>
    </section>
  );
}
