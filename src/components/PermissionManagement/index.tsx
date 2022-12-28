import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useGetDataAccess } from '../../features/permissions/permissionsService';
import SelectMenuTeamMembers from '../selectMenu';
import RemoveAccess from './components/RemoveAccess';
import Wrapper from './components/Wrapper';

export interface ISelectedData {
  id: string;
  name: string;
  email?: string;
  accessLevel: string;
  type: 'member' | 'member-group'
}

export default function PermissionManagement() {
  const { selectedItemId, selectedItemType: type } = useAppSelector((state) => state.explorer);
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
  const membersList = data?.file_members || data?.folder_team_members;
  const selectMembersList = membersList?.map((member) => ({
    id: member.team_member.id,
    name: member.team_member.user.name,
    email: member.team_member.user.email,
    accessLevel: member.access_level.key,
    type: 'member',
  }));

  // groups from data.folder_team_member_groups
  const groupsList = data?.folder_team_member_groups;
  const selectGroupsList = groupsList?.map((group) => ({
    id: group.team_member_group.id,
    name: group.team_member_group.name,
    accessLevel: group.access_level.key,
    type: 'member-group',
  }));

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
          <h2>{`1. View ${type} member access`}</h2>

          {/* select menus */}
          <SelectMenuTeamMembers
            teamMembers={selectMembersList}
            selectedData={selectedData?.type !== 'member-group' ? selectedData : ''}
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
              <div className="flex flex-col justify-between content-center text-sm mt-3 gap-3">
                <RemoveAccess accessLevel={selectedData.accessLevel} setSelectedData={setSelectedData} itemType={selectedData.type} accessToId={selectedData.id} />
              </div>
            </div>
          ) : null}

        </div>
      )}
    </Wrapper>
  );
}

interface ColumnProps {
  title: string;
  value: string;
}

function Column({ title, value }: ColumnProps) {
  return (
    <div className="p-1 font-medium">
      <p>
        {`${title}:`}
        <span className="font-semibold text-indigo-600 pl-1">{value}</span>
      </p>
    </div>
  );
}
