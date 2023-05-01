import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { checkIsOwner } from '../../lib/userUtils';
import DisapprovedDaysOffList from '../DisapprovedDaysOffList';

export default function ManagePage() {
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const members = data?.data.team_members ?? [];

  const isOwner = checkIsOwner(members);

  if (!isOwner) {
    return <div>You have no right to do this</div>;
  }

  return (
    <div className="w-full p-4">
      <div className="w-fit mx-auto">
        <DisapprovedDaysOffList />
      </div>
    </div>
  );
}
