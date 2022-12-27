import React from 'react';

export default function Header() {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th
          scope="col"
          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
        >
          Group
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Created at
        </th>
      </tr>
    </thead>
  );
}
