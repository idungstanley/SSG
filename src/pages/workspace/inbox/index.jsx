import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateNewItemBtn from '../../../components/CreateNewItemBtn';
import { setCreateInboxSlideOverVisibility } from '../../../features/general/slideOver/slideOverSlice';
import CreateInboxSlideOver from '../../inbox/InboxesPage/components/CreateInboxSlideOver';

function Inbox() {
  const dispatch = useDispatch();
  return (
    <>
      <CreateNewItemBtn
        onClick={() => dispatch(setCreateInboxSlideOverVisibility(true))}
        title="Create new Inbox"
      />
      <Link
        to="/inbox"
        id="home"
        key=""
        className="flex items-center justify-start space-x-3 pl-2 h-10 rounded hover:bg-gray-200"
      >
        <p>Inbox</p>
      </Link>
      <CreateInboxSlideOver />
    </>
  );
}

export default Inbox;
