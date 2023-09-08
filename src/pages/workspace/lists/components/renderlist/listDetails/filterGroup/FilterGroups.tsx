import React, { useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import IsIsNot from './isIsNotIsSetIsNotSet/IsIsNot';
import PriorityFllter from './filterOptions/PriorityFllter/PriorityFllter';
import IsSetIsNotSet from './isIsNotIsSetIsNotSet/IsSetIsNotSet';
import TagFilter from './filterOptions/TagFilter/TagFilter';
import AssigneeFilter from './filterOptions/AssigneeFilter/AssigneeFilter';
import DueDateFilter from './filterOptions/DueDateFilter/DueDateFilter';
import ArchivedFilter from './filterOptions/ArchivedFilter/ArchivedFilter';
import StatusFilter from './filterOptions/StatusFilter/StatusFilter';

export default function FilterGroups() {
  const [selectOptions, setSelectOptions] = useState<null | string>(null);
  return (
    <div className="groupFiltalModal">
      <header className="flex  justify-between w-11/12 m-auto mt-5 mb-6">
        <h1>Filters</h1>
        <span>X</span>
      </header>

      <div id="dropdown">
        <div id="selectOptions" className="flex w-10/12 m-auto justify-between items-center">
          <p className="text-xl ">Where</p>
          <div id="filterField ">
            <select
              name="Select Filter"
              id=""
              className="rounded-md"
              onChange={(e) => setSelectOptions(e.target.value)}
            >
              <option value="Value">Select filter</option>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="assignee">Assignee</option>
              <option value="archived">Archived</option>
              <option value="tags">Tags</option>
              <option value="due_date">Due Date</option>
            </select>
          </div>

          <div>
            {selectOptions === 'status' ? (
              <div id="filterDrop">
                <IsIsNot />
              </div>
            ) : selectOptions === 'priority' ? (
              <div id="filterDrop">
                <IsSetIsNotSet />
              </div>
            ) : selectOptions === 'tags' ? (
              <div id="filterDrop">
                <IsSetIsNotSet />
              </div>
            ) : selectOptions === 'assignee' ? (
              <div id="filterDrop">
                <IsSetIsNotSet />
              </div>
            ) : selectOptions === 'due_date' ? (
              <div id="filterDrop">
                <IsSetIsNotSet />
              </div>
            ) : null}
          </div>

          <div>
            {selectOptions === 'status' ? (
              <div id="filterDrop">
                <StatusFilter />
              </div>
            ) : selectOptions === 'priority' ? (
              <div id="filterDrop">
                <PriorityFllter />
              </div>
            ) : selectOptions === 'tags' ? (
              <div id="filterDrop">
                <TagFilter />
              </div>
            ) : selectOptions === 'assignee' ? (
              <div id="filterDrop">
                <AssigneeFilter />
              </div>
            ) : selectOptions === 'due_date' ? (
              <div id="filterDrop">
                <DueDateFilter />
              </div>
            ) : selectOptions === 'archived' ? (
              <div id="filterDrop">
                <ArchivedFilter />
              </div>
            ) : null}
          </div>

          <div id="trashButton">
            <BsTrash className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
