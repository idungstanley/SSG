import { ClockIcon } from '@heroicons/react/24/outline';
import React from 'react';
import SectionArea from '../../../../../../../components/Pilot/components/SectionArea';
import TimeClockTabs from './subtabs/TimeClock';
// import TimeEntries from '../../../../../tasks/timeclock/TimeEntries';

export default function TimeClock() {
  return (
    <>
      <SectionArea label="Time Clock" icon={<ClockIcon className="w-4 h-4" />} />
      {/* <div>
        <TimeEntries />
      </div> */}

      <>
        <TimeClockTabs />
      </>
    </>
  );
}
