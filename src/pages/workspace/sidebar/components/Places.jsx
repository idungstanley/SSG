import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import Dashboard from '../../dashboard';
import Directory from '../../directory';
import Favourites from '../../favourites';
import Files from '../../files';
import Hubs from '../../hubs';
import Inbox from '../../inbox';

const secondaryNavigation = [
  { name: 'favourite', id: 1, place: <Favourites /> },
  { name: 'hubs', id: 2, place: <Hubs /> },
  { name: 'inbox', id: 3, place: <Inbox /> },
  { name: 'files', id: 4, place: <Files /> },
  { name: 'dashboard', id: 5, place: <Dashboard /> },
  { name: 'directory', id: 6, place: <Directory /> },
];

export default function Places() {
  const [activePlaceId, setActivePlaceId] = useState(null);

  return (
    <div className="mt-2">
      <h3
        className="px-3 text-sm font-medium text-gray-500 uppercase"
        id="projects-headline"
      >
        Places
      </h3>
      <ul className="mt-1 space-y-1 divide-y divide-gray-200" aria-labelledby="projects-headline">
        {secondaryNavigation.map((item) => (
          <li
            key={item.id}
            className="items-stretch group uppercase flex flex-col rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <button
              className="flex justify-between items-center w-full"
              type="button"
              onClick={() => setActivePlaceId((prev) => prev === item.id || item.id)}
            >
              <span className="truncate uppercase font-semibold text-sm">
                {item.name}
              </span>
              {activePlaceId === item.id ? (
                <ChevronRightIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              )}
            </button>
            {activePlaceId === item.id ? (
              <div className="bg-white mt-2 hover:bg-white block">
                {item.place}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
