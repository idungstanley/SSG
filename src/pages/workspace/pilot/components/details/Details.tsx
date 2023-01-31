import React, { useMemo, useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import AddTo from '../addTo/AddTo';
import DetailsIndex from '../subDetails/DetailsIndex';
import DetailsSubTab from './DetailsSubTab';

const DetailOptions = [
  {
    id: 0,
    element: <DetailsIndex />,
  },
  {
    id: 1,
    element: <AddTo />,
  },
];
export default function Details() {
  const { activeSubDetailsTabId, showPilot } = useAppSelector(
    (state) => state.workspace
  );
  const selectedSubSection = useMemo(
    () => DetailOptions.find((option) => option.id === activeSubDetailsTabId),
    [activeSubDetailsTabId]
  );
  return (
    <section className={`flex flex-col h-full`}>
      {showPilot && <DetailsSubTab />}
      <div>{selectedSubSection ? selectedSubSection.element : null}</div>
    </section>
  );
}
