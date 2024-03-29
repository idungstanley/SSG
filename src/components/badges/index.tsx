import React, { TdHTMLAttributes } from 'react';
import Description from './Description';
import AttachFile from './AttachFile';
import SubtaskWithCount from './SubtaskWithCount';
import { Task } from '../../features/task/interface.tasks';
import ToolTip from '../Tooltip/Tooltip';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setDefaultSubtaskId, setShowNewTaskField, setShowNewTaskId } from '../../features/task/taskSlice';
import DetailsOnHover from '../Dropdown/DetailsOnHover/DetailsOnHover';
import Checklist from './Checklist';

export interface BadgeTask extends TdHTMLAttributes<HTMLTableCellElement> {
  task: Task;
  setShowSubtasks: (i: boolean) => void;
  showSubtasks: boolean;
}
export default function Badges({ task, setShowSubtasks, showSubtasks }: BadgeTask) {
  const { showNewTaskField, saveSettingOnline } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();

  const onShowAddSubtaskField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, taskId: string) => {
    dispatch(setDefaultSubtaskId(task.list_id));
    if (showNewTaskField || showSubtasks) {
      dispatch(setShowNewTaskId(''));
      dispatch(setShowNewTaskField(false));
      setShowSubtasks(false);
    } else {
      dispatch(setShowNewTaskId(taskId));
      dispatch(setShowNewTaskField(true));
      setShowSubtasks(true);
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-1">
        {task.description && (
          <DetailsOnHover
            content={<p>{task.description}</p>}
            hoverElement={
              <button className="p-1 border rounded-md hover:bg-white ">
                <Description
                  width={saveSettingOnline?.CompactView ? '8px' : '12px'}
                  height={saveSettingOnline?.CompactView ? '8px' : '12px'}
                />
              </button>
            }
            additionalStyles={{ minHeight: '150px', minWidth: '300px' }}
          />
        )}

        {task.has_attachments && (
          <ToolTip title="Attach File">
            <button className="p-1 border rounded-md hover:bg-white">
              <AttachFile
                width={saveSettingOnline?.CompactView ? '8px' : '12px'}
                height={saveSettingOnline?.CompactView ? '8px' : '12px'}
              />
            </button>
          </ToolTip>
        )}

        {task.descendants_count > 0 && (
          <ToolTip title="Subtask">
            <button
              className="relative p-1 border rounded-md hover:bg-white"
              onClick={(e) => onShowAddSubtaskField(e, task.id)}
            >
              <SubtaskWithCount
                width={saveSettingOnline?.CompactView ? '24px' : '24px'}
                height={saveSettingOnline?.CompactView ? '8px' : '12px'}
              />
              <p className="alsoit-text-sm h-2 w-2 absolute left-5 " style={{ fontSize: '9px', bottom: '11.5px' }}>
                {task.descendants_count}
              </p>
            </button>
          </ToolTip>
        )}
        {task.checklist_items_count > 0 && (
          <ToolTip title="Checklist">
            <button className="relative p-1 border rounded-md " onClick={(e) => onShowAddSubtaskField(e, task.id)}>
              <Checklist
                width={saveSettingOnline?.CompactView ? '29px' : '29px'}
                height={saveSettingOnline?.CompactView ? '8px' : '12px'}
              />
              <p className="alsoit-text-sm h-2 w-2 absolute left-5" style={{ fontSize: '9px', bottom: '12.2px' }}>
                {task.checklist_done_items_count}/{task.checklist_items_count}
              </p>
            </button>
          </ToolTip>
        )}
      </div>
    </div>
  );
}
