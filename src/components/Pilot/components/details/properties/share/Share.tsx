import React from 'react';
import { BsShare } from 'react-icons/bs';
import ShareModal from './shareModal/ShareModal';

export default function Share({ taskId, taskName }: { taskId?: string; taskName?: string }) {
  return (
    <div className="flex p-0.5 items-center space-x-0.5 border border-gray-400 rounded-md">
      <BsShare className="text-xs h-2.5" />
      {/* <button className=" text-xs text-gray-500  ">Share</button> */}
      <ShareModal taskId={taskId} taskName={taskName} />
    </div>
  );
}
