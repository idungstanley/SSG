import React from 'react';

interface LocationProps {
  selectMemberLocation: (id: string) => void;
}

export function SelectLocation({ selectMemberLocation }: LocationProps) {
  return (
    <select
      id="current-tab"
      name="current-tab"
      className="flex items-center h-12 mx-2 border-t opacity-90 w-11/12"
      onChange={(e) => selectMemberLocation(e.target.value)}
    >
      <option key="0" value="">
        Select location
      </option>
      <option value="London">London</option>
      <option value="Nigeria">Nigeria</option>
      <option value="Newcastle">Newcastle</option>
      <option value="Ukraine">Ukraine</option>
      <option value="York">York</option>
    </select>
  );
}
