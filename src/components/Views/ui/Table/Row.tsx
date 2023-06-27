import { useState } from 'react';
import SubtasksIcon from '../../../../assets/icons/SubtasksIcon';
import { IStatus, ITaskFullList, Tag, Task } from '../../../../features/task/interface.tasks';
import { DEFAULT_LEFT_PADDING } from '../../config';
import { Column } from '../../types/table';
import { AddTask } from '../AddTask/AddTask';
import { Col } from './Col';
import { StickyCol } from './StickyCol';
import { SubTasks } from './SubTasks';
import { useDraggable } from '@dnd-kit/core';
import { MdDragIndicator } from 'react-icons/md';
import { ManageTagsDropdown } from '../../../Tag/ui/ManageTagsDropdown/ui/ManageTagsDropdown';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { setTaskIdForPilot } from '../../../../features/task/taskSlice';
import { setActiveItem } from '../../../../features/workspace/workspaceSlice';
import { Tags } from '../../../Tag';
import { AddSubTask } from '../AddTask/AddSubTask';

interface RowProps {
  task: Task;
  columns: Column[];
  paddingLeft?: number;
  parentId?: string;
  isListParent: boolean;
  task_status?: string;
  handleClose?: VoidFunction;
}

export function Row({ task, columns, paddingLeft = 0, parentId, task_status, isListParent, handleClose }: RowProps) {
  const [showNewTaskField, setShowNewTaskField] = useState(false);
  const otherColumns = columns.slice(1);
  const [showSubTasks, setShowSubTasks] = useState(false);

  const newSubTask: ITaskFullList = {
    archived_at: null,
    assignees: undefined,
    avatar_path: '',
    created_at: '',
    custom_fields: [],
    deleted_at: null,
    description: null,
    directory_items: [],
    end_date: null,
    group_assignees: [],
    has_descendants: false,
    id: '0',
    list: {
      id: '',
      name: '',
      parents: { hubs: [], wallets: [], lists: [] }
    },
    list_id: '',
    name: 'Add Subtask',
    parent_id: null,
    priority: 'low',
    start_date: null,
    status: {
      color: '',
      created_at: '',
      id: '',
      model_id: '',
      model_type: '',
      name: '',
      position: '',
      type: '',
      updated_at: ''
    },
    tags: [],
    updated_at: ''
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { hubId, walletId, listId } = useParams();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const onShowAddSubtaskField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowNewTaskField(!showNewTaskField);
  };

  const onCloseAddTaskFIeld = () => {
    setShowNewTaskField(false);
    // setShowSubTasks(true);
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id
  });

  // hide element if is currently grabbing
  const style = {
    opacity: transform ? 0 : 100
  };

  const onClickTask = () => {
    if (task.id !== '0') {
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
    }
  };

  return (
    <>
      {/* current task */}
      <tr style={style} className="contents group">
        <StickyCol
          showSubTasks={showSubTasks}
          setShowSubTasks={setShowSubTasks}
          onClick={onClickTask}
          style={{ zIndex: 3 }}
          isListParent={isListParent}
          task={task}
          parentId={parentId as string}
          task_status={task_status as string}
          onClose={handleClose as VoidFunction}
          paddingLeft={paddingLeft}
          tags={'tags' in task ? <Tags tags={task.tags} taskId={task.id} /> : null}
          dragElement={
            <span ref={setNodeRef} {...listeners} {...attributes}>
              <MdDragIndicator
                className="text-lg text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100"
                style={{ marginLeft: '-6px', marginRight: '-2.5px' }}
              />
            </span>
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
            value={task[col.field as keyof Task]}
            key={col.id}
            style={{ zIndex: 2 }}
          />
        ))}
      </tr>

      {showNewTaskField ? (
        <AddSubTask
          task={newSubTask}
          columns={columns}
          paddingLeft={0}
          isListParent={false}
          parentId={task.id}
          task_status={task.status.id}
          handleClose={onCloseAddTaskFIeld}
        />
      ) : null}

      {showSubTasks ? (
        <SubTasks paddingLeft={DEFAULT_LEFT_PADDING + paddingLeft} parentId={task.id} columns={columns} />
      ) : null}
    </>
  );
}
