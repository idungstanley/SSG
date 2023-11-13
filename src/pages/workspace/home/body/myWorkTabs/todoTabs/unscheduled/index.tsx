import React, { useState } from 'react';
import DefaultBoxTemp from '../../../DefaultBoxTemp';
import OpenTodoTabs from '../OpenTodoTabs';

export default function Unscheduled() {
  const [openTab, setOpenTab] = useState<boolean>(false);
  return (
    <div className="pb-5">
      <OpenTodoTabs openTab={openTab} title="Unscheduled" setOpenTab={setOpenTab} NoDueDate={true} NoReminder={true} />

      {openTab && <DefaultBoxTemp title="No unscheduled tasks assigned to you." />}
    </div>
  );
}
