import React, { useState } from 'react';
import moment, { MomentInput } from 'moment';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CalenderIcon from '../../assets/icons/CalenderIcon';
import DatePicker from '../DatePicker/DatePicker';
import { UseUpdateTaskDateService, useMultipleUpdateTasksDate } from '../../features/task/taskService';
import { Task } from '../../features/task/interface.tasks';
import { setSelectedTaskParentId, setSelectedTaskType } from '../../features/task/taskSlice';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { setPickedDateState } from '../../features/workspace/workspaceSlice';
import { isDateInPast } from './CheckDate';
import { cl } from '../../utils';
import { formatForDatabase } from '../../utils/calendar';
import { Dayjs } from 'dayjs';

interface dateFormatProps {
  date: string | undefined;
  font?: string;
  task?: Task;
  type?: 'start_date' | 'end_date' | 'created_at' | 'updated_at';
  isDueDate?: boolean;
  icon?: React.ReactNode;
}

export default function DateFormat({ date, task, font = 'text-sm', type, isDueDate = false, icon }: dateFormatProps) {
  const dispatch = useAppDispatch();

  const { date_format } = useAppSelector((state) => state.userSetting);
  const { selectedDate } = useAppSelector((state) => state.workspace);
  const { selectedListIds, selectedTaskParentId, selectedTasksArray } = useAppSelector((state) => state.task);

  const [showDataPicker, setShowDatePicker] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [resetDate, setResetDate] = useState<boolean>(false);

  useMultipleUpdateTasksDate({
    ids: selectedTasksArray,
    type: type as string,
    date: resetDate ? '' : formatForDatabase(selectedDate?.date as Dayjs),
    listIds: selectedListIds.length ? selectedListIds : [selectedTaskParentId]
  });

  UseUpdateTaskDateService({
    task_id: taskId as string,
    taskDate: resetDate ? '' : formatForDatabase(selectedDate?.date as Dayjs),
    listIds: selectedListIds.length ? selectedListIds : [selectedTaskParentId],
    type: type as string,
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
      <span className={`text-sm font-bold text-gray-400 ${font}`} style={{ fontSize: font }}>
        {showDataPicker && (
          <DatePicker
            styles="flex justify-center"
            toggleFn={setShowDatePicker}
            setShowDatePickerOption={true}
            handleClose={handleClose}
            anchorEl={anchorEl}
          />
        )}
        {icon ? (
          icon
        ) : (
          <>
            {date ? (
              <div className="flex items-center group/parent">
                <p
                  className="rounded-full flex items-center justify-center bg-alsoit-purple-300 mr-1 h-3 w-3 text-white text-xs pb-0.5 opacity-0 group-hover/parent:opacity-100 cursor-pointer"
                  onClick={(e) => handleResetDate(e)}
                >
                  x
                </p>
                <p className={cl(isDueDate && isDateInPast(date) ? 'text-alsoit-danger' : 'text-alsoit-gray-300')}>
                  {moment(date as MomentInput).format(date_format?.toUpperCase())}
                </p>
              </div>
            ) : (
              <div className="flex items-center cursor-pointer group/parent">
                <CalenderIcon />
              </div>
            )}
          </>
        )}
      </span>
    </div>
  );
}
