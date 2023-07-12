import moment from 'moment-timezone';
import { useAppSelector } from '../../../../app/hooks';
import DateStringFix from '../../../../utils/ManualTimeFix';
import dayjs from 'dayjs';

interface ManualTimeAddProps {
  start_date: dayjs.Dayjs;
  end_date: dayjs.Dayjs;
  start_time?: string;
  end_time?: string;
}

export function ManualTimeAddDialog({ start_date, end_date, start_time, end_time }: ManualTimeAddProps) {
  const { timezone, date_format } = useAppSelector((state) => state.userSetting);
  const startDateObject = moment(
    DateStringFix({
      timeStamp: start_date.format(date_format?.toUpperCase()),
      timeString: start_time,
      timeZone: timezone
    })
  );

  const endDateObject = moment(
    DateStringFix({ timeStamp: end_date.format(date_format?.toUpperCase()), timeString: end_time, timeZone: timezone })
  );
  const calculatedTime = moment.duration(endDateObject.diff(startDateObject));
  const duration = () => {
    if (calculatedTime.hours() > 0) {
      return (
        <span>{`${calculatedTime.hours()} hour(s), ${calculatedTime.minutes()} minute(s), ${calculatedTime.seconds()} seconds`}</span>
      );
    } else {
      return (
        <span>{`${calculatedTime.hours()} hour(s), ${calculatedTime.minutes()} minute(s), ${calculatedTime.seconds()} seconds`}</span>
      );
    }
  };
  return (
    <div className="w-10/12 flex flex-col mx-auto space-y-2 rounded-md mt-2 mb-1 p-2 bg-white">
      <p className="text-alsoit-text-lg font-semibold text-center py-2">Add {duration()}?</p>
      <div className="flex space-x-2 justify-end">
        <button className="p-1 bg-alsoit-gray-200 text-alsoit-gray-50 rounded font-semibold hover:bg-alsoit-gray-75">
          Cancel
        </button>
        <button className="p-1 bg-alsoit-purple-300 text-alsoit-gray-50 rounded font-semibold hover:bg-alsoit-purple-50 hover:text-alsoit-gray-300">
          Confirm
        </button>
      </div>
    </div>
  );
}
