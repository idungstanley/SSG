import React, { TdHTMLAttributes, useState } from 'react';
import Description from './Description';
import AttachFile from './AttachFile';
import SubtaskWithCount from './SubtaskWithCount';
import Checklist from './Checklist';
import { Task } from '../../features/task/interface.tasks';
import ToolTip from '../Tooltip/Tooltip';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShowNewTaskField, setShowNewTaskId } from '../../features/task/taskSlice';
import DetailsOnHover from '../Dropdown/DetailsOnHover/DetailsOnHover';

export interface BadgeTask extends TdHTMLAttributes<HTMLTableCellElement> {
  task: Task;
}
export default function Badges({ task }: BadgeTask) {
  const { showNewTaskField } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const onShowAddSubtaskField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, taskId: string) => {
    if (showNewTaskField) {
      dispatch(setShowNewTaskId(''));
      dispatch(setShowNewTaskField(false));
    } else {
      dispatch(setShowNewTaskId(taskId));
      dispatch(setShowNewTaskField(true));
    }
  };
  return (
    <div>
      <div className="flex items-center space-x-1">
        {task.description && (
          <DetailsOnHover
            content={<p>{task.description}</p>}
            hoverElement={
              <button className="p-1 border rounded-md ">
                <Description />
              </button>
            }
          />
        )}

        {task.has_attachments && (
          <ToolTip tooltip="Attach File">
            <button className="p-1 border rounded-md">
              <AttachFile />
            </button>
          </ToolTip>
        )}

        {task.descendants_count > 0 && (
          <ToolTip tooltip="Subtask">
            <button className="relative p-1 border rounded-md" onClick={(e) => onShowAddSubtaskField(e, task.id)}>
              <SubtaskWithCount />
              <p className="alsoit-text-sm h-2 w-2 absolute left-5 bottom-3.5">{task.descendants_count}</p>
            </button>
          </ToolTip>
        )}
      </div>
    </div>
  );
}
