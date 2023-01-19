import React from 'react';
import { useDispatch } from 'react-redux';
import CreateNewItemBtn from '../../../components/CreateNewItemBtn';
import ItemsListInSidebar from '../../../components/ItemsListInSidebar';
import { setCreateInboxSlideOverVisibility } from '../../../features/general/slideOver/slideOverSlice';
import { useGetActiveInboxes } from '../../../features/inbox/inboxesService';
import CreateInboxSlideOver from '../../inbox/InboxesPage/components/CreateInboxSlideOver';

function Inbox() {
  const dispatch = useDispatch();
  const { data: dt, status } = useGetActiveInboxes();

  const data = dt?.data.inboxes;

  return (
    <div className="space-y-4">
      <CreateInboxSlideOver />
      <ItemsListInSidebar items={data} status={status} type="inbox" />
    </div>
  );
}

export default Inbox;
