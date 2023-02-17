import React, { useMemo } from "react";
// import AddChecklist from "./subtabs/AddChecklist";
import AddChecklist from "../subtabs/AddChecklist";
// import DetailsIndex from "./properties/DetailsIndex";
// import ChecklistIndex from "./subtabs/ChecklistIndex";
import ChecklistIndex from "../subtabs/ChecklistIndex";
// import { useAppSelector } from "../../../../../app/hooks";
import { useAppSelector } from "../../../../../../app/hooks";
// import ChecklistSubtab from "./subtabs/ChecklistSubtab";
import ChecklistSubtab from "../subtabs/ChecklistSubtab";

export const cheklistOptions = [
  {
    id: 1,
    element: <AddChecklist />,
  },
  {
    id: 2,
    element: <ChecklistIndex />,
  },
];
export default function Checklists() {
  const { activeSubChecklistTabId, showPilot } = useAppSelector(
    (state) => state.workspace
  );
  const selectedSubSection = useMemo(
    () =>
      cheklistOptions.find((option) => option.id === activeSubChecklistTabId),
    [activeSubChecklistTabId]
  );
  console.log(activeSubChecklistTabId);
  return (
    <section className={`flex flex-col h-full`}>
      {showPilot && <ChecklistSubtab />}
      <div>{selectedSubSection ? selectedSubSection.element : null}</div>
    </section>
  );
}
