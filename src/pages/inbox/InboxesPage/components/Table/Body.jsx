import { useSelector } from 'react-redux';
import React from 'react';
import Row from './Row';
import {
  useGetHiddenInboxes,
  useGetInboxes,
} from '../../../../../features/inbox/inboxesService';

function Body() {
  const { showHidden } = useSelector((state) => state.inboxes);
  const { status: activeStatus, data: active } = useGetInboxes();
  const { status: hiddenStatus, data: hidden } = useGetHiddenInboxes();
  const data = active && hidden
    ? showHidden
      ? [...hidden.data.inboxes]
      : [...active.data.inboxes]
    : null;

  return (
    <tbody className="bg-white divide-y divide-gray-100">
      {activeStatus === 'success'
        && hiddenStatus === 'success'
        && data?.map((inbox) => (
          <Row
            key={inbox.id}
            inboxId={inbox.id}
            isHidden={!active.data.inboxes.map((i) => i.id).includes(inbox.id)}
          />
        ))}
    </tbody>
  );
}

export default Body;
