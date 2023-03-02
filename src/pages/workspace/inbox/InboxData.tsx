import React from 'react';
import ItemsListInSidebar from '../../../components/ItemsListInSidebar';
import { useGetActiveInboxes } from '../../../features/inbox/inboxesService';
import CreateInboxSlideOver from '../../inbox/InboxesPage/components/CreateInboxSlideOver';

function InboxData() {
  const { data: dt, status } = useGetActiveInboxes();

  const data = dt?.data.inboxes;

  return (
    <div className="space-y-4">
      <CreateInboxSlideOver />
      <ItemsListInSidebar items={data} status={status} type="inbox" />
    </div>
  );
}

export default InboxData;
