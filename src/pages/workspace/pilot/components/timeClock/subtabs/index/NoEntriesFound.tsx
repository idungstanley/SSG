import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSubTimeClockTabId } from '../../../../../../../features/workspace/workspaceSlice';

export default function NoEntriesFound() {
  const dispatch = useDispatch();
  return (
    <main className="flex min-h-full flex-col bg-white mx-auto w-full max-w-7xl flex-grow justify-center px-4 sm:px-6 lg:px-8 text-center">
      {/* <p className="text-base font-semibold text-indigo-600">404</p> */}
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">Sorry, No Entries</h1>

      <div className="mt-6">
        <div
          className="text-base font-medium text-indigo-600 hover:text-indigo-500"
          onClick={() => dispatch(setActiveSubTimeClockTabId(0))}
        >
          Start the time clock to get new entry
          <span aria-hidden="true"> &rarr;</span>
        </div>
      </div>
    </main>
  );
}
