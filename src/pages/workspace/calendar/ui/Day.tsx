import { Menu } from '@headlessui/react';
import { Dayjs } from 'dayjs';
import { HTMLAttributes, ReactNode } from 'react';
import { cl } from '../../../../utils';
import { LeaveType } from '../types/calendar';

interface DayProps extends HTMLAttributes<HTMLDivElement> {
  day: Dayjs;
  isCurrentDate: boolean;
  isActiveDate: boolean; // date from this month or from previous / next
  rounded?: {
    bl: boolean;
    br: boolean;
    tl: boolean;
    tr: boolean;
  };
  isDayOff: boolean; // Sat or Sun
  isHighlighted: boolean;
  isSelected: boolean;
  isHoliday: boolean;
  children: ReactNode;
  leaveType?: LeaveType;
}

export default function Day({
  isCurrentDate,
  isActiveDate,
  rounded,
  isDayOff,
  day,
  isHighlighted,
  isSelected,
  isHoliday,
  children,
  leaveType,
  ...props
}: DayProps) {
  return (
    <Menu
      as="div"
      {...props}
      className={cl(
        isActiveDate
          ? cl(
              'bg-white cursor-pointer font-medium text-gray-900',
              isDayOff && 'bg-gray-100 text-gray-500',
              isSelected && 'bg-primary-600 hover:bg-primary-600',
              leaveType && `text-${leaveType.color}-400 bg-${leaveType.color}-100 hover:bg-${leaveType.color}-200`
              // : 'bg-primary-100 hover:bg-primary-200'
            )
          : 'bg-gray-50 text-gray-300',
        'relative py-1.5 w-10 h-10 hover:bg-gray-100 focus:z-10 flex justify-center items-center',

        rounded?.tl && 'rounded-tl-lg',
        rounded?.tr && 'rounded-tr-lg',
        rounded?.bl && 'rounded-bl-lg',
        rounded?.br && 'rounded-br-lg'
      )}
    >
      <Menu.Button
        className={cl(
          'w-7 h-7 flex items-center justify-center rounded-full',
          isCurrentDate && 'bg-primary-500 text-white'
        )}
      >
        {isCurrentDate
          ? day.date()
          : isHoliday
          ? isHighlighted
            ? day.date()
            : isActiveDate
            ? leaveType?.icon
            : day.date()
          : day.date()}
      </Menu.Button>

      {children}
    </Menu>
  );
}
