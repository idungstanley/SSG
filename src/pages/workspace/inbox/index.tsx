import { InboxStackIcon } from '@heroicons/react/24/solid';
import React from 'react';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import InboxData from './InboxData';

function Inbox() {
  return (
    <>
      <PlaceItem
        label="In-tray"
        icon={<InboxStackIcon className="w-4 h-4" />}
      />
      <InboxData />
    </>
  );
}

export default Inbox;
