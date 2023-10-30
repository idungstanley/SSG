import React from 'react';
import Row from './Row';
import { IInvite } from '../../../../../../features/settings/teamMemberInvites/teamMemberInvites.interface';

interface TableProps {
  data: IInvite[];
}

export default function Body({ data }: TableProps) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {data &&
        data.map((teamMemberInvite) => <Row teamMemberInviteId={teamMemberInvite.id} key={teamMemberInvite.id} />)}
    </tbody>
  );
}
