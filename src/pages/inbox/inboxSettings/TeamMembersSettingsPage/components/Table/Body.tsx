import React from 'react';
import { useParams } from 'react-router-dom';
import Row from './Row';
import { useGetInboxAccess } from '../../../../../../features/inbox/inboxSettingsService';

export default function Body() {
  const { inboxId } = useParams();
  const { data, status } = useGetInboxAccess(inboxId);

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {status === 'success' && data.data.inbox_members.map((inboxMember) => (
        <Row key={inboxMember.id} inboxMember={inboxMember} />
      ))}
    </tbody>
  );
}
