import React from 'react';

export default function Header() {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
          Team member
        </th>
        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6" />
      </tr>
    </thead>
  );
}
