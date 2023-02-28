import { InboxStackIcon } from '@heroicons/react/24/solid';
import React from 'react';
import ItemsListInSidebar from '../../../components/ItemsListInSidebar';
import { useGetActiveInboxes } from '../../../features/inbox/inboxesService';
import CreateInboxSlideOver from '../../inbox/InboxesPage/components/CreateInboxSlideOver';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';

function Inbox() {
  const { data: dt, status } = useGetActiveInboxes();

  const data = dt?.data.inboxes;

  return (
    <>
      <PlaceItem
        label="In-tray"
        icon={<InboxStackIcon className="w-4 h-4" />}
      />
      <div className="space-y-4">
        <CreateInboxSlideOver />
        <ItemsListInSidebar items={data} status={status} type="inbox" />
      </div>
    </>
  );
}

export default Inbox;
