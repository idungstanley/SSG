import React, { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { SectionHeadingWithTabs } from '../../../../../components';

interface TabbedHeadingProps {
  selectedTabKey: string;
  actions?: ReactNode;
}

function TabbedHeading({ selectedTabKey, actions }: TabbedHeadingProps) {
  const { teamMemberGroupId } = useParams();

  return (
    <SectionHeadingWithTabs
      title="Settings"
      titleSize="text-lg"
      tabs={[
        {
          name: 'General',
          count: null,
          current: selectedTabKey === 'general',
          href: `/settings/team-members/groups/${teamMemberGroupId}`,
        },
        {
          name: 'Members',
          count: null,
          current: selectedTabKey === 'members',
          href: `/settings/team-members/groups/${teamMemberGroupId}/members`,
        },
      ]}
      actions={actions}
    />
  );
}

export default TabbedHeading;
