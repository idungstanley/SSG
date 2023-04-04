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
        <div>
          <Completed taskColField={taskColField} task={task} />
        </div>
      </>
    );
  } else if (taskColField == 'in progress') {
    return (
      <>
        <div>
          <InProgress taskColField={taskColField} task={task} />
        </div>
      </>
    );
  } else if (taskColField == 'archived') {
    return (
      <>
        <div>
          <Archived taskColField={taskColField} task={task} />
        </div>
      </>
    );
  } else if (taskColField == 'todo') {
    return (
      <>
        <div>
          <Todo taskColField={taskColField} task={task} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <Todo taskColField={taskColField} task={task} />
        </div>
      </>
    );
  }
}
