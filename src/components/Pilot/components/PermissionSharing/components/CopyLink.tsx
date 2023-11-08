import React from 'react';
import { BiLinkAlt } from 'react-icons/bi';
import { BsInfoCircleFill } from 'react-icons/bs';
import ToolTip from '../../../../Tooltip/Tooltip';

function CopyLink() {
  return (
    <div className="w-11/12 m-auto">
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex gap-1 items-center">
          <BiLinkAlt className="w-3 h-3" />
          <h3 className="text-alsoit-text-lg">Private Link</h3>
          <ToolTip title="Only those with permissions can access with this link.">
            <BsInfoCircleFill className="w-3 h-3 text-alsoit-gray-75" />
          </ToolTip>
        </div>
        <button className="p-0.5 rounded bg-white border border-alsoit-gray-100 text-alsoit-text-md w-24">
          Copy Link
        </button>
      </div>
    </div>
  );
}

export default CopyLink;
