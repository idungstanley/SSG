import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateNewItemBtn from '../../../components/CreateNewItemBtn';
import { setCreateInboxSlideOverVisibility } from '../../../features/general/slideOver/slideOverSlice';
import CreateInboxSlideOver from '../../inbox/InboxesPage/components/CreateInboxSlideOver';

function Inbox() {
  const dispatch = useDispatch();
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
    </div>
  );
}

export default Inbox;
