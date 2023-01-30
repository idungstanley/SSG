import React, { useMemo, useState } from 'react';
import AddTo from '../attachments/AddTo';
import DetailsIndex from './properties/DetailsIndex';
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
  const [activeSubTabId, setActiveSubTabId] = useState<number>(0);
  const selectedSubSection = useMemo(
    () => DetailOptions.find((option) => option.id === activeSubTabId),
    [activeSubTabId]
  );
  return (
    <section className="flex flex-col h-full">
      <DetailsSubTab
        activeSubTabId={activeSubTabId}
        setActiveSubTabId={setActiveSubTabId}
      />
      <div>{selectedSubSection ? selectedSubSection.element : null}</div>
    </section>
  );
}
