import React from 'react';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';
import AvatarForOwner from '../../../../components/avatar/AvatarForOwner';
import { AvatarWithInitials } from '../../../../components';
import AvatarForOwnerWithImage from '../../../../components/avatar/AvatarForOwnerWithImage';
import AvatarWithImage from '../../../../components/avatar/AvatarWithImage';
import { useAppSelector } from '../../../../app/hooks';
import { ROLES } from '../../../../utils/Constants/RoleConstants';

interface avatarProps {
  user: ITeamMembersAndGroup;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function UserAvatar({ user, handleClick }: avatarProps) {
  const { CompactView } = useAppSelector((state) => state.task);

  return (
    <div>
      {!user.user.avatar_path ? (
        <span onClick={handleClick}>
          {user.role.key === ROLES.owner ? (
            <AvatarForOwner initials={user.user.initials} backgroundColour={user.user.color} />
          ) : (
            <div className="border-2 border-red-400 rounded-full">
              <AvatarWithInitials
                initials={user.user && (user.user.initials as string)}
                backgroundColour={user.user && (user.user?.color as string)}
                badge={true}
                height={CompactView ? 'h-6' : 'h-7'}
                width={CompactView ? 'w-6' : 'w-7'}
              />
            </div>
          )}
        </span>
      ) : (
        <span onClick={handleClick}>
          <div className="border-2 border-red-400 rounded-full">
            {user.role.key === ROLES.owner ? (
              <AvatarForOwnerWithImage image_path={user.user.avatar_path} />
            ) : (
              <AvatarWithImage image_path={user.user.avatar_path} height="h-8" width="w-8" />
            )}
          </div>
        </span>
      )}
    </div>
  );
}

export default UserAvatar;
