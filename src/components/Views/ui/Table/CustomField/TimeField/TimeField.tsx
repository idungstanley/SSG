import React, { useEffect, useRef, useState } from 'react';
import { createDynamicTimeComponent } from '../../../../../../utils/calendar';
import { useAppSelector } from '../../../../../../app/hooks';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import TimeDropdown from './TimeDropDown';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { handleConversion } from './Convert/Index';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Task } from '../../../../../../features/task/interface.tasks';

dayjs.extend(customParseFormat);

interface timeFieldProp {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  activeColumn?: boolean[];
  task?: Task;
}

function TimeField({ taskCustomFields, taskId, fieldId, activeColumn, task }: timeFieldProp) {
  const { timezone, time_format } = useAppSelector((state) => state.userSetting);
  const userFormat = time_format === '0' ? 'h:mm A' : 'HH:mm';
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeItem, setActiveItem] = useState<string | undefined>(
    taskCustomFields?.values[0].value ? handleConversion(userFormat, taskCustomFields?.values[0].value) : undefined
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { timeInterval } = useAppSelector((state) => state.calendar);
  const { KeyBoardSelectedTaskData, taskColumnIndex } = useAppSelector((state) => state.task);

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOption = (option: string) => {
    const convertedTime = dayjs(option.toLowerCase(), 'h:mma').format('HH:mm');
    setActiveItem(handleConversion(userFormat, convertedTime));
    onUpdate({
      taskId,
      value: [{ value: convertedTime }],
      fieldId
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setAnchorEl(containerRef.current);
    }
  };

  useEffect(() => {
    if (containerRef.current && activeColumn && taskColumnIndex) {
      if (task?.id === KeyBoardSelectedTaskData?.id && activeColumn[taskColumnIndex]) {
        containerRef.current.focus();
      }
      containerRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => containerRef.current?.removeEventListener('keydown', handleKeyDown);
  }, [task, KeyBoardSelectedTaskData, taskColumnIndex, activeColumn]);

  return (
    <div ref={containerRef} tabIndex={0} className="w-full h-full flex items-center justify-center focus:ring-0">
      <h1 onClick={(event) => setAnchorEl(event.currentTarget)} className="cursor-pointer">
        {activeItem ? activeItem : 'Set Time'}
      </h1>
      <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
        <TimeDropdown
          handleClick={handleOption}
          options={createDynamicTimeComponent(timeInterval, timezone)}
          activeValue={activeItem}
        />
      </AlsoitMenuDropdown>
    </div>
  );
}

export default TimeField;
