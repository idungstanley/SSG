import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import ChangeAccess from './ChangeAccess';
import { IPermissionMember } from '../../../../../features/permissions/permissions.interfaces';
import RemoveAccess from './RemoveAccess';

interface MemberProps {
  member: IPermissionMember;
  isGroup?: boolean;
}

export default function MemberItem({ member, isGroup }: MemberProps) {
  const { currentUserId } = useAppSelector((state) => state.auth);

  const access = member.access_level.name;

  const isCurrentUser = !isGroup ? currentUserId === member.team_member.user.id : false;

  return (
    <div className="flex flex-col gap-3 border rounded-md p-2 w-full text-sm">
      <div className="flex justify-between items-center">
        <div className="space-y-1 text-gray-500">
          {isGroup ? (
            // is group
            <p className="text-base">{member.team_member_group.name}</p>
          ) : isCurrentUser ? (
            // is you
            <p className="text-base text-gray-600">You</p>
          ) : (
            // is another user
            <>
              <p className="text-base text-gray-600">{member.team_member.user.name}</p>
              <p>{member.team_member.user.email}</p>
            </>
          )}
        </div>

        {/* can change if it's not you */}
        {isCurrentUser ? (
          <p className="text-indigo-600 font-semibold">{access}</p>
        ) : (
          <ChangeAccess
            itemType={isGroup ? 'member-group' : 'member'}
            actualAccess={member.access_level.key}
            accessToId={!isGroup ? member.team_member.id : member.team_member_group.id}
          />
        )}
      </div>

      <div className="flex items-center justify-end">
        <RemoveAccess
          itemType={isGroup ? 'member-group' : 'member'}
          accessToId={!isGroup ? member.team_member.id : member.team_member_group.id}
          isActiveUser={!isGroup ? member.team_member.user.id === currentUserId : false}
        />
      </div>
    </div>
  );
}
