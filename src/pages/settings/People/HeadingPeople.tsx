import React from 'react';
import { SimpleSectionHeading } from '../../../components';
import SearchInput from '../../../components/SearchInput';
import { setTeamMembersSearchQuery } from '../../../features/settings/teamMembers/teamMemberSlice';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';

export default function HeadingPeople() {
  const { teamMembersPaginationPage, teamMembersSearchQuery } = useAppSelector((state) => state.teamMember);
  const dispatch = useDispatch();

  const { status } = useGetTeamMembers({
    page: teamMembersPaginationPage,
    query: teamMembersSearchQuery
  });

  const onChange = (value: string) => {
    dispatch(setTeamMembersSearchQuery(value));
  };
  return (
    <div className="my-10">
      <SimpleSectionHeading
        title="Invited People"
        description="Manage all People on this workspace"
        actions={
          <SearchInput
            loading={status === 'loading'}
            placeholder="Search people"
            value={teamMembersSearchQuery}
            onChange={onChange}
          />
        }
      />
    </div>
  );
}
