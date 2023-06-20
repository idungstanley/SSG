import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import SubtasksIcon from '../../../../assets/icons/SubtasksIcon';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { Tag, Task } from '../../../../features/task/interface.tasks';
import { setTaskIdForPilot, tagItem } from '../../../../features/task/taskSlice';
import { setActiveItem } from '../../../../features/workspace/workspaceSlice';
import { DEFAULT_LEFT_PADDING } from '../../config';
import { Column } from '../../types/table';
import { AddTask } from '../AddTask/AddTask';
import { Col } from './Col';
import { StickyCol } from './StickyCol';
import { SubTasks } from './SubTasks';
import TaskTag from '../../../Tag/ui/TaskTag';
import { ManageTagsDropdown } from '../../../Tag/ui/ManageTagsDropdown/ui/ManageTagsDropdown';

interface RowProps {
  task: Task;
  columns: Column[];
  paddingLeft?: number;
}

export function Row({ task, columns, paddingLeft = 0 }: RowProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showNewTaskField, setShowNewTaskField] = useState(false);
  const otherColumns = columns.slice(1);
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const [showSubTasks, setShowSubTasks] = useState(false);
  const { hubId, walletId, listId } = useParams();

  const onClickTask = () => {
    hubId
      ? navigate(`/${currentWorkspaceId}/tasks/h/${hubId}/t/${task.id}`, { replace: true })
      : walletId
      ? navigate(`/${currentWorkspaceId}/tasks/w/${walletId}/t/${task.id}`, { replace: true })
      : navigate(`/${currentWorkspaceId}/tasks/l/${listId}/t/${task.id}`, { replace: true });
    dispatch(
      setShowPilotSideOver({
        id: task.id,
        type: 'task',
        show: true,
        title: task.name
      })
    );
    dispatch(setTaskIdForPilot(task.id));
    dispatch(
      setActiveItem({
        activeItemId: task.id,
        activeItemType: 'task',
        activeItemName: task.name
      })
    );
  };

  const onShowAddSubtaskField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowNewTaskField(true);
  };

  const onCloseAddTaskFIeld = () => {
    setShowNewTaskField(false);
    setShowSubTasks(true);
  };

  return (
    <>
      {/* current task */}
      <tr className="contents group">
        <StickyCol
          showSubTasks={showSubTasks}
          setShowSubTasks={setShowSubTasks}
          onClick={onClickTask}
          style={{ zIndex: 3 }}
          task={task}
          paddingLeft={paddingLeft}
          tags={
            'tags' in task ? <TaskTag tags={task.tags as tagItem[]} entity_id={task.id} entity_type="task" /> : null
          }
        >
          {/* actions */}
          <div className="absolute opacity-0 group-hover:opacity-100 top-0 bottom-0 right-0 flex space-x-1 items-center justify-center">
            {/* tags */}

            {'tags' in task ? (
              <ManageTagsDropdown entityId={task.id} tagsArr={task.tags as Tag[]} entityType="task" />
            ) : null}

            {/* show create subtask field */}
            <button className="p-1 border rounded-lg text-gray-400" onClick={onShowAddSubtaskField}>
              <SubtasksIcon className="h-4 w-4" />
            </button>
          </div>
        </StickyCol>

        {otherColumns.map((col) => (
          <Col
            fieldId={col.id}
            field={col.field}
            task={task}
            value={task[col.field]}
            key={col.id}
            style={{ zIndex: 2 }}
          />
        ))}
      </tr>

      {showNewTaskField ? (
        <AddTask
          columns={otherColumns}
          paddingLeft={DEFAULT_LEFT_PADDING + paddingLeft}
          parentId={task.id}
          onClose={onCloseAddTaskFIeld}
        />
      ) : null}

      {showSubTasks ? (
        <SubTasks paddingLeft={DEFAULT_LEFT_PADDING + paddingLeft} parentId={task.id} columns={columns} />
      ) : null}
    </>
  );
}
