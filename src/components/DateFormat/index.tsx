import React, { useState } from 'react';
import moment, { MomentInput } from 'moment';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CalenderIcon from '../../assets/icons/CalenderIcon';
import DatePicker from '../DatePicker/DatePicker';
import { UseUpdateTaskDateService } from '../../features/task/taskService';
import { Task } from '../../features/task/interface.tasks';
import { setSelectedTaskParentId, setSelectedTaskType } from '../../features/task/taskSlice';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { setPickedDateState } from '../../features/workspace/workspaceSlice';

interface dateFormatProps {
  date: string | undefined;
  font?: string;
  task?: Task;
}

export default function DateFormat({ date, task, font = 'text-sm' }: dateFormatProps) {
  const dispatch = useAppDispatch();

  const { date_format } = useAppSelector((state) => state.userSetting);
  const { selectedDate } = useAppSelector((state) => state.workspace);
  const { selectedListIds, selectedTaskParentId } = useAppSelector((state) => state.task);

  const [showDataPicker, setShowDatePicker] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [resetDate, setResetDate] = useState<boolean>(false);

  UseUpdateTaskDateService({
    task_id: taskId as string,
    taskDate: resetDate ? '' : (selectedDate?.date.format('YYYY-MM-DD HH:mm:ss') as string),
    listIds: selectedListIds.length ? selectedListIds : [selectedTaskParentId],
    setTaskId,
    setResetDate
  });

  const handleResetDate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setTaskId(task?.id as string);
    dispatch(setSelectedTaskParentId((task?.list_id || task?.parent_id) as string));
    dispatch(setPickedDateState(true));
    setResetDate(true);
    dispatch(setSelectedTaskType(task?.list_id ? EntityType.task : EntityType.subtask));
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setShowDatePicker(!showDataPicker);
    setTaskId(task?.id as string);
    dispatch(setSelectedTaskParentId((task?.parent_id || task?.list_id) as string));
    dispatch(setSelectedTaskType(task?.parent_id ? EntityType.subtask : EntityType.task));
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowDatePicker(!showDataPicker);
    setTaskId(task?.id as string);
  };

  return (
    <div onClick={(e) => handleClick(e)}>
      <span className={`text-sm font-medium text-gray-400 ${font}`} style={{ fontSize: font }}>
        {showDataPicker && (
          <DatePicker
            styles="flex justify-center"
            toggleFn={setShowDatePicker}
            setShowDatePickerOption={true}
            handleClose={handleClose}
            anchorEl={anchorEl}
          />
        )}
        {date ? (
          <div className="flex group/parent items-center">
            <p
              className="rounded-full flex items-center justify-center bg-alsoit-purple-300 mr-1 h-3 w-3 text-white text-xs pb-0.5 opacity-0 group-hover/parent:opacity-100 cursor-pointer"
              onClick={(e) => handleResetDate(e)}
            >
              x
            </p>
            <p>{moment(date as MomentInput).format(date_format?.toUpperCase())}</p>
          </div>
        ) : (
          <div className="absolute">
            <CalenderIcon />
          </div>
        )}
      </span>
    </div>
  );
}
