import React, { useState } from 'react';
import DefaultBoxTemp from '../../../DefaultBoxTemp';
import OpenTodoTabs from '../OpenTodoTabs';

export default function Overdue() {
  const [openTab, setOpenTab] = useState<boolean>(false);

  return (
    <div>
      <OpenTodoTabs openTab={openTab} title="Overdue" setOpenTab={setOpenTab} />

      {openTab && <DefaultBoxTemp title="No overdue tasks or Reminders scheduled." />}
    </div>
  );
}
