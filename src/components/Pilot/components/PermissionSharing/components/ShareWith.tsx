import { Disclosure } from '@headlessui/react';
import React, { useState } from 'react';
import { AiFillCaretRight } from 'react-icons/ai';
import Toggle from './Toggle';
import People from './People';
import RoleDropdown from './RoleDropdown';
import ArrowDown from '../../../../../assets/icons/ArrowDown';
import { IPermissionsRes } from '../../../../../features/workspace/workspace.interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useCreateOrEditPermission,
  useMakePulicOrPrivate,
  useRemovePermission
} from '../../../../../features/workspace/workspaceService';
import { useAppSelector } from '../../../../../app/hooks';
import { UseGetHubDetails } from '../../../../../features/hubs/hubService';
import { UseGetWalletDetails } from '../../../../../features/wallet/walletService';
import { UseGetListDetails } from '../../../../../features/list/listService';
import { getOneTaskServices } from '../../../../../features/task/taskService';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';
import { useParams } from 'react-router-dom';
import { ITeamMembersAndGroup } from '../../../../../features/settings/teamMembersAndGroups.interfaces';

interface shareWithProps {
  publicMode: number;
  entityPermission: IPermissionsRes;
  teamsAndGroups: ITeamMembersAndGroup[];
}

function ShareWith({ publicMode, entityPermission, teamsAndGroups }: shareWithProps) {
  const { listId, hubId, walletId } = useParams();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const queryClient = useQueryClient();

  const { entityForPermissions, workspaceData } = useAppSelector((state) => state.workspace);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const currentActiveId = hubId ?? walletId ?? listId;

  const entityType = entityForPermissions
    ? entityForPermissions.type
      ? entityForPermissions.type
      : 'hub'
    : activeItemType;

  const entityId = entityForPermissions ? entityForPermissions.id : activeItemId ?? currentActiveId;

  const teamMembers = [...entityPermission.data.team_members].map((i) => {
    return { ...i, teams: false };
  });
  const teamMembersGroup = entityPermission.data.team_member_groups.map((i) => {
    return { ...i, teams: true };
  });

  const parentTeamMembers = [...(entityPermission?.data?.parent?.team_members ?? [])].map((i) => {
    return { ...i, teams: false };
  });

  const parentGroups =
    entityPermission?.data?.parent?.team_member_groups?.map((i) => {
      return { ...i, teams: true };
    }) || [];

  const allParentTeams = [...parentTeamMembers, ...parentGroups];

  const allTeamsandMembers = [...teamMembers, ...teamMembersGroup];

  const totalInvited = teamMembers.length + teamMembersGroup.length;

  const changePermission = useMutation(useCreateOrEditPermission);

  const removePermissions = useMutation(useRemovePermission, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${entityType}-permissions`, entityId]);
    }
  });

  const handleRemoveAll = async () => {
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
      model: entityType as string,
      model_id: entityId as string,
      teamMemberGroups: groupsArr as { id: string }[]
    });
  };

  const handleSeletRole = async (role: string) => {
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
      model: entityType as string,
      model_id: entityId as string,
      teamMembersArr: teamsArr as { access_level: string; id: string }[],
      teamMemberGroups: groupsArr as { access_level: string; id: string }[]
    });
  };

  const makePrublicoeprivate = useMutation(useMakePulicOrPrivate, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${entityType}-permissions`, entityId]);
    }
  });

  const makePrivateOrPublic = async (enabled: boolean) => {
    await makePrublicoeprivate.mutateAsync({
      model: entityType as string,
      model_id: entityId as string,
      route: enabled ? 'public' : 'private'
    });
  };

  const { parent_id, parent_type, parent } = entityPermission.data;

  const { data: hub } = UseGetHubDetails({
    activeItemId: parent_id,
    activeItemType: parent_type
  });
  const { data: wallet } = UseGetWalletDetails({
    activeItemId: parent_id,
    activeItemType: parent_type
  });
  const { data: list } = UseGetListDetails(parent_type === EntityType.list ? parent_id : null);

  const { data: task } = getOneTaskServices({ task_id: parent_type === EntityType.task ? parent_id : null });

  const parent_name =
    hub?.data.hub.name ??
    wallet?.data.wallet.name ??
    list?.data.list.name ??
    task?.data.task.name ??
    workspaceData?.data.workspace.name;

  return (
    <div className="w-full">
      <h1>Share With</h1>
      <div className="mt-2">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex items-center justify-between py-2 rounded-md hover:bg-alsoit-gray-75">
                {publicMode === 1 ? (
                  <Disclosure.Button className="flex items-center justify-between w-full gap-2 text-sm font-medium text-left text-purple-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                    <div className="flex items-center gap-2">
                      <AiFillCaretRight className={`${open ? 'rotate-90 transform' : ''} h-3 w-3`} />
                      <span>{parent_name}</span>
                    </div>
                  </Disclosure.Button>
                ) : (
                  <button className="flex items-center justify-between w-full gap-2 text-sm font-medium text-left text-purple-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                    <div className="flex items-center gap-2">
                      <AiFillCaretRight className={'h-3 w-3 text-alsoit-gray-75'} />
                      <span>{parent_name}</span>
                    </div>
                  </button>
                )}
                <div>
                  <Toggle handleToggle={makePrivateOrPublic} isEnabled={publicMode === 1 ? true : false} />
                </div>
              </div>
              {publicMode === 1 && (
                <Disclosure.Panel className="text-sm text-gray-500">
                  {parent && (
                    <h3 className="my-2 text-alsoit-text-lg">
                      {allParentTeams.length} {allParentTeams.length > 1 ? 'person' : 'people'}
                    </h3>
                  )}

                  {parent && (
                    <div>
                      {allParentTeams.map((team) => {
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
                  )}
                  {!parent && (
                    <div>
                      {teamsAndGroups.map((team) => {
                        return <People key={team.id} teamMember={team} showToggle={false} enabled={false} />;
                      })}
                    </div>
                  )}
                </Disclosure.Panel>
              )}
            </>
          )}
        </Disclosure>
      </div>
      <div>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center justify-between w-full gap-2 py-2 text-sm font-medium text-left text-purple-900 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 hover:bg-alsoit-gray-75">
                <div className="flex items-center gap-2">
                  <AiFillCaretRight className={`${open ? 'rotate-90 transform' : ''} h-3 w-3`} />
                  <span>People</span>
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className="flex justify-between w-full">
                  <h3 className="my-2 text-alsoit-text-lg">
                    {totalInvited} {totalInvited > 1 ? 'people invited' : 'person invited'}
                  </h3>
                  {totalInvited > 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        className="text-alsoit-text-lg rounded flex justify-center items-center gap-0.5"
                        onClick={(e) => setAnchor(e.currentTarget)}
                      >
                        Edit all <ArrowDown className="w-2 h-2" />
                      </button>
                      <button
                        className="flex items-center justify-center rounded text-alsoit-text-lg text-alsoit-danger"
                        onClick={handleRemoveAll}
                      >
                        Remove all
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  {allTeamsandMembers.map((team) => {
                    if (team.team_member || team.team_member_groups) {
                      return (
                        <People
                          key={team.team_member?.id ?? team.team_member_groups?.id}
                          teamMember={team.team_member}
                          showToggle={false}
                          enabled={false}
                          role={team.access_level}
                        />
                      );
                    }
                  })}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <RoleDropdown anchor={anchor} setAnchor={setAnchor} handleSeletRole={handleSeletRole} />
      </div>
    </div>
  );
}

export default ShareWith;
