import React from 'react';
import { useGetActiveInboxes } from '../../../features/inbox/inboxesService';
import CreateInboxSlideOver from '../../inbox/InboxesPage/components/CreateInboxSlideOver';
import HList from '../hubs/components/ActiveTree/Items/hub/HList';

function InboxData() {
  const { data: dt, status } = useGetActiveInboxes();

  const data = dt?.data.inboxes;

  return (
    <div className="space-y-4">
      <CreateInboxSlideOver />
    </div>
  );
}

export default InboxData;
