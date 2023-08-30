import React, { useEffect, useState } from 'react';
import moment, { MomentInput } from 'moment';
import { useAppSelector } from '../../app/hooks';
import CalenderIcon from '../../assets/icons/CalenderIcon';
import DatePicker from '../DatePicker/DatePicker';
import { UseUpdateTaskDateService } from '../../features/task/taskService';
import { Task } from '../../features/task/interface.tasks';

interface dateFormatProps {
  date: string | undefined;
  font?: string;
  task?: Task;
}

export default function DateFormat({ date, task, font = 'text-sm' }: dateFormatProps) {
  const [showDataPicker, setShowDatePicker] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [pickedDateState, setPickedDateState] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { selectedDate } = useAppSelector((state) => state.workspace);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setShowDatePicker(!showDataPicker);
    setTaskId(task?.id as string);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowDatePicker(!showDataPicker);
    setTaskId(task?.id as string);
  };

  const { isSuccess } = UseUpdateTaskDateService({
    task_id: taskId as string,
    taskDate: selectedDate?.date.format('YYYY-MM-DD HH:mm:ss') as string,
    pickedDateState
  });

  const { date_format } = useAppSelector((state) => state.userSetting);
  return (
    <div className="" onClick={(e) => handleClick(e)}>
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
          moment(date as MomentInput).format(date_format?.toUpperCase())
        ) : (
          <div className="absolute">
            <CalenderIcon />
          </div>
        )}
      </span>
    </div>
  );
}
