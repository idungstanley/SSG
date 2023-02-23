import React, { Fragment, useEffect, useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { useGetPermissionsList } from '../../../../features/settings/permissions/permissionsService';
import PermissionsCheckbox from './PermissionsCheckbox';
import { classNames } from '../../../../utils';

export default function Table() {
  const [permissionsByCategory, setPermissionsByCategory] = useState([]);

  const { data: permissionsList, status: permissionsListStatus } =
    useGetPermissionsList();

  useEffect(() => {
    if (permissionsListStatus !== 'success') {
      return setPermissionsByCategory([]);
    }

    const permissionsByCategoryTemp = permissionsList.reduce(
      (permissionsByCategorySoFar, currentPermission) => {
        if (
          !permissionsByCategorySoFar[
            currentPermission.workspace_permission_category.key
          ]
        ) {
          permissionsByCategorySoFar[
            currentPermission.workspace_permission_category.key
          ] = {
            name: currentPermission.workspace_permission_category.name,
            key: currentPermission.workspace_permission_category.key,
            permissions: [],
          };
        }
        permissionsByCategorySoFar[
          currentPermission.workspace_permission_category.key
        ].permissions.push(currentPermission);
        return permissionsByCategorySoFar;
      },
      {}
    );
    setPermissionsByCategory(permissionsByCategoryTemp);

    return true;
  }, [permissionsList, permissionsListStatus]);

  return (
    <div className="flex flex-col -my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-6">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-6">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="py-6 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Capability
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Guest
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Low
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  High
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Admin
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Owner
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {Object.keys(permissionsByCategory).map((key) => (
                <Fragment key={permissionsByCategory[key].key}>
                  <tr className="border-t border-gray-200">
                    <th
                      colSpan={5}
                      scope="colgroup"
                      className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                    >
                      {permissionsByCategory[key].name}
                    </th>
                  </tr>
                  {permissionsByCategory[key].permissions.map(
                    (permission, index) => (
                      <tr
                        key={permission.key}
                        className={classNames(
                          index === 0 ? 'border-gray-300' : 'border-gray-200',
                          'border-t'
                        )}
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <div className="flex flex-row z-50">
                            {permission.name}
                            {permission.description !== null && (
                              <span title={permission.description}>
                                <QuestionMarkCircleIcon
                                  className="ml-2 h-5 w-5 text-gray-400 hover:text-black"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <PermissionsCheckbox
                            teamMemberRoleKey="guest"
                            workspacePermissionKey={permission.key}
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <PermissionsCheckbox
                            teamMemberRoleKey="low"
                            workspacePermissionKey={permission.key}
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <PermissionsCheckbox
                            teamMemberRoleKey="high"
                            workspacePermissionKey={permission.key}
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <PermissionsCheckbox
                            teamMemberRoleKey="admin"
                            workspacePermissionKey={permission.key}
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <PermissionsCheckbox
                            teamMemberRoleKey="owner"
                            workspacePermissionKey={permission.key}
                          />
                        </td>
                      </tr>
                    )
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
