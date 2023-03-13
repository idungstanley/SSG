import React from 'react';
import ToolTip from '../../../../../../../components/Tooltip';

export default function CustomReference() {
  return (
    <div>
      <ToolTip tooltip="AWM-22">
        <button className="p-0.5 text-xs text-gray-500 border border-gray-400 rounded-md hover:bg-gray-400 hover:text-white ">
          <p> AWM-22</p>
        </button>
      </ToolTip>
    </div>
  );
}
