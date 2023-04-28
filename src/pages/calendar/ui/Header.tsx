import { useMemo } from 'react';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import { useDaysOff } from '../lib/daysOffContext';
import { Tabs } from './Tabs';

export default function Header() {
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const { activeMemberId } = useDaysOff();

  const members = data?.data.team_members ?? [];

  const memberName = useMemo(() => members.find((i) => i.user.id === activeMemberId), [members, activeMemberId]);

  return (
    <section className="px-4 flex justify-between items-center border-b border-gray-200 w-full">
      <h1 className="text-base font-semibold leading-6 text-gray-900">{memberName?.user.name}</h1>
      <Tabs />
    </section>
  );
}
