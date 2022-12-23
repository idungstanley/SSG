import React from 'react';
import ChangeView from '../../../explorer/ExplorerPage/components/Toolbar/components/ChangeView';
import SortingItems from '../../../explorer/ExplorerPage/components/Toolbar/components/SortingItems';

export default function Toolbar() {
  return (
    <div className="min-h-0 p-4 flex-shrink-0 items-center justify-between bg-white border-b flex min-w-0 flex-1 border-gray-200 xl:flex">
      <h1 className="text-xl">Shared with me</h1>

      <div className="flex flex-wrap justify-between gap-y-4 sm:gap-x-4 gap-x-2">
        <div className="space-x-3 sm:space-x-6">
          <SortingItems />
          <ChangeView />
        </div>
      </div>
    </div>
  );
}
