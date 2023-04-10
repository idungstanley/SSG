import React from 'react';
import { IoStopCircleOutline } from 'react-icons/io5';
import { HiOutlinePlayCircle } from 'react-icons/hi2';
import { MdOutlinePauseCircle } from 'react-icons/md';
import ToolTip from '../../../Tooltip';

export default function Recording() {
  return (
    <div className="screenRecording">
      <div id="startRecord">
        <ToolTip tooltip="Start Screen Recording">
          <HiOutlinePlayCircle className="h-6 w-6" />
        </ToolTip>
      </div>
      <div id="pauseRecording">
        <ToolTip tooltip="Pause Screen Recording">
          <MdOutlinePauseCircle className="h-6 w-6" />
        </ToolTip>
      </div>
      <div id="stopRecording">
        <ToolTip tooltip="Stop Screen Recording">
          <IoStopCircleOutline className="h-6 w-6" />
        </ToolTip>
      </div>
    </div>
  );
}
