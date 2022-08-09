import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedInboxTabKey } from '../../../../../../features/inbox/inboxSlice';
import { useGetInboxFiles } from '../../../../../../features/inbox/inboxService';
import { useGetInbox } from '../../../../../../features/inbox/inboxesService';
import { TabsWithUnderline } from '../../../../../../components';

export default function Tabs() {
  const dispatch = useDispatch();
  const { inboxId } = useParams();
  const selectedInboxTabKey = useSelector((state) => state.inbox.selectedInboxTabKey);

  const goToInboxTab = () => {
    dispatch(setSelectedInboxTabKey('inbox'));
  };

  const goToArchivedTab = () => {
    dispatch(setSelectedInboxTabKey('archived'));
  };

  const [tabs, setTabs] = useState([
    {
      key: 'inbox',
      name: 'Inbox',
      onClick: goToInboxTab,
      badge: null,
    },
    {
      key: 'archived',
      name: 'Archived',
      onClick: goToArchivedTab,
      badge: null,
    },
  ]);

  const {
    status,
    data,
  } = useGetInboxFiles({
    inboxId,
    isArchived: selectedInboxTabKey === 'archived' ? 1 : 0,
  });

  const { data: inbox } = useGetInbox(inboxId);

  useEffect(() => {
    if (status === 'success') {
      setTabs([
        {
          key: 'inbox',
          name: 'Inbox',
          onClick: goToInboxTab,
          badge: inbox && inbox.unfiled_count,
        },
        {
          key: 'archived',
          name: 'Archived',
          onClick: goToArchivedTab,
          badge: null,
        },
      ]);
    }

    return true;
  }, [data, inbox]);

  return (
    <TabsWithUnderline
      tabs={tabs}
      selectedTab={selectedInboxTabKey}
    />
  );
}
