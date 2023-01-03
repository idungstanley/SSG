import React from 'react';
import { Spinner } from '../../../common';
import {
  useCreateWatcher,
  useGetItemWatchers,
} from '../../../features/general/watchers/watchersService';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import { itemType } from '../../../types';
import { ISelectedData } from '../../PermissionManagement';
import SelectMenuTeamMembers from '../../selectMenu';

interface AddNewProps {
  item: { type: itemType; id: string };
}

export default function AddNew({ item }: AddNewProps) {
  const { data, status } = useGetTeamMembers({ page: 0, query: '' });
  const teamMembers = data?.data.team_members;

  const { data: dt } = useGetItemWatchers(item);
  const watcherIds = dt?.data.watchers.map((watcher) => watcher.team_member_id);

  // get unique members that are not in watchers list
  const membersWithoutWatchers = teamMembers?.filter(
    (member) => !watcherIds?.includes(member.id)
  );

  const { mutate: onCreate } = useCreateWatcher(item.id);

  const handleChange = (member: ISelectedData | null) => {
    if (member) {
      onCreate({
        ...item,
        team_member_ids: [member.id],
      });
    }
  };

  if (status === 'loading') {
    return (
      <div className="mx-auto w-6 mt-5 justify-center">
        <Spinner size={8} color="#0F70B7" />
      </div>
    );
  }

  return membersWithoutWatchers ? (
    membersWithoutWatchers.length ? (
      <SelectMenuTeamMembers
        teamMembers={membersWithoutWatchers.map((i) => ({
          id: i.id,
          name: i.name || i.user.name,
          email: i.user?.email,
          accessLevel: i.id,
          type: 'member',
        }))}
        selectedData={null}
        setSelectedData={handleChange}
        title="Add new watcher:"
        showEmail
      />
    ) : null
  ) : null;
}
