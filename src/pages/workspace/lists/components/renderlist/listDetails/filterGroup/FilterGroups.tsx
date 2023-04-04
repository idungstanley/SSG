import React from 'react';
import { BsTrash } from 'react-icons/bs';

export default function FilterGroups() {
  return (
    <div className="groupFiltalModal">
      <header className="flex  justify-between w-11/12 m-auto mt-5 mb-6">
        <h1>Filters</h1>
        <span>X</span>
      </header>

      <div id="dropdown">
        <div id="selectOptions" className="flex w-10/12 m-auto justify-between items-center">
          <p className="text-xl">Where</p>
          <div id="filterField">
            <select name="" id="" className="rounded-md">
              <option value="">Status</option>
              <option value="">Tags</option>
              <option value="">Due Date</option>
              <option value="">Priority</option>
              <option value="">Assignee</option>
              <option value="">Archived</option>
              <option value="">Assigned comment</option>
              <option value="">Created by</option>
              <option value="">Date closed</option>
              <option value="">Date created</option>
              <option value="">Date updated</option>
              <option value="">Date done</option>
            </select>
          </div>
          <div id="isIsNot">
            <select name="" id="" className="rounded-md">
              <option value="">Is</option>
              <option value="">Is not</option>
            </select>
          </div>

          <div id="filterDrop">
            <select name="" id="" className="rounded-md">
              <option value="">High</option>
              <option value="">low</option>
              <option value="">urgent</option>
              <option value="">normal</option>
              <option value="">No Priority</option>
            </select>
          </div>

          <div id="trashButton">
            <BsTrash className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
