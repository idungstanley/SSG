import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedInboxTabKey } from '../../../../../../features/inbox/inboxSlice';
import { useGetInboxFiles } from '../../../../../../features/inbox/inboxService';
import { TabsWithUnderline } from '../../../../../../components';

export default function Tabs() {
  const dispatch = useDispatch();
  const { inboxId } = useParams();

  const goToInboxTab = () => {
    dispatch(setSelectedInboxTabKey('inbox'));
  };

  const goToArchivedTab = () => {
    dispatch(setSelectedInboxTabKey('archived'));
  };

  const { data } = useGetInboxFiles({
    inboxId,
    isArchived: false,
  });

  const activeCount = data?.pages[0].data.not_archived_files_count;
  const archiveCount = data?.pages[0].data.archived_files_count;

  const tabs = [
    {
      key: 'inbox',
      name: 'Inbox',
      onClick: goToInboxTab,
      badge: activeCount,
    },
    {
      key: 'archived',
      name: 'Archived',
      onClick: goToArchivedTab,
      badge: archiveCount,
    },
  ];

  return <TabsWithUnderline tabs={tabs} />;
}
