import React from 'react';
import { IPermissionMember } from '../../../../../features/permissions/permissions.interfaces';
import MemberItem from './MemberItem';

interface MembersListProps {
  membersList: IPermissionMember[];
  isGroup?: boolean;
  title: string;
}

export default function MembersList({
  membersList,
  isGroup,
  title,
}: MembersListProps) {
  return (
    <div>
      <h1 className="uppercase text-gray-600 text-sm mb-2">{title}</h1>
      <div className="flex flex-col gap-2">
        {membersList.map((member) => (
          <MemberItem isGroup={isGroup} key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
