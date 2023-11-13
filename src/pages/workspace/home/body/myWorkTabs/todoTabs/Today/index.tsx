import React, { useState } from 'react';
import AllDoneForTheDay from '../../AllDoneForTheDay';
import OpenTodoTabs from '../OpenTodoTabs';

export default function Today() {
  const [openTab, setOpenTab] = useState<boolean>(false);

  return (
    <div>
      <OpenTodoTabs openTab={openTab} title="Today" setOpenTab={setOpenTab} NoDueDate={true} />
      <AllDoneForTheDay
        allDoneState={openTab}
        title="Woohoo, youre all done!"
        description={
          <div>
            <p>Tasks and Reminders that are scheduled for Today</p> <p>will appear here.</p>
          </div>
        }
      />
    </div>
  );
}
