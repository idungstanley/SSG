import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import HrListMembers from '../ui/HrListMembers';
import { checkIsOwner } from '../../calendar/lib/userUtils';
import { Fragment, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectCalendar } from '../../../features/calendar/slice/calendarSlice';
import { AddItem } from '../ui/AddItem';
import { cl } from '../../../utils';

export default function ManageHr() {
  const { blacklistIds } = useAppSelector(selectCalendar);
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const members = data?.data.team_members ?? [];
  const { activeItemName } = useAppSelector((state) => state.workspace);

  const isOwner = checkIsOwner(members);

  const filteredMembers = members.filter((i) => !blacklistIds.includes(i.id));

  if (!isOwner) {
    return <div>You have no right to do this</div>;
  }

  const [showNewDayField, setShowNewDayField] = useState(false);

  const handleClose = () => {
    setShowNewDayField(false);
  };

  return (
    <div className="w-full p-4 h-full">
      <div className="mx-auto h-full">
        <div className="w-full">
          <div
            className="pt-1 border-t-4 border-l-4 border-purple-500 rounded-3xl bg-purple-50 pb-3"
            style={{
              borderColor: '#9747FF'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="flex items-center justify-between space-x-10 bg-purple-500 -mt-1 p-1 pr-7 rounded-tl-2xl -ml-0.5 gap-4 h-8"
                  style={{
                    backgroundColor: '#9747FF'
                  }}
                >
                  <div className="flex items-center pl-2 space-x-2 text-sm text-white w-fit">
                    <h1>List 1</h1>
                  </div>
                </div>
                <p className="ml-3">{activeItemName}</p>
              </div>
            </div>
            {showNewDayField ? (
              <div className="pl-2">
                <AddItem onClose={() => handleClose()} members={members} />
              </div>
            ) : null}
            {!showNewDayField && (
              <div className="h-5 font-semibold alsoit-gray-300">
                <button onClick={() => setShowNewDayField(true)} className={cl('p-1.5 pl-5 text-left w-fit text-xs')}>
                  + NEW
                </button>
              </div>
            )}
            <section style={{ minHeight: '0', maxHeight: '83vh' }} className="w-full h-full p-4 pb-0 space-y-10">
              <table className="w-full mt-5">
                <thead>
                  <tr>
                    <td className="items-center text-center pb-1">Employee</td>
                    <td className="items-center text-center pb-1">Role</td>
                    <td className="items-center text-center pb-1">Work Location</td>
                    <td className="items-center text-center pb-1">Start Date</td>
                    <td className="items-center text-center pb-1">Salary</td>
                    <td className="items-center text-center pb-1">Allowance</td>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {Object.keys(filteredMembers).map((memberData, key) => (
                    <Fragment key={key}>
                      <HrListMembers member={filteredMembers[key]} />
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
