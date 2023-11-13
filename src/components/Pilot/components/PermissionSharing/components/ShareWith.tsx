import { Disclosure } from '@headlessui/react';
import React, { useState } from 'react';
import { AiFillCaretRight } from 'react-icons/ai';
import Toggle from './Toggle';
import People from './People';
import RoleDropdown from './RoleDropdown';
import ArrowDown from '../../../../../assets/icons/ArrowDown';
import { IPermissionsRes } from '../../../../../features/workspace/workspace.interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCreateOrEditPermission, useRemovePermission } from '../../../../../features/workspace/workspaceService';
import { useAppSelector } from '../../../../../app/hooks';

function ShareWith({ privateMode, entityPermission }: { privateMode: boolean; entityPermission: IPermissionsRes }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const queryClient = useQueryClient();

  const { entityForPermissions } = useAppSelector((state) => state.workspace);

  const teamMembers = [...entityPermission.data.team_members].map((i) => {
    return { ...i, teams: false };
  });
  const teamMembersGroup = entityPermission.data.team_member_groups.map((i) => {
    return { ...i, teams: true };
  });

  const allTeamsandMembers = [...teamMembers, ...teamMembersGroup];

  const totalInvited = teamMembers.length + teamMembersGroup.length;

  const changePermission = useMutation(useCreateOrEditPermission);

  const removePermissions = useMutation(useRemovePermission, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${entityForPermissions?.type ?? 'hub'}-permissions`, entityForPermissions?.id]);
    }
  });

  const handleToggle = (enabled: boolean) => {
    if (enabled) return 'To be implemented';
  };

  const handleRemoveAll = async () => {
    const model = entityForPermissions?.type ? entityForPermissions.type : 'hub';
    const model_id = entityForPermissions?.id;
    const teamsArr = allTeamsandMembers
      .map((item) => {
        if (!item.teams) {
          return { id: item.team_member?.id as string };
        }
      })
      .filter((item) => item !== undefined);
    const groupsArr = allTeamsandMembers
      .map((item) => {
        if (!item.teams) {
          return { id: item.team_member?.id as string };
        }
      })
      .filter((item) => item !== undefined);
    await removePermissions.mutateAsync({
      teamMembers: teamsArr as { id: string }[],
      model,
      model_id: model_id as string,
      teamMemberGroups: groupsArr as { id: string }[]
    });
  };

  const handleSeletRole = async (role: string) => {
    const model = entityForPermissions?.type ? entityForPermissions.type : 'hub';
    const model_id = entityForPermissions?.id;
    const teamsArr = allTeamsandMembers.map((item) => {
      if (!item.teams) {
        return { access_level: role.toLowerCase(), id: item.team_member?.id as string };
      }
    });
    const groupsArr = allTeamsandMembers
      .map((item) => {
        if (!item.teams) {
          return { access_level: role.toLowerCase(), id: item.team_member?.id as string };
        }
      })
      .filter((item) => item !== undefined);
    await changePermission.mutateAsync({
      model,
      model_id: model_id as string,
      teamMembersArr: teamsArr as { access_level: string; id: string }[],
      teamMemberGroups: groupsArr as { access_level: string; id: string }[]
    });
  };

  return (
    <div className="w-full">
      <h1>Share With</h1>
      <div className="mt-2">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex justify-between items-center  py-2 hover:bg-alsoit-gray-75 rounded-md">
                <Disclosure.Button className="flex w-full justify-between items-center gap-2 text-left text-sm font-medium text-purple-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <div className="flex gap-2 items-center">
                    <AiFillCaretRight className={`${open ? 'rotate-90 transform' : ''} h-3 w-3`} />
                    <span>New Hub</span>
                  </div>
                </Disclosure.Button>
                <div>
                  <Toggle handleToggle={handleToggle} isEnabled={false} />
                </div>
              </div>
              <Disclosure.Panel className="text-sm text-gray-500">
                {/* // To be removed */}
                <h3 className="text-alsoit-text-lg my-2">
                  {allTeamsandMembers.length} {allTeamsandMembers.length > 1 ? 'person invited' : 'people invited'}
                </h3>
                <div>
                  <h4>To be implemented</h4>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      <div>
        {privateMode && (
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center gap-2 text-left text-sm font-medium text-purple-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 py-2 hover:bg-alsoit-gray-75 rounded-md">
                  <div className="flex gap-2 items-center">
                    <AiFillCaretRight className={`${open ? 'rotate-90 transform' : ''} h-3 w-3`} />
                    <span>People</span>
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <div className="w-full flex justify-between">
                    <h3 className="text-alsoit-text-lg my-2">
                      {totalInvited} {totalInvited > 1 ? 'people invited' : 'person invited'}
                    </h3>
                    <div className="flex gap-2 items-center">
                      <button
                        className="text-alsoit-text-lg rounded flex justify-center items-center gap-0.5"
                        onClick={(e) => setAnchor(e.currentTarget)}
                      >
                        Edit all <ArrowDown className="w-2 h-2" />
                      </button>
                      <button
                        className="text-alsoit-text-lg text-alsoit-danger rounded flex justify-center items-center"
                        onClick={handleRemoveAll}
                      >
                        Remove all
                      </button>
                    </div>
                  </div>
                  <div>
                    {allTeamsandMembers.map((team) => {
                      return (
                        <People
                          key={team.team_member?.id ?? team.team_member_groups?.id}
                          teamMember={team.team_member}
                          showToggle={false}
                          enabled={false}
                          role={team.access_level}
                        />
                      );
                    })}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )}

        <RoleDropdown anchor={anchor} setAnchor={setAnchor} handleSeletRole={handleSeletRole} />
      </div>
    </div>
  );
}

export default ShareWith;
