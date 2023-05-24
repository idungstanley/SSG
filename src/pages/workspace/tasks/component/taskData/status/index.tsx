import React from 'react';
import { renderDataProps } from '../DataRenderFunc';
import Completed from './Completed';
import InProgress from './InProgress';
import Archived from './Archived';
import Todo from './Todo';

export default function TaskStatus({ taskColField, task }: renderDataProps) {
  if (taskColField == 'completed') {
    return (
      <>
        <Completed taskColField={taskColField} task={task} />
      </>
    );
  } else if (taskColField == 'in progress') {
    return (
      <>
        <InProgress taskColField={taskColField} task={task} />
      </>
    );
  } else if (taskColField == 'archived') {
    return (
      <>
        <Archived taskColField={taskColField} task={task} />
      </>
    );
  } else if (taskColField == 'todo') {
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
