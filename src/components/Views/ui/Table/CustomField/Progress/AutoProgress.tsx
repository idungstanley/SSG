import React from 'react';
import { ImyTaskData } from '../../../../../../features/task/taskSlice';
import { IField } from '../../../../../../features/list/list.interfaces';
import { autoProgressProperties } from '../../../../../../features/task/interface.tasks';

interface AutoProgressProps {
  task: ImyTaskData;
  fieldId: string;
  entityCustomProperty?: IField;
}

const calcaluatePercent = (part: number, whole: number) => (part / whole) * 100;

function AutoProgress({ task, fieldId, entityCustomProperty }: AutoProgressProps) {
  const criteria: autoProgressProperties = entityCustomProperty?.properties as autoProgressProperties;
  const all_checklists = criteria.tracking.Checklists ? task.checklist_items_count : 0;
  const done_checklists = criteria.tracking.Checklists ? task.checklist_done_items_count : 0;
  const all_subtasks = criteria.tracking.Subtasks ? task.descendants_count : 0;
  const done_subtasks = criteria.tracking.Subtasks ? task.closed_subtasks_count : 0;

  const part = done_checklists + done_subtasks;
  const whole = all_subtasks + all_checklists;
  const noDescendantsVal = criteria.complete_on === 1 ? 100 : 0;

  const totalPercentage = calcaluatePercent(part, whole);

  return (
    <div className="w-full">
      <div className="w-full flex justify-center -mb-2">
        <h2 className="text-alsoit-text-md">{task.has_descendants ? totalPercentage : noDescendantsVal}</h2>
      </div>
      <input
        id="minmax-range"
        type="range"
        min="0"
        max="100"
        value={task.has_descendants ? totalPercentage : noDescendantsVal}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
}

export default AutoProgress;
