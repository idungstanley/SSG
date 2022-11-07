/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
/* eslint react/jsx-wrap-multilines: 0 */
/* eslint react/jsx-closing-tag-location: 0 */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import SelectAndDisplayData from './components/SelectAndDisplayData';
import AddAccess from './components/AddAccess';
import RemoveAccess from './components/RemoveAccess';
import ChangeAccessLevel from './components/ChangeAccessLevel';
import { useGetDataPermissions } from '../../features/permissions/permissionsService';

function Wrapper({
  children,
  setShowPopup,
  showPopup,
  hidePopup,
}) {
  return (
    <>
      <p onClick={() => setShowPopup(true)} className='text-right text-gray-600 underline cursor-pointer'>Manage permissions</p>
      {showPopup ? (
        <>
          <div className='fixed left-0 right-0 bottom-0 top-0 bg-black opacity-0' tabIndex={0} role='button' onClick={hidePopup} onKeyDown={() => {}}> </div>
          <div role='document' className='absolute top-0 right-0 w-80 bg-white m-2 rounded-xl border p-3 flex flex-col z-10 gap-3'>
            {children}
          </div>
        </>) : null}
    </>
  );
}

Wrapper.defaultProps = {
  children: <> </>,
};

Wrapper.propTypes = {
  setShowPopup: PropTypes.func.isRequired,
  showPopup: PropTypes.bool.isRequired,
  hidePopup: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

function PermissionsManagement({ selectedDataId, type }) {
  const [showPopup, setShowPopup] = useState(false);
  const { data, status, refetch } = useGetDataPermissions(selectedDataId, type);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const teamMemberData = selectedUser ? [
    {
      id: 1,
      title: 'Name:',
      value: selectedUser.team_member.user.name,
    },
    {
      id: 2,
      title: 'Email:',
      value: selectedUser.team_member.user.email,
    },
    {
      id: 3,
      title: 'Access level:',
      value: selectedUser.access_level.name,
    },
  ] : null;

  const groupData = selectedGroup ? [
    {
      id: 1,
      title: 'Name:',
      value: selectedGroup.team_member_group.name,
    },
    {
      id: 2,
      title: 'Initials:',
      value: selectedGroup.team_member_group.initials,
    },
    {
      id: 3,
      title: 'Access level:',
      value: selectedGroup.access_level.name,
    },
  ] : null;

  const hidePopup = () => {
    setShowPopup(false);
    setSelectedGroup(null);
    setSelectedUser(null);
  };

  const usersList = data ? (type === 'folder' ? data : data.file_members) : null;

  if (status === 'error') {
    return (
      <Wrapper setShowPopup={setShowPopup} showPopup={showPopup} hidePopup={hidePopup}>
        <p>You don&apos;t have access to it</p>
        <button
          className='border p-2 rounded-xl text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300'
          type='button'
          onClick={hidePopup}
        >
          Ok
        </button>
      </Wrapper>
    );
  }

  const teamMembers = type === 'folder' ? data?.folder_team_members : data?.file_members;

  return (
    <Wrapper setShowPopup={setShowPopup} showPopup={showPopup} hidePopup={hidePopup}>
      {status === 'success' ? (
        <>
          <button type='button' onClick={hidePopup} className='flex w-full justify-end'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
          <div className='flex flex-col gap-3'>
            <h2>{`1. View ${type} access`}</h2>
            {type === 'folder' ? (
              <>
                {usersList ? <SelectAndDisplayData usersList={usersList.folder_team_members} selectedData={selectedUser} setSelectedData={setSelectedUser} columnsData={teamMemberData} type='user' title='Select team member:'>
                  {selectedUser && (
                    <>
                      <RemoveAccess type={type} refetch={refetch} selectedUserId={selectedUser.team_member.user.id} setSelectedUser={setSelectedUser} />
                      <ChangeAccessLevel type={type} selectedDataId={selectedDataId} refetch={refetch} selectedUserId={selectedUser.team_member.user.id} setSelectedUser={setSelectedUser} actualAccess={selectedUser.access_level.key} />
                    </>
                  )}
                </SelectAndDisplayData> : null}
                {usersList ? <SelectAndDisplayData usersList={usersList.folder_team_member_groups} selectedData={selectedGroup} setSelectedData={setSelectedGroup} columnsData={groupData} type='group' title='Select team members group:' /> : null}
              </>
            ) : usersList ? <SelectAndDisplayData usersList={usersList} selectedData={selectedUser} setSelectedData={setSelectedUser} columnsData={teamMemberData} type='user' title='Select team member:'>
              {selectedUser ? <RemoveAccess type={type} refetch={refetch} selectedUserId={selectedUser.team_member.user.id} setSelectedUser={setSelectedUser} /> : null}
              {selectedUser ? <ChangeAccessLevel type={type} selectedDataId={selectedDataId} refetch={refetch} selectedUserId={selectedUser.team_member.user.id} setSelectedUser={setSelectedUser} actualAccess={selectedUser.access_level.key} /> : null}
            </SelectAndDisplayData> : null}
          </div>
          <AddAccess type={type} setShowPopup={setShowPopup} selectedDataId={selectedDataId} refetch={refetch} activeMembers={[...teamMembers.map((i) => i.team_member.user.id)]} />
        </>
      ) : null}
    </Wrapper>
  );
}

PermissionsManagement.propTypes = {
  selectedDataId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default PermissionsManagement;
