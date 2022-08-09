import React from 'react';
import {
  DocumentTextIcon,
  FolderIcon,
  // InboxIcon,
} from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';
import { setResultsType } from '../../../../features/search/searchSlice';

const tabs = [
  {
    name: 'Files',
    key: 'files',
    href: '#',
    icon: DocumentTextIcon,
    current: false,
  },
  {
    name: 'Folders',
    key: 'folders',
    href: '#',
    icon: FolderIcon,
    current: false,
  },
  /*
  {
    name: 'Inbox files',
    key: 'inbox-files',
    href: '#',
    icon: InboxIcon,
    current: true,
  },
  */
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function FilterResults() {
  const dispatch = useDispatch();
  const resultsType = useSelector((state) => state.search.results_type);

  const onChangeTab = (key) => {
    dispatch(setResultsType(key));
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.key === resultsType).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                onClick={() => onChangeTab(tab.key)}
                type="button"
                key={tab.name}
                className={classNames(
                  tab.key === resultsType
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
                )}
                aria-current={tab.key === resultsType ? 'page' : undefined}
              >
                <tab.icon
                  className={classNames(
                    tab.key === resultsType ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5',
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
