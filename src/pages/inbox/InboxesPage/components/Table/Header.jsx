import React, { useState } from 'react';

function Header() {
  const [checked, setChecked] = useState(false);

  const handleShow = () => {
    setChecked(!checked);

    // TODO: add hidden inboxes to all
  };

  return (
    <thead>
      <tr>
        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <span className="">Inbox</span>
        </th>
        <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Send files to
        </th>
        <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Last updated
        </th>
        <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
        <div className="relative flex items-center">
          <div className="flex h-5 items-center">
            <input
              id="ShowHidden"
              name="ShowHidden"
              type="checkbox"
              checked={checked}
              onChange={handleShow}
              className="h-6 w-6 rounded border-gray-300 text-indigo-600 hover:border-gray-500 transition-all duration-300 focus:ring-0 focus:ring-offset-0"
            />
          </div>
          <div className="ml-2 text-sm">
            <label htmlFor="comments" className="font-medium text-gray-700">
              Show hidden
            </label>
          </div>
        </div>
      </tr>
    </thead>
  );
}

export default Header;
