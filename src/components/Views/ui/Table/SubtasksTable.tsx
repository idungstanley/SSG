import { useState, useEffect } from 'react';
import { ITaskFullList, Task } from '../../../../features/task/interface.tasks';
import { generateGrid } from '../../lib';
import { Head } from './Head/Head';
import { Row } from './Row';
import { useSubTasks } from '../../../../features/task/taskService';
import { Column } from '../../types/table';
import { useAppSelector } from '../../../../app/hooks';
import { IField } from '../../../../features/list/list.interfaces';
import { DEFAULT_LEFT_PADDING } from '../../config';
import { Label } from '../List/Label';
import { IListColor } from '../List/List';
import LightenColor from '../List/lightenColor/LightenColor';
import { Hub } from '../../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { findCurrentHub } from '../../../../managers/Hub';

interface ISubtasksTableProps {
  data: Task;
  columns: Column[];
  customFields?: IField[];
  paddingLeft?: number;
}

export function SubtasksTable({
  data,
  columns,
  customFields,
  paddingLeft = DEFAULT_LEFT_PADDING
}: ISubtasksTableProps) {
  const { statusId } = useAppSelector((state) => state.task);
  const { parentHubExt, hub } = useAppSelector((state) => state.hub);

  const [showNewTaskField, setShowNewTaskField] = useState(false);
  const [collapseTasks, setCollapseTasks] = useState(false);
  const [collapseTable, setCollapseTable] = useState(false);
  const [tableHeight, setTableHeight] = useState<string | number>('auto');
  const [parentHub, setParentHub] = useState<Hub>();

  const { data: tasks } = useSubTasks(data.id);
  const taskLength = tasks?.length;

  useEffect(() => {
    if (parentHubExt.id) {
      setParentHub(findCurrentHub(parentHubExt.id, hub));
    }
  }, [parentHubExt]);

  const ListColor: IListColor = data.list?.color
    ? JSON.parse(data.list?.color as string)
    : {
        outerColour: '#A854F7'
      };

  const handleToggleNewTask = () => {
    setShowNewTaskField(true);
  };

  return tasks && tasks.length ? (
    <>
      <div
        className="border-t-4 border-l-4 border-purple-500 rounded-3xl bg-purple-50 ml-10 mt-2"
        // ref={setNodeRef}
        style={{
          borderColor: ListColor?.outerColour,
          backgroundColor: LightenColor(ListColor?.outerColour, 0.95),
          overflow: collapseTable ? 'hidden' : 'unset'
        }}
      >
        <Label
          listName={data.name}
          hubName={parentHub?.name}
          tasks={tasks}
          ListColor={ListColor}
          showTable={collapseTable}
          onClickChevron={() => setCollapseTable((prev) => !prev)}
          isSplitSubtasks={true}
        />
        {!collapseTable ? (
          <div className="table-container">
            <table
              // onScroll={onScroll}
              style={
                !collapseTasks
                  ? {
                      display: 'grid',
                      gridTemplateColumns: generateGrid(columns.length, true)
                    }
                  : undefined
              }
              className="w-full"
              // ref={tableElement}
            >
              <Head
                collapseTasks={collapseTasks}
                taskLength={taskLength || 0}
                onToggleCollapseTasks={() => setCollapseTasks((prev) => !prev)}
                label={tasks[0].status.name}
                headerStatusColor={tasks[0].status.color as string}
                columns={columns}
                listName={data.list?.name}
                // mouseDown={onMouseDown}
                mouseDown={() => null}
                tableHeight={tableHeight}
                listId={tasks[0].list_id}
                groupedTask={tasks}
                isSplitSubtask={true}
              />

              {/* rows */}
              {!collapseTasks ? (
                <tbody className="contents">
                  {tasks.map((task, index) =>
                    'tags' in task ? (
                      <Row
                        columns={columns}
                        task={task as ITaskFullList}
                        key={task.id}
                        taskIndex={index}
                        isListParent={true}
                        paddingLeft={paddingLeft}
                        parentId={task.id}
                        task_status={statusId}
                        // handleClose={handleClose}
                        customFields={customFields}
                        isSplitSubtask={true}
                      />
                    ) : null
                  )}
                </tbody>
              ) : null}

              {/* add subtask button */}
              {!showNewTaskField ? (
                <tbody className="h-5">
                  <tr
                    onClick={() => handleToggleNewTask()}
                    className="absolute left-0 p-1.5 pl-20 text-left w-fit text-xs"
                  >
                    <td className="font-semibold cursor-pointer alsoit-gray-300">+ New Task</td>
                  </tr>
                </tbody>
              ) : null}
            </table>
          </div>
        ) : null}
      </div>

      {tasks.map((item) => (
        <SubtasksTable
          key={item.id}
          data={item}
          columns={columns}
          paddingLeft={paddingLeft + DEFAULT_LEFT_PADDING}
          customFields={customFields}
        />
      ))}
    </>
  ) : null;
}
