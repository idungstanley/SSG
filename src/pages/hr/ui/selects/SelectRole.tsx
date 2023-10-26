import React from 'react';

export function SelectRole() {
  return (
    <select id="current-tab" name="current-tab" className="flex items-center h-12 mx-2 border-t opacity-90">
      <option value="Administrator">Administrator</option>
      <option value="Bookkeeping">Bookkeeping</option>
      <option value="Director">Director</option>
      <option value="Accountant">Accountant</option>
      <option value="Graphic Designer">Graphic Designer</option>
      <option value="Marketing">Marketing</option>
    </select>
  );
}
