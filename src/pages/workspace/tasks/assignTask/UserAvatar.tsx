import React from 'react';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';
import AvatarForOwner from '../../../../components/avatar/AvatarForOwner';
import { AvatarWithInitials } from '../../../../components';
import AvatarForOwnerWithImage from '../../../../components/avatar/AvatarForOwnerWithImage';
import AvatarWithImage from '../../../../components/avatar/AvatarWithImage';
// import { useAppSelector } from '../../../../app/hooks';
import { ROLES } from '../../../../utils/Constants/RoleConstants';

interface avatarProps {
  user: ITeamMembersAndGroup;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  width?: string;
  height?: string;
}

function UserAvatar({ user, handleClick, width = 'w-7', height = 'h-7' }: avatarProps) {
  // const { CompactView } = useAppSelector((state) => state.task);

  return (
    <div>
      {!user.user.avatar_path ? (
        <span onClick={handleClick}>
          {user.role.key === ROLES.owner ? (
            <AvatarForOwner
              initials={user.user.initials}
              backgroundColour={user.user.color}
              height={height}
              width={width}
            />
          ) : (
            <div className="border-2 border-red-400 rounded-full">
              <AvatarWithInitials
                initials={(user.user && (user.user.initials as string)) ?? user.initials}
                backgroundColour={(user.user && (user.user?.color as string)) ?? user.color}
                badge={true}
                height={height}
                width={width}
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
              <AvatarWithImage image_path={user.user.avatar_path} height={height} width={width} />
            )}
          </div>
        </span>
      )}
    </div>
  );
}

export default UserAvatar;
