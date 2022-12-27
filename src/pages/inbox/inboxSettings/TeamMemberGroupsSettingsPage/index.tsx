import React from 'react';
import Layout from '../components/Layout';
import SideOver from '../components/SideOver';
// import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setAddInboxTeamMemberGroupSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';
// import Header from '../components/Header';
// import TabbedHeading from '../components/TabbedHeading';
// import Table from './components/Table';
// import { Button, EmptyStateSimple } from '../../../../components';
// import { Spinner } from '../../../../common';
// import AddInboxTeamMemberGroupSlideOver from './components/AddInboxTeamMemberGroupSlideOver';
// import { useGetInboxAccess } from '../../../../features/inbox/inboxSettingsService';

function TeamMemberGroupsSettingsPage() {
  // const dispatch = useDispatch();

  // const { inboxId } = useParams();

  // const { status, data } = useGetInboxAccess(inboxId);

  // const addGroup = () => {
  //   dispatch(setAddInboxTeamMemberGroupSlideOverVisibility(true));
  // };

  return (
    <>
      <Layout isGroups />
      <SideOver isGroups />
      {/* <div className="h-full flex flex-col w-full flex-1 bg-white overflow-hidden">
        <Header />
        <div className="flex-1 h-full flex-col flex overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6">
          <div className="my-10">
            <TabbedHeading
              selectedTabKey="groups"
              actions={(
                <Button
                  buttonStyle="primary"
                  onClick={addGroup}
                  loading={false}
                  label="Add group"
                  width="w-36"
                />
              )}
            />
          </div>

          {status === 'success' && data?.data?.inbox_member_groups?.length !== 0 && (
            <Table />
          )}

          {status === 'loading' && (
            <div className="mx-auto w-6 justify-center">
              <Spinner size={22} color="#0F70B7" />
            </div>
          )}

          {status === 'success' && data?.data?.inbox_member_groups?.length === 0 && (
            <div className="flex flex-1 h-full bg-white">
              <div className="m-auto">
                <EmptyStateSimple
                  title="No groups have been added"
                  description="Add access to the first group"
                  ctaText="Add group"
                  ctaOnClick={addGroup}
                  showCta
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <AddInboxTeamMemberGroupSlideOver /> */}
    </>
  );
}

export default TeamMemberGroupsSettingsPage;
