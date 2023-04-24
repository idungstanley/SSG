import dayjs from 'dayjs';
import { useState } from 'react';
import ChangeYear from '../ChangeYear';
import YearCalendar from '../YearCalendar';

const currentDate = dayjs();

export default function YearPage() {
  const [year, setYear] = useState<number>(currentDate.year());

  return (
    <>
      <section className="flex items-center justify-between p-4">
        <ChangeYear year={year} setYear={setYear} />

        {/* action */}
        {/* <div className="hidden md:ml-4 md:flex md:items-center">
          <div className="ml-6 h-6 w-px bg-gray-300" />
          <button
            type="button"
            className="ml-6 rounded-md  bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add event
          </button>
        </div> */}
      </section>

      <YearCalendar year={year} />
    </>
  );
}
