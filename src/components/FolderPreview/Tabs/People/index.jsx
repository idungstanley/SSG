import React from 'react';
import { PlusSmIcon as PlusSmIconSolid } from '@heroicons/react/solid';

const currentFile = {
  name: 'IMG_4985.HEIC',
  size: '3.9 MB',
  source:
    'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  information: {
    'Uploaded by': 'Marie Culver',
    Created: 'June 8, 2020',
    'Last modified': 'June 8, 2020',
    Dimensions: '4032 x 3024',
    Resolution: '72 x 72',
  },
  sharedWith: [
    {
      id: 1,
      name: 'Aimee Douglas',
      imageUrl:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80',
    },
    {
      id: 2,
      name: 'Andrea McMillan',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
};

function People() {
  return (
    <div>
      <ul className="mt-2 border-gray-200 divide-y divide-gray-200">
        {currentFile.sharedWith.map((person) => (
          <li
            key={person.id}
            className="py-3 flex justify-between items-center"
          >
            <div className="flex items-center">
              <img
                src={person.imageUrl}
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <p className="ml-4 text-sm font-medium text-gray-900">
                {person.name}
              </p>
            </div>
            <button
              type="button"
              className="ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Remove
              <span className="sr-only">{person.name}</span>
            </button>
          </li>
        ))}
        <li className="py-2 flex justify-between items-center">
          <button
            type="button"
            className="group -ml-1 bg-white p-1 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
              <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
              Share
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default People;
