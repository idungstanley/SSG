import { useAppSelector } from '../../../app/hooks';
import { ITeamMembersAndGroup } from '../../../features/settings/teamMembersAndGroups.interfaces';

export const checkIsOwner = (members: ITeamMembersAndGroup[]) => {
  const { currentUserId } = useAppSelector((state) => state.auth);

  const user = members.find((i) => i.user.id === currentUserId);

  return user?.role.key === 'owner';
};

export const getUser = (members: ITeamMembersAndGroup[], id: string) => {
  return members.find((i) => i.user.id === id);
};
