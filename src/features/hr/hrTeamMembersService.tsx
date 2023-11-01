import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IHrTeamMembersInterface } from './hrTeamMembers.interface';

export const useGetHrTeamMembers = () => {
  return useQuery(
    [],
    () =>
      requestNew<IHrTeamMembersInterface>({
        url: 'hr/hr-team-members',
        method: 'GET'
      }),
    {
      select: (res) => res
    }
  );
};
