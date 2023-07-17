import React, { TdHTMLAttributes } from 'react';
import Description from './Description';
import AttachFile from './AttachFile';
import SubtaskWithCount from './SubtaskWithCount';
import Checklist from './Checklist';
import { Task } from '../../features/task/interface.tasks';
import InteractiveTooltip from '../Tooltip/InteractiveTooltip';

interface BadgeTask extends TdHTMLAttributes<HTMLTableCellElement> {
  task: Task;
}
export default function Badges({ task }: BadgeTask) {
  return (
    <div className="flex items-center space-x-1">
      {task.description && (
        <InteractiveTooltip content={<p>{task.description}</p>} top="-top-14" right="-right-3">
          <button className="p-1 border rounded-md ">
            <Description />
          </button>
        </InteractiveTooltip>
      )}
      {/* <button className="p-1 border rounded-md ">
        <AttachFile />
      </button>
      <button className="p-1 border rounded-md ">
        <SubtaskWithCount />
      </button>
      <button className="p-1 border rounded-md ">
        <Checklist />
      </button> */}
    </div>
  );
}
