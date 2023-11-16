import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IHrAddTeamMemberInterface, IHrTeamMembersInterface } from './hrTeamMembers.interface';

export const useGetHrTeamMembers = (data: { selections: { hub_id: string; members_id: string[] }[] }) => {
  const { selections } = data;
  return useQuery(
    [],
    () =>
      requestNew<IHrTeamMembersInterface>({
        url: 'hr/hr-team-members/get-selections',
        method: 'POST',
        data: {
          selections: selections
        }
      }),
    {
      select: (res) => res.data.hr_team_members
    }
  );
};

export const useAddHrTeamMember = (
  hubId: string,
  hrTeamMemberToAdd: string,
  hrTeamMemberRole: string,
  currentDate: string,
  hrTeamMemberLocation: string,
  hrSalaryValue: string,
  hrAllowanceValue: string
) => {
  return useQuery(
    [],
    () =>
      requestNew<IHrAddTeamMemberInterface>({
        url: 'hr/hr-team-members',
        method: 'POST',
        data: {
          hub_id: hubId,
          team_member_id: hrTeamMemberToAdd,
          hr_role: hrTeamMemberRole,
          start_date: currentDate,
          location: hrTeamMemberLocation,
          salary: hrSalaryValue,
          allowance: hrAllowanceValue
        }
      }),
    {
      select: (res) => res
    }
  );
};
