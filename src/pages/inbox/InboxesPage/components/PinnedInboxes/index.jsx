import React from 'react';
import PinnedInboxItem from './PinnedInboxItem';
import { useGetPinnedInboxes } from '../../../../../features/inbox/inboxesService';

function PinnedInboxes() {
  const { status: pinnedInboxesStatus, data: pinnedInboxesData } = useGetPinnedInboxes();

  return pinnedInboxesStatus === 'success' && pinnedInboxesData.data.pinned_inboxes.length !== 0 ? (
    <div className="px-4 mt-6 sm:px-6 pb-8 border-gray-200 border-b">
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Pinned Inboxes</h2>
      <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3">
        {pinnedInboxesData.data.pinned_inboxes.map((pinnedInbox) => (
          <PinnedInboxItem key={pinnedInbox.id} pinnedInboxId={pinnedInbox.id} />
        ))}
      </ul>
    </div>
  ) : null;
}

export default PinnedInboxes;
