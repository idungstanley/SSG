import React from 'react';
import { ImyTaskData } from '../../../../../../features/task/taskSlice';

interface AutoProgressProps {
  task: ImyTaskData;
  fieldId: string;
}

function AutoProgress({ task, fieldId }: AutoProgressProps) {
  // console.log(task);
  return <div>AutoProgress</div>;
}

export default AutoProgress;
