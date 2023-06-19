import React, { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { SectionHeadingWithTabs } from '../../../../../components';
import { useAppSelector } from '../../../../../app/hooks';

interface TabbedHeadingProps {
  selectedTabKey: string;
  actions?: ReactNode;
}

function TabbedHeading({ selectedTabKey, actions }: TabbedHeadingProps) {
  const { teamMemberGroupId } = useParams();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  return (
    <SectionHeadingWithTabs
      title="Settings"
      titleSize="text-lg"
      tabs={[
        {
          name: 'General',
          count: null,
          current: selectedTabKey === 'general',
          href: `${currentWorkspaceId}/settings/team-members/groups/${teamMemberGroupId}`
        },
        {
          name: 'Members',
          count: null,
          current: selectedTabKey === 'members',
          href: `${currentWorkspaceId}/settings/team-members/groups/${teamMemberGroupId}/members`
        }
      ]}
      actions={actions}
    />
  );
}

export default TabbedHeading;
