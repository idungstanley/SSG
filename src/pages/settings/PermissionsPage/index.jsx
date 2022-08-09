import React from 'react';
import { Spinner } from '../../../common';
import { SimpleSectionHeading } from '../../../components';
import Breadcrumb from '../components/Breadcrumb';
import Table from './components/Table';

// Features
import {
  useGetPermissionsQuery,
  useGetPermissionValuesQuery,
} from '../../../features/settings/permissions/permissionsApi';

export default function PermissionsPage() {
  const {
    isLoading: isLoadingPermissions,
  } = useGetPermissionsQuery();

  const {
    isLoading: isLoadingPermissionValues,
  } = useGetPermissionValuesQuery();

  return (
    <div className="h-full flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Breadcrumb
        pages={[
          { name: 'Team members', href: '/settings/team-members', current: false },
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

        {(isLoadingPermissions || isLoadingPermissionValues) ? (
          <div className="mx-auto w-6 justify-center">
            <Spinner size={22} color="#0F70B7" />
          </div>
        ) : (
          <Table />
        )}
      </main>
    </div>
  );
}
