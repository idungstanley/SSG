import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { Spinner } from '../../../common';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import { useShareItem } from '../../../features/shared/sharedService';
import SelectMenuTeamMembers, { ISelectedData } from '../../selectMenu';

export default function ShareItem() {
  const { shareSideOver } = useAppSelector((state) => state.slideOver);
  const { type, id } = shareSideOver;

  const { data, status } = useGetTeamMembers({ page: 0, query: '' });
  const teamMembers = data?.data.team_members;

  const { mutate: onShare } = useShareItem();

  const { currentUserId } = useAppSelector((state) => state.auth);

  const membersWithoutActive = teamMembers?.filter(
    (member) => member.user.id !== currentUserId
  );

  const handleShare = (member: ISelectedData | null) => {
    if (member && type && id) {
      onShare({
        type,
        userId: member.id,
        itemId: id,
      });
    }
  };

  return (
    <>
      {status === 'loading' ? (
        <div className="mx-auto w-6 mt-5 justify-center">
          <Spinner size={8} color="#0F70B7" />
        </div>
      ) : membersWithoutActive ? (
        <SelectMenuTeamMembers
          teamMembers={membersWithoutActive.map((i) => ({
            id: i.id,
            name: i.name || i.user.name,
            email: i.user?.email,
            accessLevel: i.id,
            type: 'member',
          }))}
          selectedData={null}
          setSelectedData={handleShare}
          title="Select member to share"
          showEmail
        />
      ) : null}
    </>
  );
}
