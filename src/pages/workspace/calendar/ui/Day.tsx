import { Dayjs } from 'dayjs';
import { ButtonHTMLAttributes } from 'react';
import { cl } from '../../../../utils';

interface DayProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  ...props
}: DayProps) {
  return (
    <button
      {...props}
      type="button"
      className={cl(
        isActiveDate
          ? cl(
              'bg-white cursor-pointer font-medium text-gray-900',
              isDayOff && 'bg-gray-100 text-red-500',
              isSelected && 'bg-primary-600 hover:bg-primary-600',
              isHoliday && 'bg-primary-100 hover:bg-primary-100'
            )
          : 'bg-gray-50 text-gray-400',
        'py-1.5 hover:bg-gray-100 focus:z-10 flex justify-center items-center ',

        rounded?.tl && 'rounded-tl-lg',
        rounded?.tr && 'rounded-tr-lg',
        rounded?.bl && 'rounded-bl-lg',
        rounded?.br && 'rounded-br-lg'
      )}
    >
      <time
        dateTime={String(day.format())}
        className={cl(
          isCurrentDate && 'bg-primary-500 text-white',
          'w-7 h-7 flex items-center justify-center rounded-full'
        )}
      >
        {isCurrentDate ? day.date() : isHoliday ? (isHighlighted ? day.date() : '+') : day.date()}
      </time>
    </button>
  );
}
