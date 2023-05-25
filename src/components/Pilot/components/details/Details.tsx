import React, { useMemo } from 'react';
import AddTo from './properties/attachments/AddTo';
import DetailsIndex from './properties/DetailsIndex';
import DetailsSubTab from './DetailsSubTab';
import { useAppSelector } from '../../../../app/hooks';
import SectionArea from '../SectionArea';
import { DetailsIcon } from '../../../../assets/icons';

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
  const { activeSubDetailsTabId } = useAppSelector((state) => state.workspace);
  const selectedSubSection = useMemo(
    () => DetailOptions.find((option) => option.id === activeSubDetailsTabId),
    [activeSubDetailsTabId]
  );

  return (
    <>
      <SectionArea label="Details" icon={<DetailsIcon className="w-4 h-4" />} />
      <section className="flex flex-col overflow-y-scroll h-fit mb-11 ">
        <DetailsSubTab />
        <div>{selectedSubSection ? selectedSubSection.element : null}</div>
      </section>
    </>
  );
}
