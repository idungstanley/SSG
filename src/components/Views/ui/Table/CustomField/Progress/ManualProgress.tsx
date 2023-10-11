import React, { useState } from 'react';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { IField } from '../../../../../../features/list/list.interfaces';

interface ManualProgressProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  entityCustomProperty?: IField;
}

function ManualProgress({ taskCustomFields, taskId, fieldId, entityCustomProperty }: ManualProgressProps) {
  const startVal = entityCustomProperty?.properties?.start_value;
  const endVal = entityCustomProperty?.properties?.end_value;
  const [progress, setProgress] = useState(taskCustomFields?.values[0].value);

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const handleProgressChange = (e: { target: { value: string } }) => {
    setProgress(e.target.value);
    onUpdate({
      taskId,
      value: [{ value: e.target.value }],
      fieldId
    });
  };

  return (
    <div className="w-full">
      <input
        type="range"
        className="w-11/12 m-auto"
        min={startVal}
        max={endVal}
        step="1"
        value={progress ?? startVal}
        onChange={handleProgressChange}
      />
      <p>Progress: {progress ?? startVal}%</p>
    </div>
  );
}

export default ManualProgress;
