import { useState, useEffect, useMemo } from 'react';
import { ITaskFullList, Task } from '../../../../features/task/interface.tasks';
import { createHeaders, generateGrid } from '../../lib';
import { Head } from './Head/Head';
import { MAX_SUBTASKS_LEVEL, Row } from './Row';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { DEFAULT_LEFT_PADDING } from '../../config';
import { Label } from '../List/Label';
import { IListColor } from '../List/List';
import LightenColor from '../List/lightenColor/LightenColor';
import { ScrollableHorizontalListsContainer } from '../../../ScrollableContainer/ScrollableHorizontalListsContainer';
import { useScroll } from '../../../../hooks/useScroll';
import {
  THREE_SUBTASKS_LEVELS,
  TWO_SUBTASKS_LEVELS,
  setShowNewTaskField,
  setShowNewTaskId,
  setUpdateCords
} from '../../../../features/task/taskSlice';
import { filterSubtasks } from '../../../../utils/filterSubtasks';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';

interface ISubtasksTableProps {
  task: Task;
  subtasksData: ITaskFullList[];
  heads: listColumnProps[];
  listId: string;
  paddingLeft?: number;
  level: number;
}

export function SubtasksTable({ task, subtasksData, heads, listId, paddingLeft = 0, level }: ISubtasksTableProps) {
  const dispatch = useAppDispatch();

  const { statusId, subtasks, subtasksfilters, splitSubTaskLevels } = useAppSelector((state) => state.task);

  const [filteredSubtasks, setFilteredSubTasks] = useState<ITaskFullList[]>([]);
  const [collapseTasks, setCollapseTasks] = useState(false);
  const [collapseTable, setCollapseTable] = useState(false);
  const [isShowNewLevel, setShowNewLevel] = useState<boolean>(false);

  const columns = createHeaders(heads).filter((i) => !i.hidden);

  const taskLength = subtasksData?.length;

  useEffect(() => {
    if (Object.keys(subtasks).length && task.id) {
      setFilteredSubTasks(filterSubtasks(subtasks[task.id] as ITaskFullList[], subtasksfilters));
    }
  }, [subtasks, subtasksfilters]);

  const ListColor: IListColor = task.list?.color
    ? JSON.parse(task.list?.color as string)
    : {
        outerColour: '#A854F7'
      };

  const onShowAddSubtaskField = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, taskId: string) => {
    e.stopPropagation();
    dispatch(setShowNewTaskId(taskId));
    dispatch(setShowNewTaskField(true));
  };

  const onScroll = useScroll(() => dispatch(setUpdateCords()));

  useEffect(() => {
    const isSecondLevel = splitSubTaskLevels.includes(TWO_SUBTASKS_LEVELS);
    const isThirdLevel = splitSubTaskLevels.includes(THREE_SUBTASKS_LEVELS);
    if (
      splitSubTaskLevels.length &&
      (((isSecondLevel || isThirdLevel) && level === 1) || (isThirdLevel && level === 2))
    ) {
      setShowNewLevel(true);
    } else {
      setShowNewLevel(false);
    }
  }, [splitSubTaskLevels]);

  const isSecondLevel = useMemo(() => splitSubTaskLevels.includes(TWO_SUBTASKS_LEVELS), [splitSubTaskLevels]);
  const isThirdLevel = useMemo(() => splitSubTaskLevels.includes(THREE_SUBTASKS_LEVELS), [splitSubTaskLevels]);

  return subtasksData && subtasksData.length ? (
    <>
      {(isSecondLevel && level === 1) || (isThirdLevel && level === 2) ? (
        <div
          className="border-t-4 border-l-4 border-purple-500 rounded-3xl bg-purple-50 ml-10 mt-2"
          // ref={setNodeRef}
          style={{
            borderColor: ListColor?.outerColour as string,
            backgroundColor: LightenColor(ListColor?.outerColour as string, 0.95),
            overflow: collapseTable ? 'hidden' : 'unset'
          }}
        >
          <Label
            listName={task.name}
            hubName={task.parentName || task.list?.name}
            tasks={subtasksData}
            ListColor={ListColor}
            showTable={collapseTable}
            onClickChevron={() => setCollapseTable((prev) => !prev)}
            isSplitSubtasks={true}
            parentId={task.id}
          />
          <ScrollableHorizontalListsContainer onScroll={onScroll} ListColor={ListColor}>
            {!collapseTable ? (
              <div className="table-container">
                <table
                  onScroll={onScroll}
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
                    label={subtasksData[0].status.name}
                    headerStatusColor={subtasksData[0].status.color as string}
                    columns={columns}
                    listName={task.list?.name}
                    tableHeight="auto"
                    listId={subtasksData[0].list_id}
                    groupedTask={subtasksData}
                    isSplitSubtask={true}
                    parentId={task.id}
                  />

                  {/* rows */}
                  {!collapseTasks ? (
                    <tbody className="contents">
                      {filteredSubtasks?.length ? (
                        <>
                          {filteredSubtasks.map((task, index) =>
                            'tags' in task ? (
                              <Row
                                key={task.id}
                                columns={columns}
                                task={task as ITaskFullList}
                                taskIndex={index}
                                listId={listId}
                                isListParent={true}
                                paddingLeft={paddingLeft}
                                parentId={task.id}
                                taskStatusId={statusId}
                                // handleClose={handleClose}
                                isSplitSubtask={true}
                                level={level}
                              />
                            ) : null
                          )}
                        </>
                      ) : (
                        <div className="flex justify-center">No results</div>
                      )}
                    </tbody>
                  ) : null}

                  {/* add subtask button */}
                  {level <= MAX_SUBTASKS_LEVEL ? (
                    <tbody className="h-5">
                      <tr
                        onClick={(e) => onShowAddSubtaskField(e, subtasksData[subtasksData.length - 1].id)}
                        className="absolute left-0 p-1.5 pl-5 text-left w-fit text-xs"
                      >
                        <td className="font-semibold cursor-pointer alsoit-gray-300">+ New Subtask</td>
                      </tr>
                    </tbody>
                  ) : null}
                </table>
              </div>
            ) : null}
          </ScrollableHorizontalListsContainer>
        </div>
      ) : null}

      {isShowNewLevel
        ? subtasksData.map((item) => (
            <SubtasksTable
              key={item.id}
              task={item}
              subtasksData={subtasks[item.id]}
              heads={heads}
              listId={listId}
              paddingLeft={paddingLeft + DEFAULT_LEFT_PADDING}
              level={level + 1}
            />
          ))
        : null}
    </>
  ) : null;
}
