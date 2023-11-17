import React, { useState } from 'react';
import DefaultBoxTemp from '../../../DefaultBoxTemp';
import OpenTodoTabs from '../OpenTodoTabs';

export default function Next() {
  const [openTab, setOpenTab] = useState<boolean>(false);
  return (
    <div>
      <OpenTodoTabs openTab={openTab} title="Next" setOpenTab={setOpenTab} />

      {openTab && <DefaultBoxTemp title="No upcoming tasks or Reminders scheduled." />}
    </div>
  );
}
