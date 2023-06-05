import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { Task } from '../../../../features/task/interface.tasks';
import { setTaskIdForPilot } from '../../../../features/task/taskSlice';
import { setActiveItem } from '../../../../features/workspace/workspaceSlice';
import { DEFAULT_LEFT_PADDING } from '../../config';
import { Column } from '../../types/table';
import { Col } from './Col';
import { StickyCol } from './StickyCol';
import { SubTasks } from './SubTasks';

interface RowProps {
  task: Task;
  columns: Column[];
  paddingLeft?: number;
}

export function Row({ task, columns, paddingLeft = 0 }: RowProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const otherColumns = columns.slice(1);
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { hubId } = useParams();

  const [showSubTasks, setShowSubTasks] = useState(false);

  const onClickTask = () => {
    navigate(`/${currentWorkspaceId}/tasks/h/${hubId}/t/${task.id}`, { replace: true });
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
        />

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

      {showSubTasks ? (
        <SubTasks paddingLeft={DEFAULT_LEFT_PADDING + paddingLeft} parentId={task.id} columns={columns} />
      ) : null}
    </>
  );
}
