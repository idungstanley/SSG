import React from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../../../common';
import Header from '../components/Header';
import TabbedHeading from '../components/TabbedHeading';
import Form from './components/Form';
import { useGetInboxAccess } from '../../../../features/inbox/inboxSettingsService';

function PermissionsSettingsPage() {
  const { inboxId } = useParams();
  const { status } = useGetInboxAccess(inboxId);

  return (
    <div className="h-full flex flex-col w-full flex-1 bg-white overflow-hidden">
      <Header />
      <div className="flex-1 h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6">
        <div className="my-10">
          <TabbedHeading selectedTabKey="permissions" />
        </div>

        {status === 'loading' ? (
          <div className="mx-auto w-6 justify-center">
            <Spinner size={22} color="#0F70B7" />
          </div>
        ) : (
          <Form />
        )}
      </div>
    </div>
  );
}

export default PermissionsSettingsPage;
