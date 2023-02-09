import React, { useMemo } from "react";
import AddTo from "../../attachments/AddTo";
import AddChecklist from "../subtabs/AddChecklist";
// import DetailsIndex from "./properties/DetailsIndex";
import ChecklistIndex from "../subtabs/ChecklistIndex";
import { useAppSelector } from "../../../../../../app/hooks";
import ChecklistSubtab from "../subtabs/ChecklistSubtab";

const DetailOptions = [
  {
    id: 1,
    element: <ChecklistIndex />,
  },
  {
    id: 2,
    element: <AddChecklist />,
  },
];
export default function Checklists() {
  const { activeSubChecklistTabId, showPilot } = useAppSelector(
    (state) => state.workspace
  );
  const selectedSubSection = useMemo(
    () => DetailOptions.find((option) => option.id === activeSubChecklistTabId),
    [activeSubChecklistTabId]
  );
  return (
    <section className={`flex flex-col h-full`}>
      {showPilot && <ChecklistSubtab />}
      <div>{selectedSubSection ? selectedSubSection.element : null}</div>
    </section>
  );
}
