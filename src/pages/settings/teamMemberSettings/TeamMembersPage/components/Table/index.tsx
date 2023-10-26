import React from 'react';
import Header from './Header';
import Body from './Body';
import Pagination from './Pagination';
import { ITeamMembersAndGroupsReq } from '../../../../../../features/settings/teamMembersAndGroups.interfaces';

export interface TeamMembersProps {
  teamMembers: ITeamMembersAndGroupsReq;
}

export default function Table({ teamMembers }: TeamMembersProps) {
  return (
    <div className="flex flex-col">
      <div className="inline-block min-w-full align-middle">
        <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <Header />
            <Body teamMembers={teamMembers} />
          </table>
          <Pagination />
        </div>
      </div>
    </div>
  );
}
