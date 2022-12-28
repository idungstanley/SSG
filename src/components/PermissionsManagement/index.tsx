import React, { useState } from 'react';
import SelectAndDisplayData from './components/SelectAndDisplayData';
import AddAccess from './components/AddAccess';
import RemoveAccess from './components/RemoveAccess';
import ChangeAccessLevel from './components/ChangeAccessLevel';
import { useGetDataPermissions } from '../../features/permissions/permissionsService';
import Wrapper from './components/Wrapper';
import { IInboxMember } from '../../features/inbox/inbox.interfaces';
import { useAppSelector } from '../../app/hooks';

interface PermissionsManagementProps {
  type: 'folder' | 'file';
}

export interface ISelectedUser {
  name: string;
  value: string;
  accessLevel: string;
  id: string;
}

function PermissionsManagement({
  type,
}: PermissionsManagementProps) {
  const { selectedItemId } = useAppSelector((state) => state.explorer);

  const [showPopup, setShowPopup] = useState(false);
  const { data, status, refetch } = useGetDataPermissions(selectedItemId, type);

  const [selectedUser, setSelectedUser] = useState<ISelectedUser | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<ISelectedUser | null>(
    null
  );

  const teamMemberData = selectedUser
    ? [
        {
          id: 1,
          title: 'Name:',
          value: selectedUser.name,
        },
        {
          id: 2,
          title: 'Email:',
          value: selectedUser.value,
        },
        {
          id: 3,
          title: 'Access level:',
          value: selectedUser.accessLevel,
        },
      ]
    : null;

  const groupData = selectedGroup
    ? [
        {
          id: 1,
          title: 'Name:',
          value: selectedGroup.name,
        },
        {
          id: 2,
          title: 'Initials:',
          value: selectedGroup.value,
        },
        {
          id: 3,
          title: 'Access level:',
          value: selectedGroup.accessLevel,
        },
      ]
    : null;

  const hidePopup = () => {
    setShowPopup(false);
    setSelectedGroup(null);
    setSelectedUser(null);
  };

  const usersList = data
    ? type === 'folder'
      ? data
      : data.file_members
    : null;

  if (status === 'error') {
    return (
      <Wrapper
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        hidePopup={hidePopup}
      >
        <p>You don&apos;t have access to it</p>
        <button
          className="border p-2 rounded-xl text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300"
          type="button"
          onClick={hidePopup}
        >
          Ok
        </button>
      </Wrapper>
    );
  }

  const teamMembers: IInboxMember[] =
    type === 'folder' ? data?.folder_team_members : data?.file_members;

  return (
    <Wrapper
      setShowPopup={setShowPopup}
      showPopup={showPopup}
      hidePopup={hidePopup}
    >
      {status === 'success' ? (
        <>
          <button
            type="button"
            onClick={hidePopup}
            className="flex w-full justify-end"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-col gap-3">
            <h2>{`1. View ${type} access`}</h2>
            {type === 'folder' ? (
              <>
                {usersList ? (
                  <SelectAndDisplayData
                    usersList={usersList.folder_team_members}
                    selectedData={selectedUser}
                    setSelectedData={setSelectedUser}
                    columnsData={teamMemberData}
                    type="user"
                    title="Select team member:"
                  >
                    {selectedUser && (
                      <>
                        <RemoveAccess
                          type={type}
                          refetch={refetch}
                          selectedUser={selectedUser}
                          setSelectedUser={setSelectedUser}
                        />
                        <ChangeAccessLevel
                          type={type}
                          refetch={refetch}
                          selectedUserId={selectedUser.id}
                          setSelectedUser={setSelectedUser}
                          actualAccess={selectedUser.accessLevel}
                        />
                      </>
                    )}
                  </SelectAndDisplayData>
                ) : null}
                {usersList ? (
                  <SelectAndDisplayData
                    usersList={usersList.folder_team_member_groups}
                    selectedData={selectedGroup}
                    setSelectedData={setSelectedGroup}
                    columnsData={groupData}
                    type="group"
                    title="Select team members group:"
                  />
                ) : null}
              </>
            ) : usersList ? (
              <SelectAndDisplayData
                usersList={usersList}
                selectedData={selectedUser}
                setSelectedData={setSelectedUser}
                columnsData={teamMemberData}
                type="user"
                title="Select team member:"
              >
                {selectedUser ? (
                  <RemoveAccess
                    type={type}
                    refetch={refetch}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                  />
                ) : null}
                {selectedUser ? (
                  <ChangeAccessLevel
                    type={type}
                    refetch={refetch}
                    selectedUserId={selectedUser.id}
                    setSelectedUser={setSelectedUser}
                    actualAccess={selectedUser.accessLevel}
                  />
                ) : null}
              </SelectAndDisplayData>
            ) : null}
          </div>
          <AddAccess
            type={type}
            setShowPopup={setShowPopup}
            refetch={refetch}
            activeMembers={[...teamMembers.map((i) => i.team_member.user.id)]}
          />
        </>
      ) : null}
    </Wrapper>
  );
}

export default PermissionsManagement;
