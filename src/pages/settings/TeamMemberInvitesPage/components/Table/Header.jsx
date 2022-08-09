import React from 'react';

export default function Header() {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
          Email
        </th>
        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Role
        </th>
        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Status
        </th>
        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Invited at
        </th>
        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Expires at
        </th>
        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6" />
      </tr>
    </thead>
  );
}
