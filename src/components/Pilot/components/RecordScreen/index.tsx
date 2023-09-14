import Recording from './Recording';
import VideoEntries from './RecordingLogs';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import CollapseIcon from '../../../Views/ui/collapseIcon/CollapseIcon';
import { useState } from 'react';
import { ClockIcon } from '../../../../assets/icons/ClockIcon';

export default function RecordScreen() {
  const [showLogs, setShowLogs] = useState<boolean>(false);

  const handleShowLogs = () => {
    setShowLogs(!showLogs);
  };

  return (
    <section className="p-2 mt-6 bg-white relative">
      <div className="relative w-full pb-8 px-2 pt-2 rounded-lg border-t-2 border-l-2 border-b-2 border-alsoit-gray-100">
        <label
          htmlFor=""
          className="absolute -top-0 -left-0 bg-alsoit-gray-100 text-alsoit-gray-50 rounded-t-sm p-0.5 flex space-x-1 items-center font-semibold pr-1"
        >
          <ClockIcon fixed />
          <span className="text-alsoit-text-md">RECORDER</span>
        </label>
        <Recording />
      </div>
      {/* Video Logs */}
      <div className="w-full pb-8 px-2 pt-2 my-4 flex flex-col space-y-2 rounded-lg border-t-2 border-l-2 border-b-2 border-alsoit-gray-100">
        <label htmlFor="video-entries" className="relative w-full">
          <div className="absolute -top-2 -left-2 w-28 bg-alsoit-gray-100 p-1.5 rounded-t-sm flex gap-2">
            <div className="cursor-pointer">
              <CollapseIcon color="#A854F7" active={showLogs} onToggle={() => handleShowLogs()} hoverBg="white" />
            </div>
            <span className="font-semibold text-alsoit-gray-50 text-alsoit-text-md uppercase">Record Logs</span>
          </div>
        </label>
        {showLogs && (
          <VerticalScroll>
            <div className="h-96 mt-6">
              <VideoEntries />
            </div>
          </VerticalScroll>
        )}
      </div>
    </section>
  );
}
