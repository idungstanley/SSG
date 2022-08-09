import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAddInboxTeamMemberSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';
import { Button, EmptyStateSimple } from '../../../../components';
import { Spinner } from '../../../../common';
import Header from '../components/Header';
import TabbedHeading from '../components/TabbedHeading';
import Table from './components/Table';
import AddInboxTeamMemberSlideOver from './components/AddInboxTeamMemberSlideOver';
import { useGetInboxAccess } from '../../../../features/inbox/inboxSettingsService';

function TeamMembersSettingsPage() {
  const dispatch = useDispatch();
  const { inboxId } = useParams();
  const { data, status } = useGetInboxAccess(inboxId);

  const addMember = () => {
    dispatch(setAddInboxTeamMemberSlideOverVisibility(true));
  };

  return (
    <>
      <div className="h-full flex flex-col w-full flex-1 bg-white overflow-hidden">
        <Header />
        <div className="flex-1 flex flex-col h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6">
          <div className="my-10">
            <TabbedHeading
              selectedTabKey="members"
              actions={(
                <Button
                  buttonStyle="primary"
                  onClick={addMember}
                  loading={false}
                  label="Add member"
                  width="w-36"
                />
              )}
            />
          </div>

          {status === 'success' && data?.data?.inbox_members?.length !== 0 && (
            <Table />
          )}

          {status === 'loading' && (
            <div className="mx-auto w-6 justify-center">
              <Spinner size={22} color="#0F70B7" />
            </div>
          )}

          {status === 'success' && data?.data?.inbox_members?.length === 0 && (
            <div className="flex flex-1 h-full bg-white">
              <div className="m-auto">
                <EmptyStateSimple
                  title="No members have been added"
                  description="Add access to the first member"
                  ctaText="Add member"
                  ctaOnClick={addMember}
                  showCta
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <AddInboxTeamMemberSlideOver />
    </>
  );
}

export default TeamMembersSettingsPage;
