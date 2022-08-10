import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { SectionHeadingWithTabs } from '../../../../../components';

function TabbedHeading({ selectedTabKey, actions }) {
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

TabbedHeading.defaultProps = {
  actions: null,
};

TabbedHeading.propTypes = {
  selectedTabKey: PropTypes.string.isRequired,
  actions: PropTypes.element,
};
