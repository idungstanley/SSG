import React from 'react';
import Row from './Row';
import { useGetInboxes } from '../../../../../features/inbox/inboxesService';

function Body() {
  const { status, data } = useGetInboxes();

  return (
    <tbody className="bg-white divide-y divide-gray-100">
      {status === 'success' && data && data.data.inboxes.map((inbox) => (
        <Row inboxId={inbox.id} />
      ))}
    </tbody>
  );
}

export default Body;
