import React from 'react';

export function SelectLocation() {
  return (
    <select id="current-tab" name="current-tab" className="flex items-center h-12 mx-2 border-t opacity-90">
      <option value="London">London</option>
      <option value="Nigeria">Nigeria</option>
      <option value="Newcastle">Newcastle</option>
      <option value="Ukraine">Ukraine</option>
      <option value="York">York</option>
    </select>
  );
}
