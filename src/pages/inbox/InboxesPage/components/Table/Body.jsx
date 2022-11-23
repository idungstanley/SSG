import { useSelector } from 'react-redux';
import React from 'react';
import Row from './Row';
import { useGetInboxes } from '../../../../../features/inbox/inboxesService';

function Body() {
  const { showHidden } = useSelector((state) => state.inboxes);
  const { status, data } = useGetInboxes(showHidden);

  return (
    <tbody className="bg-white divide-y divide-gray-100">
      {status === 'success'
        && data
        && data.data.inboxes.map((inbox) => (
          <Row key={inbox.id} inboxId={inbox.id} />
        ))}
    </tbody>
  );
}

export default Body;
