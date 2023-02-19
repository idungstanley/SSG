import React, { useMemo } from "react";
import { useAppSelector } from "../../../../../app/hooks";
import ChatForPilot from "../../../../../components/Chat/ChatForPilot";
import CommunicationSubTab from "./CommunicationSubTab";

export const communicationOptions = [
  {
    id: 1,
    element: <ChatForPilot />,
  },
  { id: 2, element: <ChatForPilot /> },
  {
    id: 3,
    element: <ChatForPilot />,
  },
];
export default function Commnunication() {
  const { activeSubCommunicationTabId, showPilot } = useAppSelector(
    (state) => state.workspace
  );
  const selectedSubSection = useMemo(
    () =>
      communicationOptions.find(
        (option) => option.id === activeSubCommunicationTabId
      ),
    [activeSubCommunicationTabId]
  );
  return (
    <section className="flex flex-col">
      {showPilot && <CommunicationSubTab />}
      <div>{selectedSubSection ? selectedSubSection.element : null}</div>
    </section>
  );
}
