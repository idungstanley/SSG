import moment from 'moment-timezone';
import { useAppSelector } from '../../../../app/hooks';
import DateStringFix from '../../../../utils/ManualTimeFix';
import dayjs from 'dayjs';
import CurrencyIcon from '../../../../assets/icons/CurrencyIcon';
import TagIcon from '../../../../assets/icons/DotCircleTagIcon';
import { useState } from 'react';

interface ManualTimeAddProps {
  start_date: dayjs.Dayjs;
  end_date: dayjs.Dayjs;
  start_time?: string;
  end_time?: string;
}

export default function ManualTimeAddDialog() {
  const [interactions, setInteractions] = useState<{ tag: boolean; currency: boolean }>({
    tag: false,
    currency: false
  });

  return (
    <>
      <section id="body" className="px-3 py-1 text-white bg-indigo-500 rounded-b-md">
        <div className="flex flex-col space-y-2 px-1">
          <div className="flex space-x-2 justify-center my-4">
            <input
              type="text"
              className="bg-indigo-400 text-alsoit-gray-50 brightness-100 font-semibold border-none outline-none rounded"
              value="9:30 AM"
            />
            <span className="flex items-center font-bold text-alsoit-text-lg">-</span>
            <input
              type="text"
              className="bg-indigo-400 text-alsoit-gray-50 brightness-100 font-semibold border-none outline-none rounded"
              value="9:30 AM"
            />
          </div>
          <div className="flex justify-between w-full px-1">
            <div className="flex space-x-1">
              <span className="text-alsoit-text-lg text-alsoit-gray-50 font-semibold">When: </span>
              <span className="font-semibold text-alsoit-text-lg">Today</span>
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
              <button className="bg-alsoit-purple-300 hover:bg-purple-600 text-white p-1 rounded-lg font-bold">
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
