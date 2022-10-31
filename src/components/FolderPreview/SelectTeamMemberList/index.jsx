import { useQuery } from '@tanstack/react-query';
import React from 'react';
import requestNew from '../../../app/requestNew';

const useGetTeamMembers = () => {
  const { data, status } = useQuery(['team-members'], async () => requestNew({
    url: 'workspace/team-members',
    method: 'GET',
  }));
  const teamMembers = data && data.data.team_members;

  return { data: teamMembers, status };
};

function TeamMembersList() {
  const { data, status } = useGetTeamMembers();

  return (
    <div className="absolute bg-white rounded-xl border right-0 top-12">
      <ul className="divide-y divide-gray-200">
        {data && data.length === 0 ? <p>no users</p> : null}
        {status === 'success'
          ? data && data.map((i) => (
            <li className="flex py-4 hover:bg-gray-50 cursor-pointer" key={i.user.id}>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{i.user.name}</p>
                <p className="text-sm text-gray-500">{i.user.email}</p>
              </div>
            </li>
          )) : null}
      </ul>
    </div>
  );
}

export default TeamMembersList;
