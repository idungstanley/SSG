import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import React, { useState, memo } from 'react';
import Item from '../../../search/components/Item';
import Dashboard from '../../dashboard';
import Directory from '../../directory';
import Favourites from '../../favourites';
import Files from '../../files';
import Hubs from '../../hubs';
import Inbox from '../../inbox';

interface activeData {
  setActivePlaceId: () => boolean;
}

const secondaryNavigation = [
  { name: 'favourite', id: 1, place: <Favourites /> },
  { name: 'hubs', id: 2, place: <Hubs /> },
  { name: 'inbox', id: 3, place: <Inbox /> },
  { name: 'files', id: 4, place: <Files /> },
  { name: 'dashboard', id: 5, place: <Dashboard /> },
  { name: 'directory', id: 6, place: <Directory /> },
];

function Places() {
  const [activePlaceId, setActivePlaceId] = useState<number | null>(null);

  const handleActive = (id: number) => {
    setActivePlaceId((prev) => {
      if (prev === id) {
        return id;
      } else {
        return id;
      }
    });
  };

  return (
    <div className="mt-2">
      <h3
        className="px-3 text-sm font-medium text-gray-500 uppercase"
        id="projects-headline"
      >
        Places
      </h3>
      <ul className="space-x-1 divide-y" aria-labelledby="projects-headline">
        {secondaryNavigation.map((item) => (
          <li
            key={item.id}
            className="flex flex-col items-stretch px-3 py-3 text-sm font-medium text-gray-600 uppercase rounded-md cursor-pointer group hover:bg-gray-50 hover:text-gray-900"
          >
            <button
              className="flex items-center justify-between w-full"
              type="button"
              onClick={() => handleActive(item.id)}
            >
              <span className="text-sm font-semibold uppercase truncate">
                {item.name}
              </span>
              {activePlaceId === item.id ? (
                <ChevronRightIcon
                  className="flex-shrink-0 w-5 h-3"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="flex-shrink-0 w-5 h-3"
                  aria-hidden="true"
                />
              )}
            </button>
            {activePlaceId === item.id ? (
              <div className="mt-2">{item.place}</div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(Places);
