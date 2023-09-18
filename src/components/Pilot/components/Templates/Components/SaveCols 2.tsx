import React from 'react';
import HelpIcon from '../../../../../assets/icons/HelpIcon';

interface saveColsProps {
  handleSubmit: () => void;
  header?: string;
  body?: string;
}

function SaveCols({ handleSubmit, header, body }: saveColsProps) {
  return (
    <div className="flex justify-between w-full my-4">
      <div className="flex p-0.5 gap-1">
        <div>
          <HelpIcon />
        </div>
        <div className="w-4/6">
          <h1>{header} </h1>
          <h2 className="my-2">{body}</h2>
        </div>
      </div>
      <div className="flex gap-1 items-end">
        <button className="p-1 bg-white rounded text-alsoit-danger h-6" style={{ width: '79px' }}>
          Cancel
        </button>
        <button style={{ width: '79px' }} className="bg-alsoit-success text-white rounded h-6" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}

export default SaveCols;
