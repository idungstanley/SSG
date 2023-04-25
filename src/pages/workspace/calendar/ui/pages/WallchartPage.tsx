import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import { useGetTeamMembers } from '../../../../../features/settings/teamMembers/teamMemberService';
import { useDaysOff } from '../../lib/daysOffContext';
import { getMonth } from '../../lib/getDaysInYear';
import MembersList from '../MembersList';
import Month from '../Month';

const currentDate = dayjs();

export default function WallchartPage() {
  const { daysOff, activeMemberId, setActiveMemberId, setNewDayOff, setShowCreateDayOffModal } = useDaysOff();
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const members = data?.data.team_members ?? [];
  console.log(members);

  const [selectedMonth, setSelectedMonth] = useState(currentDate);
  const month = useMemo(() => getMonth(selectedMonth.year(), selectedMonth.month()), [selectedMonth]);

  const handleEvent = ({ start, end }: { start: Dayjs; end: Dayjs }) => {
    setNewDayOff({ start, end });
    setShowCreateDayOffModal(true);
  };

  const handleChangeMember = (id: string) => {
    const member = members.find((i) => i.user.id === id);

    if (member) {
      setActiveMemberId(id);
    }
  };

  const currentDaysOff = useMemo(() => daysOff.filter((i) => i.user.id === activeMemberId), [activeMemberId]);

  const handleChangeMonth = (action: 'increment' | 'decrement') =>
    setSelectedMonth(action === 'decrement' ? selectedMonth.subtract(1, 'month') : selectedMonth.add(1, 'month'));

  return (
    <div className="p-4 grid grid-cols-2">
      <div>
        <MembersList activeMemberId={activeMemberId} onChange={handleChangeMember} />
      </div>

      <div className="text-center flex flex-col items-center justify-center">
        {/* change month */}

        <Month
          daysOff={currentDaysOff}
          handleEvent={handleEvent}
          month={month}
          title={<Month.Title title={month.name} extended onChange={handleChangeMonth} />}
        />

        {/* <button
              type="button"
              className="mt-8 w-full rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Add event
            </button> */}
      </div>
    </div>
  );
}

// header
/* <h2 className="text-base font-semibold leading-6 text-gray-900">Team members</h2> */
// <section className="flex items-center justify-between p-4">
//         <div></div>

//         <div className="hidden md:ml-4 md:flex md:items-center">
//           <div className="ml-6 h-6 w-px bg-gray-300" />
//           <button
//             type="button"
//             className="ml-6 rounded-md  bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
//           >
//             Add event
//           </button>
//         </div>
//       </section>
