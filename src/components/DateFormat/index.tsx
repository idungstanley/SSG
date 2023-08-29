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

  const { selectedDate } = useAppSelector((state) => state.workspace);

  const handleClick = () => {
    setShowDatePicker(!showDataPicker);
    setTaskId(task?.id as string);
  };

  const handleClose = () => {
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
    <div className="relative" onClick={() => handleClick()}>
      <span className={`text-sm font-medium text-gray-400 ${font}`} style={{ fontSize: font }}>
        {showDataPicker && (
          <DatePicker
            styles="absolute z-50 mt-1 shadow-2xl bg-white rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none  right-32 flex justify-center"
            toggleFn={setShowDatePicker}
            setShowDatePickerOption={true}
            handleClose={handleClose}
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
