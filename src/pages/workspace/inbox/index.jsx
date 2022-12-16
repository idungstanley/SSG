import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateNewItemBtn from '../../../components/CreateNewItemBtn';
import ItemsListInSidebar from '../../../components/ItemsListInSidebar';
import { setCreateInboxSlideOverVisibility } from '../../../features/general/slideOver/slideOverSlice';
import { useInboxes } from '../../../features/inbox/inboxesService';
import CreateInboxSlideOver from '../../inbox/InboxesPage/components/CreateInboxSlideOver';

function Inbox() {
  const dispatch = useDispatch();
  const { data, status } = useInboxes('active');

  return (
    <div className="space-y-4">
      <CreateNewItemBtn
        onClick={() => dispatch(setCreateInboxSlideOverVisibility(true))}
        title="Create new Inbox"
      />
      <Link
        to="/workspace/inbox"
        className="flex justify-center bg-gray-50 hover:bg-gray-100 border transition py-2 rounded-xl w-full"
      >
        <p>Go to inboxes</p>
      </Link>
      <CreateInboxSlideOver />

      <ItemsListInSidebar items={data} status={status} type="inbox" />
    </div>
  );
}

export default Inbox;
