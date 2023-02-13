import React from 'react';
import SharedTable from './components/SharedTable';

export default function SharedPage() {
  return (
    <div className="h-full flex flex-col w-full">
      <div className="relative flex-1 overflow-y-scroll overflow-x-none bg-white align-middle min-w-full overflow-hidden h-full">
        <SharedTable />
      </div>
    </div>
  );
}
