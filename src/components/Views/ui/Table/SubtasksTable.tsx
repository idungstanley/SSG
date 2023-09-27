import { useState, useEffect } from 'react';
import { ITaskFullList, Task } from '../../../../features/task/interface.tasks';
import { createHeaders, generateGrid } from '../../lib';
import { Head } from './Head/Head';
import { MAX_SUBTASKS_LEVEL, Row } from './Row';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { IField } from '../../../../features/list/list.interfaces';
import { DEFAULT_LEFT_PADDING } from '../../config';
import { Label } from '../List/Label';
import { IListColor } from '../List/List';
import LightenColor from '../List/lightenColor/LightenColor';
import { Hub } from '../../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { findCurrentHub } from '../../../../managers/Hub';
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
  data: Task;
  subtasksData: ITaskFullList[];
  heads: listColumnProps[];
  customFields?: IField[];
  listId: string;
  paddingLeft?: number;
  level: number;
}

export function SubtasksTable({
  data,
  subtasksData,
  heads,
  customFields,
  listId,
  paddingLeft = 0,
  level
}: ISubtasksTableProps) {
  const dispatch = useAppDispatch();

  const { statusId, subtasks, subtasksfilters, splitSubTaskLevels } = useAppSelector((state) => state.task);
  const { parentHubExt, hub } = useAppSelector((state) => state.hub);

  const [filteredSubtasks, setFilteredSubTasks] = useState<ITaskFullList[]>([]);
  const [collapseTasks, setCollapseTasks] = useState(false);
  const [collapseTable, setCollapseTable] = useState(false);
  const [parentHub, setParentHub] = useState<Hub>();

  const columns = createHeaders(heads).filter((i) => !i.hidden);

  const taskLength = subtasksData?.length;

  useEffect(() => {
    if (Object.keys(subtasks).length && data.id) {
      setFilteredSubTasks(filterSubtasks(subtasks[data.id] as ITaskFullList[], subtasksfilters));
    }
  }, [subtasks, subtasksfilters]);

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

  const onShowAddSubtaskField = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, taskId: string) => {
    e.stopPropagation();
    dispatch(setShowNewTaskId(taskId));
    dispatch(setShowNewTaskField(true));
  };

  const onScroll = useScroll(() => dispatch(setUpdateCords()));

  const isShowNewLevel = () => {
    if (splitSubTaskLevels === TWO_SUBTASKS_LEVELS && level === 1) {
      return false;
    } else if (splitSubTaskLevels === THREE_SUBTASKS_LEVELS && level === 2) {
      return false;
    }
    return true;
  };

  return subtasksData && subtasksData.length ? (
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
          hubName={data.parentName || parentHub?.name}
          tasks={subtasksData}
          ListColor={ListColor}
          showTable={collapseTable}
          onClickChevron={() => setCollapseTable((prev) => !prev)}
          isSplitSubtasks={true}
          parentId={data.id}
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
                  listName={data.list?.name}
                  tableHeight="auto"
                  listId={subtasksData[0].list_id}
                  groupedTask={subtasksData}
                  isSplitSubtask={true}
                  parentId={data.id}
                />

                {/* rows */}
                {!collapseTasks ? (
                  <tbody className="contents">
                    {filteredSubtasks?.length ? (
                      <>
                        {filteredSubtasks.map((task, index) =>
                          'tags' in task ? (
                            <Row
                              columns={columns}
                              task={task as ITaskFullList}
                              key={task.id}
                              taskIndex={index}
                              listId={listId}
                              isListParent={true}
                              paddingLeft={paddingLeft}
                              parentId={task.id}
                              task_status={statusId}
                              // handleClose={handleClose}
                              customFields={customFields}
                              isSplitSubtask={true}
                              level={level}
                              isBlockToOpenSubtasks={isShowNewLevel()}
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

      {isShowNewLevel()
        ? subtasksData.map((item) => (
            <SubtasksTable
              key={item.id}
              data={item}
              subtasksData={subtasks[item.id]}
              heads={heads}
              listId={listId}
              paddingLeft={paddingLeft + DEFAULT_LEFT_PADDING}
              customFields={customFields}
              level={level + 1}
            />
          ))
        : null}
    </>
  ) : null;
}
