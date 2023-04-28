import { useAppSelector } from '../../../app/hooks';
import { ITeamMembersAndGroup } from '../../../features/settings/teamMembersAndGroups.interfaces';

export const isOwner = (members: ITeamMembersAndGroup[]) => {
  const { currentUserId } = useAppSelector((state) => state.auth);

  return !!members.find((i) => i.user.id === currentUserId);
};
