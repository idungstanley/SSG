import React from 'react';
import Completed from './Completed';
import InProgress from './InProgress';
import Archived from './Archived';
import Todo from './Todo';
import { ImyTaskData } from '../../../../../../features/task/taskSlice';
import { Status } from '../../../../../../features/task/interface.tasks';

export default function TaskStatus({ taskColField, task }: { task?: ImyTaskData; taskColField: Status }) {
  if (taskColField.name == 'completed') {
    return (
      <>
        <Completed taskColField={taskColField} task={task} />
      </>
    );
  } else if (taskColField.name == 'in progress') {
    return (
      <>
        <InProgress taskColField={taskColField} task={task} />
      </>
    );
  } else if (taskColField.name == 'archived') {
    return (
      <>
        <Archived taskColField={taskColField} task={task} />
      </>
    );
  } else if (taskColField.name == 'to do') {
    return (
      <>
        <Todo taskColField={taskColField} task={task} />
      </>
    );
  } else {
    return (
      <>
        <Todo taskColField={taskColField} task={task} />
      </>
    );
  }
}
