import React, { TdHTMLAttributes, useState } from 'react';
import Description from './Description';
import AttachFile from './AttachFile';
import SubtaskWithCount from './SubtaskWithCount';
import Checklist from './Checklist';
import { Task } from '../../features/task/interface.tasks';
import InteractiveTooltip from '../Tooltip/InteractiveTooltip';
import ToolTip from '../Tooltip/Tooltip';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShowNewTaskField, setShowNewTaskId } from '../../features/task/taskSlice';

interface BadgeTask extends TdHTMLAttributes<HTMLTableCellElement> {
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
    <div className="flex items-center space-x-1">
      {task.description && (
        <InteractiveTooltip content={<p>{task.description}</p>} top="-top-14" right="-right-3">
          <button className="p-1 border rounded-md ">
            <Description />
          </button>
        </InteractiveTooltip>
      )}
      <ToolTip tooltip="Attach File">
        <button className="p-1 border rounded-md">
          <AttachFile />
        </button>
      </ToolTip>
      {task.descendants_count > 0 && (
        <ToolTip tooltip="Subtask">
          <button className="p-1 border rounded-md " onClick={(e) => onShowAddSubtaskField(e, task.id)}>
            <SubtaskWithCount />
          </button>
        </ToolTip>
      )}
      {/* <ToolTip tooltip="Checklist">
        <button className="p-1 border rounded-md ">
          <Checklist />
        </button>
      </ToolTip> */}
    </div>
  );
}
