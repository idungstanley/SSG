import React, { useState } from 'react';
import OpenSubtask from '../../../../../../../assets/icons/OpenSubtask';
import CloseSubtask from '../../../../../../../assets/icons/CloseSubtask';
import DefaultBoxTemp from '../../../DefaultBoxTemp';

export default function Next() {
  const [openTab, setOpenTab] = useState<boolean>(false);
  return (
    <div>
      <div>
        <div className="flex items-center cursor-pointer pb-5 space-x-3" onClick={() => setOpenTab(!openTab)}>
          <p>{!openTab ? <OpenSubtask /> : <CloseSubtask />}</p> <h1>Next</h1>
        </div>

        {openTab && <DefaultBoxTemp title="No upcoming tasks or Reminders scheduled." />}
      </div>
    </div>
  );
}
