import React from 'react';
import OpenSubtask from '../../../../../assets/icons/OpenSubtask';

export default function TodoTabs() {
  return (
    <div className="space-y-7 mt-5 text-black">
      <div className="flex items-center space-x-3">
        <OpenSubtask /> <h1>Today</h1>
      </div>
      <div className="flex items-center space-x-3">
        <OpenSubtask /> <h1>Overdue</h1>
      </div>
      <div className="flex items-center space-x-3">
        <OpenSubtask /> <h1>Next</h1>
      </div>
      <div className="flex items-center space-x-3">
        <OpenSubtask /> <h1>Unscheduled</h1>
      </div>
    </div>
  );
}
