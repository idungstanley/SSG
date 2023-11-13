import React, { useState } from 'react';
import SectionArea from '../SectionArea';
import { TbShield } from 'react-icons/tb';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import CopyLink from './components/CopyLink';
import ShareWith from './components/ShareWith';
import { useAppSelector } from '../../../../app/hooks';
import { useGetEntityPermissions } from '../../../../features/workspace/workspaceService';
import AllTemaMembers from './components/AllTemaMembers';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { useGetTeamMemberGroups } from '../../../../features/settings/teamMemberGroups/teamMemberGroupService';
import MakePublicPrivate from './components/MakePublicPrivate';
import { IPermissionsRes } from '../../../../features/workspace/workspace.interfaces';

function Permissions() {
  const [invite, setInvite] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<string>('');

  const { entityForPermissions } = useAppSelector((state) => state.workspace);

  const entityType = entityForPermissions?.type === undefined ? 'hub' : entityForPermissions?.type;

  const { data } = useGetEntityPermissions({
    id: entityForPermissions?.id,
    type: entityForPermissions?.type === undefined ? 'hub' : entityForPermissions?.type
  });

  const { data: teamMembers } = useGetTeamMembers({ page: 0, query: '' });
  const { data: teamMembersGroup } = useGetTeamMemberGroups(0);
  const updatedTeamMemberGroup = teamMembersGroup?.data.team_member_groups.map((i) => {
    return { ...i, user: { ...i.user, avatar_path: null }, role: { key: 'group', name: 'group' } };
  });

  const teamMembersAndGroup = [...(teamMembers?.data.team_members ?? []), ...(updatedTeamMemberGroup ?? [])];

  const filteredTeams = teamMembersAndGroup.filter((i) => {
    return (
      i.name?.includes(searchParams) || i.user.name?.includes(searchParams) || i.user.email?.includes(searchParams)
    );
  });

  return (
    <div className="w-full">
      <SectionArea label="Permissions" icon={<TbShield className="w-4 h-4" />} />
      <div className="bg-alsoit-gray-50 rounded-md  m-auto p-2 mt-2" style={{ width: '98%' }}>
        <h1 className="text-lg font-semibold w-full text-center">Share this Space</h1>
        <h2 className="text-md font-semibold w-full text-center">
          Sharing {entityForPermissions?.name} {entityType} with all views
        </h2>
        <div className="w-full my-4">
          {!invite ? (
            <div
              className="border h-8 flex w-11/12 bg-white m-auto items-center justify-between rounded-md cursor-pointer"
              onClick={() => setInvite(!invite)}
            >
              <span className="ml-2 text-alsoit-text-lg">Invite by name or email</span>
              <button className="bg-alsoit-purple-300 h-full rounded-r-md w-1/6 text-white">Invite</button>
            </div>
          ) : (
            <div className="w-11/12 m-auto h-8 rounded-md flex justify-between items-center bg-white px-2 border border-alsoit-danger shadow-md shadow-alsoit-danger">
              <SearchIcon className="w-4 h-4" />
              <input
                type="text"
                className="w-full h-7 border-0 outline-0 ring-0 focus:border-0 focus:outline-0 focus:ring-0 text-alsoit-text-lg"
                placeholder="Invite by name or email"
                onChange={(e) => setSearchParams(e.target.value)}
                value={searchParams}
              />
              <span
                className="w-4 h-4 p-1 rounded-2xl bg-red-500 text-white text-alsoit-text-sm flex justify-center items-center cursor-pointer"
                onClick={() => {
                  setInvite(!invite);
                  setSearchParams('');
                }}
              >
                x
              </span>
            </div>
          )}
          {invite ? (
            <div>
              {teamMembers && updatedTeamMemberGroup && (
                <AllTemaMembers temaMembersandGroups={filteredTeams} entityPermissions={data as IPermissionsRes} />
              )}
            </div>
          ) : (
            <>
              <div className="w-full my-4">
                <CopyLink />
              </div>
              <div className="w-11/12 m-auto">
                {data && (
                  <ShareWith
                    privateMode={data?.data.is_public === 0 ? false : true}
                    entityPermission={data as IPermissionsRes}
                  />
                )}
              </div>
              <MakePublicPrivate isPublic={data?.data.is_public as number} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Permissions;
