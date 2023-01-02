import React, { useState } from 'react';
import { Spinner } from '../../../common';
import { useCreateWatcher } from '../../../features/general/watchers/watchersService';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import { itemType } from '../../../types';
import { ISelectedData } from '../../PermissionManagement';
import SelectMenuTeamMembers from '../../selectMenu';

interface AddNewProps {
  item: { type: itemType; id: string };
}

export default function AddNew({ item }: AddNewProps) {
  const [selectedMember] = useState<ISelectedData | null>(
    null
  );
  const { data, status } = useGetTeamMembers({ page: 0, query: '' });
  const teamMembers = data?.data.team_members;

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

  return teamMembers ? (
    <SelectMenuTeamMembers
      teamMembers={data?.data.team_members.map((i) => ({
        id: i.id,
        name: i.name || i.user.name,
        email: i.user?.email,
        accessLevel: i.id,
        type: 'member',
      }))}
      selectedData={selectedMember}
      setSelectedData={handleChange}
      title="Add new watcher:"
    />
  ) : null;
}
