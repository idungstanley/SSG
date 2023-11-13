import React, { useState } from 'react';
import OpenSubtask from '../../../../../../../assets/icons/OpenSubtask';
import AllDoneForTheDay from '../../AllDoneForTheDay';
import CloseSubtask from '../../../../../../../assets/icons/CloseSubtask';

export default function Today() {
  const [openTab, setOpenTab] = useState<boolean>(false);

  return (
    <div onClick={() => setOpenTab(!openTab)}>
      <div className="flex pb-5 items-center cursor-pointer space-x-3">
        <p>{!openTab ? <OpenSubtask /> : <CloseSubtask />}</p> <h1>Today</h1>
      </div>
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
