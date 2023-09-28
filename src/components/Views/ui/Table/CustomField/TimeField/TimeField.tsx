import React, { useState } from 'react';
import { createDynamicTimeComponent } from '../../../../../../utils/calendar';
import { useAppSelector } from '../../../../../../app/hooks';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import TimeDropdown from '../TextField/TimeDropDown';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { handleConversion } from './Convert/Index';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

interface timeFieldProp {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
}

function TimeField({ taskCustomFields, taskId, fieldId }: timeFieldProp) {
  const { timezone, time_format } = useAppSelector((state) => state.userSetting);
  const userFormat = time_format === '0' ? 'h:mm A' : 'HH:mm';
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeItem, setActiveItem] = useState<string | undefined>(
    taskCustomFields?.values[0].value ? handleConversion(userFormat, taskCustomFields?.values[0].value) : undefined
  );
  const { timeInterval } = useAppSelector((state) => state.calendar);

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

  return (
    <div>
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
