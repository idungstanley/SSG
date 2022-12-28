import React, { useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useGetDataAccess } from '../../features/permissions/permissionsService';
import SelectMenuTeamMembers from '../selectMenu';
import AddAccess from './components/AddAccess';
import ChangeAccess from './components/ChangeAccess';
import Column from './components/Column';
import RemoveAccess from './components/RemoveAccess';
import Wrapper from './components/Wrapper';

export interface ISelectedData {
  id: string;
  name: string;
  email?: string;
  accessLevel: string;
  type: 'member' | 'member-group';
}

export default function PermissionManagement() {
  const { selectedItemId, selectedItemType: type } = useAppSelector(
    (state) => state.explorer
  );
  const { data, status } = useGetDataAccess(selectedItemId, type);

  const [selectedData, setSelectedData] = useState<ISelectedData | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const managePopup = (type: 'show' | 'hide') => {
    setShowPopup(type === 'show');

    if (type === 'hide') {
      setSelectedData(null);
    }
  };

  // members from data.file_members || data.folder_team_members
  const membersList = useMemo(
    () => data?.file_members || data?.folder_team_members,
    [data]
  );
  const selectMembersList = useMemo(
    () =>
      membersList?.map((member) => ({
        id: member.team_member.id,
        name: member.team_member.user.name,
        email: member.team_member.user.email,
        accessLevel: member.access_level.key,
        type: 'member',
      })),
    [membersList]
  );

  // groups from data.folder_team_member_groups
  const groupsList = useMemo(() => data?.folder_team_member_groups, [data]);
  const selectGroupsList = useMemo(
    () =>
      groupsList?.map((group) => ({
        id: group.team_member_group.id,
        name: group.team_member_group.name,
        accessLevel: group.access_level.key,
        type: 'member-group',
      })),
    [groupsList]
  );

  const actualMemberIds =
    membersList?.map((i) => i.team_member.id).filter((i) => i) || [];
  const actualGroupIds =
    groupsList?.map((i) => i.team_member_group.id).filter((i) => i) || [];

  return (
    <Wrapper showPopup={showPopup} managePopup={managePopup}>
      {status === 'error' ? (
        <>
          <p>You don&apos;t have access to it</p>
          <button
            className="border p-2 rounded-xl text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300"
            type="button"
            onClick={() => managePopup('hide')}
          >
            Ok
          </button>
        </>
      ) : status === 'loading' ? (
        <></>
      ) : (
        <div className="flex flex-col gap-3">
          <h2>{`View ${type} member access`}</h2>

          {/* select menus */}
          <SelectMenuTeamMembers
            teamMembers={selectMembersList}
            selectedData={
              selectedData?.type !== 'member-group' ? selectedData : ''
            }
            setSelectedData={setSelectedData}
            title="Select team member:"
          />
          {selectGroupsList ? (
            <SelectMenuTeamMembers
              teamMembers={selectGroupsList}
              selectedData={selectedData?.type !== 'member' ? selectedData : ''}
              setSelectedData={setSelectedData}
              title="Select team member group:"
            />
          ) : null}

          {/* displaying selected data */}
          {selectedData ? (
            <div className="border border-indigo-400 rounded-xl p-2 mt-2 font-medium">
              <Column title="Name" value={selectedData.name} />
              {selectedData.email ? (
                <Column title="Email" value={selectedData.email} />
              ) : null}
              <Column title="Access level" value={selectedData.accessLevel} />

              {/* remove / change access */}
              <div className="flex flex-col justify-between content-center text-sm mt-3 gap-3">
                <RemoveAccess
                  accessLevel={selectedData.accessLevel}
                  setSelectedData={setSelectedData}
                  itemType={selectedData.type}
                  accessToId={selectedData.id}
                />
                <ChangeAccess
                  actualAccess={selectedData.accessLevel}
                  setSelectedData={setSelectedData}
                  itemType={selectedData.type}
                  accessToId={selectedData.id}
                />
              </div>
            </div>
          ) : null}

          {/* add access */}
          <AddAccess itemType="member" actualDataIds={actualMemberIds} />
          {type === 'folder' ? (
            <AddAccess itemType="member-group" actualDataIds={actualGroupIds} />
          ) : null}
        </div>
      )}
    </Wrapper>
  );
}
