import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { SectionHeadingWithTabs } from '../../../../../components';
import { useGetInboxAccess } from '../../../../../features/inbox/inboxSettingsService';

function TabbedHeading({ selectedTabKey, actions }) {
  const { inboxId } = useParams();
  const { data, status } = useGetInboxAccess(inboxId);

  return (
    <SectionHeadingWithTabs
      title="Settings"
      titleSize="text-lg"
      tabs={[
        {
          name: 'General',
          count: null,
          current: selectedTabKey === 'general',
          href: `/inbox/${inboxId}/settings`,
        },
        {
          name: 'Permissions',
          count: null,
          current: selectedTabKey === 'permissions',
          href: `/inbox/${inboxId}/settings/permissions`,
        },
        {
          name: 'Members',
          count: status === 'success' ? data.data.inbox_members.length : null,
          current: selectedTabKey === 'members',
          href: `/inbox/${inboxId}/settings/members`,
        },
        {
          name: 'Groups',
          count: status === 'success' ? data.data.inbox_member_groups.length : null,
          current: selectedTabKey === 'groups',
          href: `/inbox/${inboxId}/settings/groups`,
        },
      ]}
      actions={actions}
    />
  );
}

export default TabbedHeading;

TabbedHeading.defaultProps = {
  actions: null,
};

TabbedHeading.propTypes = {
  selectedTabKey: PropTypes.string.isRequired,
  actions: PropTypes.element,
};
