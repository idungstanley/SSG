import React from 'react';
import { useAppSelector } from '../../../../../../../../app/hooks';
import { IPermissionMember } from '../../../../../../../../features/permissions/permissions.interfaces';

interface MemberProps {
  member: IPermissionMember;
  isGroup?: boolean;
}

export default function MemberItem({ member, isGroup }: MemberProps) {
  const { currentUserId } = useAppSelector((state) => state.auth);

  const access = member.access_level.name;
  const isOwner = access === 'Owner';
  const isCurrentUser = !isGroup
    ? currentUserId === member.team_member.user.id
    : false;

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
              <p className="text-base text-gray-600">
                {member.team_member.user.name}
              </p>
              <p>{member.team_member.user.email}</p>
            </>
          )}
        </div>

        <p className="text-indigo-600 font-semibold">{access}</p>
      </div>

      {!isOwner ? (
        <div className="flex items-center justify-between">
          <span>change access</span>
          <span>remove access</span>
        </div>
      ) : null}
    </div>
  );
}
