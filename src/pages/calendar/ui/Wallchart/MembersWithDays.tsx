import { useAppSelector } from '../../../../app/hooks';
import { selectCalendar } from '../../../../features/calendar/slice/calendarSlice';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { MemberCard } from './MemberCard';
import { Month } from './Month';

export function MembersWithDays() {
  const { blacklistIds } = useAppSelector(selectCalendar);
  const { data } = useGetTeamMembers({ page: 1, query: '' });

  const members = data?.data.team_members ?? [];

  const filteredMembers = members.filter((i) => !blacklistIds.includes(i.id));

  return (
    <div className="w-full space-y-6">
      {filteredMembers.map((i) => (
        <div key={i.id} className="grid grid-cols-autoFr items-center">
          <MemberCard initials={i.user.initials} email={i.user.email} name={i.user.name} />

          <Month userId={i.user.id} />
        </div>
      ))}
    </div>
  );
}
