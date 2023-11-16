import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ListIconComponent from '../ItemsListInSidebar/components/ListIconComponent';
import { cl } from '../../utils';
import { IList } from '../../features/hubs/hubs.interfaces';
import {
  setCurrentSelectedDuplicateArr,
  setDuplicateTaskObj,
  setSelectedTasksArray
} from '../../features/task/taskSlice';
import { useDuplicateTask, useMultipleDuplicateTasks, useMultipleTaskMove } from '../../features/task/taskService';
import DuplicateTaskAdvanceModal from '../../pages/workspace/tasks/component/taskMenu/DuplicateTaskAdvanceModal';
import {
  BROWSE_TASKS_FROM_HOME,
  TASK_DUPLICATE,
  TASK_MOVE
} from '../../pages/workspace/tasks/component/taskMenu/TaskMenu';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import OpenSubtask from '../../assets/icons/OpenSubtask';
import CloseSubtask from '../../assets/icons/CloseSubtask';

interface ListItemProps {
  list: IList;
  paddingLeft: string | number;
  parentId?: string | null;
  option?: string;
}
export interface ListColourProps {
  innerColour?: string;
  outerColour?: string;
}
export default function SearchListItem({ list, paddingLeft, option }: ListItemProps) {
  const dispatch = useAppDispatch();
  const { listId } = useParams();

  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { lightBaseColor, baseColor } = useAppSelector((state) => state.account);
  const { listColour } = useAppSelector((state) => state.list);
  const { duplicateTaskObj, selectedTasksArray } = useAppSelector((state) => state.task);

  const [openList, setOpenList] = useState(false);
  const [showSelectDropdown, setShowSelectDropdown] = useState<null | HTMLSpanElement | HTMLDivElement>(null);

  const { mutate: duplicateTask } = useDuplicateTask();
  const { mutate: multipleDuplicateTasks } = useMultipleDuplicateTasks(list);
  const { mutate: onMultipleTaskMove } = useMultipleTaskMove(list, 'id_only');

  const handleClick = () => {
    setOpenList(!openList);
    if (option === TASK_DUPLICATE) {
      if (selectedTasksArray.length > 1) {
        dispatch(setDuplicateTaskObj({ ...duplicateTaskObj, popDuplicateTaskModal: false }));
        multipleDuplicateTasks({
          ...duplicateTaskObj,
          ids: selectedTasksArray,
          list_id: list.id
        });
      } else {
        duplicateTask({
          ...duplicateTaskObj,
          list_id: list.id
        });
      }
    }

    if (option === TASK_MOVE) {
      onMultipleTaskMove({
        taskIds: selectedTasksArray,
        listId: list.id,
        overType: EntityType.list
      });
    }
  };

  const handleAdvance = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setDuplicateTaskObj({ ...duplicateTaskObj, list_id: list.id }));
    setShowSelectDropdown(e.currentTarget);
  };

  const handleClose = () => {
    dispatch(setCurrentSelectedDuplicateArr([]));
    dispatch(setSelectedTasksArray([]));
    setShowSelectDropdown(null);
  };

  const color: ListColourProps = JSON.parse(list.color as string) as ListColourProps;
  const innerColour = list?.color ? (color.innerColour as string) : (listColour as ListColourProps)?.innerColour;
  const outerColour = list?.color ? (color.outerColour as string) : (listColour as ListColourProps)?.outerColour;
  const activeShape = list.shape;

  return (
    <>
      <section
        className={cl(
          'relative flex items-center justify-between h-8 group',
          list.id === activeItemId ? 'font-medium' : 'hover:bg-gray-100'
        )}
        style={{
          paddingLeft: `${paddingLeft}px`,
          height: '30px',
          backgroundColor: `${list.id === listId ? lightBaseColor : ''}`,
          opacity: 100
        }}
      >
        {list.id === listId && (
          <span className="absolute top-0 bottom-0 left-0 rounded-r-lg w-0.5" style={{ backgroundColor: baseColor }} />
        )}
        <div className="flex items-center space-x-1 overflow-hidden capitalize cursor-pointer" onClick={handleClick}>
          {option === BROWSE_TASKS_FROM_HOME && (
            <div className="flex items-center cursor-pointer space-x-3">
              <p>{!openList ? <OpenSubtask /> : <CloseSubtask />}</p>
            </div>
          )}
          <div>
            <ListIconComponent
              shape={activeShape ? activeShape : 'solid-circle'}
              innerColour={innerColour}
              outterColour={outerColour}
            />
          </div>
          <div
            style={{
              fontSize: '13px',
              lineHeight: '15.56px',
              verticalAlign: 'baseline',
              letterSpacing: '0.28px',
              minWidth: '300px',
              color: listId === list.id ? (baseColor as string) : undefined
            }}
            className="flex items-center justify-between pl-4 capitalize truncate cursor-pointer"
          >
            <p>{list.name}</p>
            {option === TASK_DUPLICATE && (
              <p
                className="border-b-2 border-dotted border-black hover:text-alsoit-purple-300"
                onClick={(e) => handleAdvance(e)}
              >
                Advanced
              </p>
            )}
          </div>
        </div>

        <DuplicateTaskAdvanceModal handleClose={handleClose} anchorEl={showSelectDropdown} />
      </section>
    </>
  );
}
