import React from 'react';
import { Spinner } from '../../../common';
import { SimpleSectionHeading } from '../../../components';
import Breadcrumb from '../components/Breadcrumb';
import Table from './components/Table.jsx';
import {
  useGetPermissionsList,
  useGetPermissionsValues,
} from '../../../features/settings/permissions/permissionsService';

export default function PermissionsPage() {
  const { status: permissionsListStatus } = useGetPermissionsList();
  const { status: permissionsValuesStatus } = useGetPermissionsValues();

  return (
    <div className="h-full flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Breadcrumb
        pages={[
          {
            name: 'Team members',
            href: '/settings/team-members',
            current: false,
          },
          { name: 'Permissions', href: '/settings/permissions', current: true },
        ]}
      />
      <main className="flex-1 h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6">
        <div className="my-10">
          <SimpleSectionHeading
            title="Permissions"
            description="Manage permissions individually for each team member role"
          />
        </div>

        {permissionsValuesStatus === 'loading' ||
        permissionsListStatus === 'loading' ? (
          <div className="mx-auto w-6 justify-center">
            <Spinner size={8} color="#0F70B7" />
          </div>
        ) : (
          <Table />
        )}
      </main>
    </div>
  );
}
