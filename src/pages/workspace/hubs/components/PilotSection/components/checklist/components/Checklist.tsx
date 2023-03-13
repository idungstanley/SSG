import React from 'react';
import { VscChecklist } from 'react-icons/vsc';
import SectionArea from '../../../../../../../../components/Pilot/components/SectionArea';
import ChecklistIndex from './ChecklistIndex';

export default function Checklists() {
  return (
    <>
      <SectionArea label="Check lists" icon={<VscChecklist className="w-4 h-4" />} />
      <section className="flex flex-col h-full">
        <ChecklistIndex />
      </section>
    </>
  );
}
