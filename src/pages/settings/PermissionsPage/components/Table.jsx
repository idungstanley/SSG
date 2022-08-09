/* eslint-disable */
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { permissionsSelectors, permissionValuesSelectors } from '../../../../features/settings/permissions/permissionsSlice';
import {
  useChangeRolePermissionMutation,
  useGetPermissionsQuery,
  useGetPermissionValuesQuery,
} from '../../../../features/settings/permissions/permissionsApi';
import { Spinner, Tooltip } from '../../../../common';
import { Checkbox } from '../../../../components';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Table() {
  const dispatch = useDispatch();

  const permissions = useSelector(permissionsSelectors.selectAll);
  const permissionValues = useSelector(permissionValuesSelectors.selectAll);

  const [permissionsByCategory, setPermissionsByCategory] = useState([]);

  const updatingWorkspacePermissionKey = useSelector((state) => state.permissions.updatingWorkspacePermissionKey);
  const updatingTeamMemberRoleKey = useSelector((state) => state.permissions.updatingTeamMemberRoleKey);

  const [changeRolePermission, { isLoading: isChangingRolePermission }] = useChangeRolePermissionMutation();

  const {
    isLoading: isLoadingPermissions,
  } = useGetPermissionsQuery();

  const {
    isLoading: isLoadingPermissionValues,
  } = useGetPermissionValuesQuery();

  useEffect(() => {
    const permissionsByCategory = permissions.reduce((permissionsByCategorySoFar, currentPermission) => {
      if (!permissionsByCategorySoFar[currentPermission.workspace_permission_category.key]) permissionsByCategorySoFar[currentPermission.workspace_permission_category.key] = {
        name: currentPermission.workspace_permission_category.name,
        key: currentPermission.workspace_permission_category.key,
        permissions: [],
      };
      permissionsByCategorySoFar[currentPermission.workspace_permission_category.key].permissions.push(currentPermission);
      return permissionsByCategorySoFar;
    }, {});
    setPermissionsByCategory(permissionsByCategory);
  }, [permissions]);

  const changeRole = (teamMemberRoleKey, permissionKey) => {
    if (isChangingRolePermission){
        return false;
    }

    changeRolePermission({
      teamMemberRoleKey: teamMemberRoleKey,
      workspacePermissionKey: permissionKey,
      isPermissionAllowed: isRoleChecked(teamMemberRoleKey, permissionKey) ? 0 : 1,
    });
  }

  const isRoleChecked = (teamMemberRoleKey, permissionKey) => {
    const id = `${permissionKey}|${teamMemberRoleKey}`;

    const results = permissionValues.filter((item) => item.id == id);
    if (results.length == 0){
        return false;
    }
    return results[0].value;
  }

  const isRoleEnabled = (teamMemberRoleKey, permissionKey) => {
    const id = `${permissionKey}|${teamMemberRoleKey}`;

    const results = permissionValues.filter((item) => item.id == id);
    if (results.length == 0){
        return true;
    }
    return results[0].can_be_changed;
  }

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-6">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-6">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-white">
                  <tr>
                    <th scope="col" className="py-6 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Capability
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Guest
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Low
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      High
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Admin
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Owner
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {Object.keys(permissionsByCategory).map((key, index) => (
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
                      {permissionsByCategory[key].permissions.map((permission, index) => (
                        <tr
                          key={permission.key}
                          className={classNames(index === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                        >
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            <div className="flex flex-row z-50">
                              {permission.name}
                              {permission.description !== null && (
                                <Tippy content={<span>{permission.description}</span>} maxWidth={250}>
                                  <span>
                                    <QuestionMarkCircleIcon className="ml-2 h-5 w-5 text-gray-400 hover:text-black" aria-hidden="true" />
                                  </span>
                                </Tippy>
                              )}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <Checkbox
                              checked={isRoleChecked('guest', permission.key)}
                              onChange={() => changeRole('guest', permission.key)}
                              size={6}
                              loading={updatingWorkspacePermissionKey === permission.key && updatingTeamMemberRoleKey === 'guest'}
                              disabled={!isRoleEnabled('guest', permission.key) || isLoadingPermissionValues}
                              spinnerSize={20}
                            />
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <Checkbox
                              checked={isRoleChecked('low', permission.key)}
                              onChange={() => changeRole('low', permission.key)}
                              size={6}
                              loading={updatingWorkspacePermissionKey === permission.key && updatingTeamMemberRoleKey === 'low'}
                              disabled={!isRoleEnabled('low', permission.key) || isLoadingPermissionValues}
                              spinnerSize={20}
                            />
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <Checkbox
                              checked={isRoleChecked('high', permission.key)}
                              onChange={() => changeRole('high', permission.key)}
                              size={6}
                              loading={updatingWorkspacePermissionKey === permission.key && updatingTeamMemberRoleKey === 'high'}
                              disabled={!isRoleEnabled('high', permission.key) || isLoadingPermissionValues}
                              spinnerSize={20}
                            />
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <Checkbox
                              checked={isRoleChecked('admin', permission.key)}
                              onChange={() => changeRole('admin', permission.key)}
                              size={6}
                              loading={updatingWorkspacePermissionKey === permission.key && updatingTeamMemberRoleKey === 'admin'}
                              disabled={!isRoleEnabled('admin', permission.key) || isLoadingPermissionValues}
                              spinnerSize={20}
                            />
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <Checkbox
                              checked={isRoleChecked('owner', permission.key)}
                              onChange={() => changeRole('owner', permission.key)}
                              size={6}
                              loading={updatingWorkspacePermissionKey === permission.key && updatingTeamMemberRoleKey === 'owner'}
                              disabled={!isRoleEnabled('owner', permission.key) || isLoadingPermissionValues}
                              spinnerSize={20}
                            />
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
