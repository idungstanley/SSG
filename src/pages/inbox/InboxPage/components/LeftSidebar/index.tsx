import React from 'react';
import Header from './Header';
import TableWithSelection from './TableWthSelection';

function LeftSidebar() {
  return (
    <div className="h-full pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0 relative">
      <div className="absolute inset-0" />
      <aside className="h-full hidden xl:block xl:flex-shrink-0 xl:order-first">
        <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100">
          <Header />
          <div className="h-full overflow-y-scroll bg-white">
            <TableWithSelection />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default LeftSidebar;
