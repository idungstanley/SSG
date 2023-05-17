import { Menu } from '@headlessui/react';
import { Dayjs } from 'dayjs';
import { HTMLAttributes, ReactNode } from 'react';
import { LeaveType } from '../../../../features/calendar/types/leaveTypes';
import { cl } from '../../../../utils';
import { SelectIcon } from '../LeaveTypesTable/SelectIcon';

interface DayProps extends HTMLAttributes<HTMLDivElement> {
  day: Dayjs;
  isCurrentDay: boolean;
  isSelected: boolean;
  isDayOff: boolean;
  leaveType?: LeaveType;
  children: ReactNode;
  isHighlighted: boolean;
}

export function Day({
  day,
  isCurrentDay,
  isHighlighted,
  isSelected,
  children,
  isDayOff,
  leaveType,
  ...props
}: DayProps) {
  const date = day.date();
  const shouldDisplayIcon = isDayOff && leaveType && !isHighlighted;
  const shouldDisplayDate = isCurrentDay || !shouldDisplayIcon;

  return (
    <Menu
      as="div"
      {...props}
      className={cl(
        'bg-white cursor-pointer font-medium text-gray-900',
        isSelected && 'bg-primary-500 hover:bg-primary-500',
        leaveType && `text-${leaveType.color}-400 bg-${leaveType.color}-100 hover:bg-${leaveType.color}-200`,
        'relative py-1.5 w-10 h-10 hover:bg-gray-100 focus:z-10 flex justify-center items-center'
      )}
    >
      <Menu.Button
        className={cl(
          'w-7 h-7 flex items-center justify-center rounded-full',
          isCurrentDay && 'bg-primary-500 text-white'
        )}
      >
        {shouldDisplayDate ? date : <SelectIcon icon={leaveType?.icon} color={leaveType.color} noSelect />}
      </Menu.Button>

      {children}
    </Menu>
  );
}
