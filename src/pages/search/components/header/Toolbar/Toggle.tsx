import React from 'react';
import { Switch } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { setSearchFileContents } from '../../../../../features/search/searchSlice';
import { useAppSelector } from '../../../../../app/hooks';
import { cl } from '../../../../../utils';

export default function Toggle() {
  const dispatch = useDispatch();
  const searchFileContents = useAppSelector((state) => state.search.searchFileContents);

  const setState = (state: boolean) => {
    dispatch(setSearchFileContents(state));
  };

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={searchFileContents}
        onChange={setState}
        className={cl(
          searchFileContents ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        )}
      >
        <span
          aria-hidden="true"
          className={cl(
            searchFileContents ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900">Search file contents</span>
      </Switch.Label>
    </Switch.Group>
  );
}
