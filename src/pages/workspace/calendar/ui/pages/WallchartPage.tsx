import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { getMonth } from '../../lib/getDaysInYear';
import MembersList from '../MembersList';
import Month from '../Month';

const members = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Snanislau',
      email: 'lorderetik@gmail.com'
    },
    daysOff: [
      {
        id: '1',
        start: '2023-04-19',
        end: '2023-04-23',
        type: 'sick leave',
        reason: 'Blah blah blah'
      },
      {
        id: '2',
        start: '2023-04-25',
        end: '2023-04-26',
        type: 'holiday',
        reason: 'Blah blah blah blah'
      }
    ]
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'John',
      email: 'john@gmail.com'
    },
    daysOff: [
      {
        id: '1',
        start: '2023-04-28',
        end: '2023-04-29',
        type: 'sick leave',
        reason: 'Blah blah blah'
      },
      {
        id: '2',
        start: '2023-05-01',
        end: '2023-05-01',
        type: 'sick leave',
        reason: 'Blah blah blah'
      }
    ]
  }
];

const currentDate = dayjs();

export default function WallchartPage() {
  const [activeMemberId, setActiveMemberId] = useState('1');
  const [daysOff, setDaysOff] = useState(members.find((i) => i.user.id === activeMemberId) ?? members[0]);
  const [selectedMonth, setSelectedMonth] = useState(currentDate);
  const month = useMemo(() => getMonth(currentDate.year(), currentDate.month()), []);

  const handleEvent = () => {
    console.log(setDaysOff);
  };

  return (
    <>
      <section className="flex items-center justify-between p-4">
        <div></div>

        {/* action */}
        <div className="hidden md:ml-4 md:flex md:items-center">
          <div className="ml-6 h-6 w-px bg-gray-300" />
          <button
            type="button"
            className="ml-6 rounded-md  bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Add event
          </button>
        </div>
      </section>

      <>
        {/* <h2 className="text-base font-semibold leading-6 text-gray-900">Team members</h2> */}
        <div className="px-4 grid grid-cols-2">
          <div>
            <MembersList activeMemberId={activeMemberId} onChange={(id) => setActiveMemberId(id)} />
          </div>

          <div className="mt-10 text-center lg:mt-9 flex flex-col items-center justify-center">
            {/* change month */}

            <Month
              daysOff={[daysOff]}
              handleEvent={handleEvent}
              month={month}
              title={
                <Month.Title
                  title={month.name}
                  extended
                  onChange={(action) =>
                    setSelectedMonth(
                      action === 'decrement' ? selectedMonth.subtract(1, 'month') : selectedMonth.add(1, 'month')
                    )
                  }
                />
              }
            />

            <button
              type="button"
              className="mt-8 w-full rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Add event
            </button>
          </div>
        </div>
      </>
    </>
  );
}
