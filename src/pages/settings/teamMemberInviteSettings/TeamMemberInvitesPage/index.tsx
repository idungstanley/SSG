import React from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from '../../../../common';
import { SimpleSectionHeading, Button, EmptyStateSimple } from '../../../../components';
// import Breadcrumb from '../../components/Breadcrumb';
import Table from './components/Table';
import InviteTeamMemberSlideOver from './components/InviteTeamMemberSlideOver';
import { setInviteTeamMemberSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';
import { useGetTeamMemberInvites } from '../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import { useAppSelector } from '../../../../app/hooks';

export default function TeamMemberInvitesPage() {
  const dispatch = useDispatch();

  const { teamMemberInvitesPaginationPage } = useAppSelector((state) => state.teamMemberInvite);

  const { status, data } = useGetTeamMemberInvites(teamMemberInvitesPaginationPage);

  const showInviteTeamMemberSlideOver = () => {
    dispatch(setInviteTeamMemberSlideOverVisibility(true));
  };

  return (
    <div className="h-full flex-1 flex flex-col overflow-hidden bg-gray-50">
      <main className="flex-1 flex flex-col h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6">
        <div className="my-10">
          <SimpleSectionHeading
            title="Team member invites"
            description="Manage all team member invites for your workspace"
            actions={
              <Button
                buttonStyle="primary"
                onClick={showInviteTeamMemberSlideOver}
                loading={false}
                label="Invite team member"
                width={50}
              />
            }
          />
        </div>

        {status === 'loading' && (
          <div className="mx-auto w-6 justify-center">
            <Spinner size={8} color="#0F70B7" />
          </div>
        )}

        {status === 'success' && data.data.team_member_invites.length === 0 && (
          <div className="flex flex-1 h-full">
            <div className="m-auto">
              <EmptyStateSimple
                title="Send your first invite"
                description="Invite team members to your workspace"
                ctaText="Invite"
                ctaOnClick={() => dispatch(setInviteTeamMemberSlideOverVisibility(true))}
                showCta
              />
            </div>
          </div>
        )}

        {status === 'success' && data.data.team_member_invites.length !== 0 && <Table />}
      </main>

      <InviteTeamMemberSlideOver />
    </div>
  );
}
