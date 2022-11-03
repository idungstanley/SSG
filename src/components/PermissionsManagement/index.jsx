/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PropTypes } from 'prop-types';
import requestNew from '../../app/requestNew';
import SelectMenuTeamMembers from '../selectMenu';
import DisplayData from './components/DisplaySelectedData';

const useGetFolderPermissions = (id) => {
  const { data, status } = useQuery([`folder-permissions-${id}`], async () => requestNew({
    url: `folders/${id}/access`,
    method: 'GET',
  }));

  return { data: data?.data, status };
};

function PermissionsManagement({ folderId }) {
  const [showPopup, setShowPopup] = useState(false);
  const { data } = useGetFolderPermissions(folderId);
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

  return (
    <>
      {showPopup ? <div className="fixed left-0 right-0 bottom-0 top-0 bg-black opacity-0" tabIndex={0} role="button" onClick={hidePopup} onKeyDown={() => {}}> </div> : null}
      <p onClick={() => setShowPopup(true)} className="text-right text-gray-600 underline cursor-pointer">Manage permissions</p>
      {showPopup ? (
        <div className="absolute top-0 right-0 w-80 bg-white m-2 rounded-xl border p-3 flex flex-col z-10">
          <button type="button" onClick={hidePopup} className="flex w-full justify-end">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col gap-3">
            {data ? <SelectMenuTeamMembers teamMembers={data.folder_team_members} selectedData={selectedUser} setSelectedData={setSelectedUser} type="user" title="Select team member:" /> : null}
            {selectedUser ? (
              <div className="border rounded-xl p-2 mt-2 font-medium">
                <DisplayData data={teamMemberData} />
                <div className="flex justify-between content-center text-sm mt-3">
                  <button className="border p-2 rounded-xl text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300" type="button">Change access</button>
                  <button className="border p-2 rounded-xl text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300" type="button">Remove access</button>
                </div>
              </div>
            ) : null}
            {data ? <SelectMenuTeamMembers teamMembers={data.folder_team_member_groups} selectedData={selectedGroup} setSelectedData={setSelectedGroup} type="group" title="Select team member group:" /> : null}
            {selectedGroup ? (
              <div className="border rounded-xl p-2 mt-2 font-medium">
                <DisplayData data={groupData} />
                <div className="flex justify-between content-center text-sm mt-3">
                  <button className="border p-2 rounded-xl text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300" type="button">Change access</button>
                  <button className="border p-2 rounded-xl text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300" type="button">Remove access</button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

PermissionsManagement.propTypes = {
  folderId: PropTypes.string.isRequired,
};

export default PermissionsManagement;
