import moment from 'moment-timezone';
import { useAppSelector } from '../../../../app/hooks';
import DateStringFix from '../../../../utils/ManualTimeFix';
import CurrencyIcon from '../../../../assets/icons/CurrencyIcon';
import TagIcon from '../../../../assets/icons/DotCircleTagIcon';
import { ChangeEvent, useState } from 'react';
import { createManualTimeEntry } from '../../../../features/task/taskService';

// interface ManualTimeAddProps {
//   start_date: dayjs.Dayjs;
//   end_date: dayjs.Dayjs;
//   start_time?: string;
//   end_time?: string;
// }

export default function ManualTimeAddDialog() {
  const { activeItemId: id, activeItemType: type } = useAppSelector((state) => state.workspace);
  const { timezone, date_format } = useAppSelector((state) => state.userSetting);
  const { mutate } = createManualTimeEntry();
  const [data, setData] = useState<{ [key: string]: string }>({
    start_time: '9:00 AM',
    end_time: '9:00 PM'
  });

  const timeStamp = (time: string) =>
    moment(
      DateStringFix({
        timeStamp: moment().format(date_format?.toUpperCase()),
        timeString: time,
        timeZone: timezone
      })
    ).format('YYYY-MM-DD HH:mm:ss');

  const [interactions, setInteractions] = useState<{ tag: boolean; currency: boolean }>({
    tag: false,
    currency: false
  });
  const handleSubmit = () => {
    mutate({
      end_date: timeStamp(data.end_time),
      start_date: timeStamp(data.start_time),
      id,
      type
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section id="body" className="px-3 py-2 text-white bg-indigo-300 shadow-2xl rounded-b-md mt-6">
        <div className="flex flex-col space-y-2 px-1">
          <div className="flex space-x-2 justify-center my-4">
            <input
              type="text"
              name="start_time"
              className="bg-alsoit-gray-50 text-alsoit-gray-75 font-semibold border-none outline-none rounded"
              value={data.start_time}
              onChange={(e) => handleChange(e)}
            />
            <span className="flex items-center font-bold text-alsoit-text-lg">-</span>
            <input
              type="text"
              name="end_time"
              className="bg-alsoit-gray-50 text-alsoit-gray-75 font-semibold border-none outline-none rounded"
              value={data.end_time}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex justify-between w-full px-1">
            <div className="flex space-x-1">
              <span className="text-alsoit-text-lg text-alsoit-gray-200 font-semibold">When: </span>
              <span className="font-semibold text-alsoit-gray-200 text-alsoit-text-lg">Today</span>
            </div>
            <div className="flex space-x-2 justify-end">
              <div
                className="cursor-pointer"
                onMouseEnter={() =>
                  setInteractions((prev) => ({
                    ...prev,
                    tag: true
                  }))
                }
                onMouseLeave={() =>
                  setInteractions((prev) => ({
                    ...prev,
                    tag: false
                  }))
                }
              >
                <TagIcon dimensions={{ height: 35, width: 40 }} active={interactions.tag} />
              </div>
              <div
                className="cursor-pointer"
                onMouseEnter={() =>
                  setInteractions((prev) => ({
                    ...prev,
                    currency: true
                  }))
                }
                onMouseLeave={() =>
                  setInteractions((prev) => ({
                    ...prev,
                    currency: false
                  }))
                }
              >
                <CurrencyIcon dimensions={{ height: 35, width: 40 }} active={interactions.currency} />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center w-full">
            <div className="flex justify-end space-x-1 items-center">
              <button className="bg-alsoit-gray-200 hover:bg-alsoit-text-active text-white p-1 rounded-lg font-bold">
                Cancel
              </button>
              <button
                className="bg-alsoit-purple-300 hover:bg-purple-600 text-white p-1 rounded-lg font-bold"
                onClick={() => handleSubmit()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// export function ManualTimeAddDialog({ start_date, end_date, start_time, end_time }: ManualTimeAddProps) {
//   const { timezone, date_format } = useAppSelector((state) => state.userSetting);
//   const startDateObject = moment(
//     DateStringFix({
//       timeStamp: start_date.format(date_format?.toUpperCase()),
//       timeString: start_time,
//       timeZone: timezone
//     })
//   );

//   const endDateObject = moment(
//     DateStringFix({ timeStamp: end_date.format(date_format?.toUpperCase()), timeString: end_time, timeZone: timezone })
//   );
//   const calculatedTime = moment.duration(endDateObject.diff(startDateObject));
//   const duration = () => {
//     if (calculatedTime.hours() > 0) {
//       return (
//         <span>{`${calculatedTime.hours()} hour(s), ${calculatedTime.minutes()} minute(s), ${calculatedTime.seconds()} seconds`}</span>
//       );
//     } else {
//       return (
//         <span>{`${calculatedTime.hours()} hour(s), ${calculatedTime.minutes()} minute(s), ${calculatedTime.seconds()} seconds`}</span>
//       );
//     }
//   };
//   return (
//     <div className="w-10/12 flex flex-col mx-auto space-y-2 rounded-md mt-2 mb-1 p-2 bg-white">
//       <p className="text-alsoit-text-lg font-semibold text-center py-2">Add {duration()}?</p>
//       <div className="flex space-x-2 justify-end">
//         <button className="p-1 bg-alsoit-gray-200 text-alsoit-gray-50 rounded font-semibold hover:bg-alsoit-gray-75">
//           Cancel
//         </button>
//         <button className="p-1 bg-alsoit-purple-300 text-alsoit-gray-50 rounded font-semibold hover:bg-alsoit-purple-50 hover:text-alsoit-gray-300">
//           Confirm
//         </button>
//       </div>
//     </div>
//   );
// }
