/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PropTypes } from 'prop-types';
import requestNew from '../../app/requestNew';
import SelectMenuTeamMembers from '../selectMenu';

const useGetFolderPermissions = (id) => {
  const { data, status } = useQuery(['folder-permissions'], async () => requestNew({
    url: `folders/${id}/access`,
    method: 'GET',
  }));

  return { data: data?.data, status };
};

function DisplayData({ data }) {
  if (!data) {
    return <> </>;
  }

  return (
    <div className="p-1 font-medium">
      {data.map((i) => (
        <p key={i.id}>
          {i.title}
          <span className="font-semibold text-indigo-600 pl-1">{i.value}</span>
        </p>
      ))}
    </div>
  );
}

DisplayData.propTypes = {
  data: PropTypes.array.isRequired,
};

function PermissionsManagement({ folderId }) {
  const [showPopup, setShowPopup] = useState(false);
  const { data } = useGetFolderPermissions(folderId);
  const [selectedUser, setSelectedUser] = useState(null);

  const dataArr = selectedUser ? [
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

  return (
    <>
      <p onClick={() => setShowPopup(true)} className="text-right text-gray-600 underline cursor-pointer">Manage permissions</p>
      {showPopup ? (
        <div className="absolute top-0 left-0 w-80 bg-white m-2 rounded-xl border p-3 flex flex-col z-10">
          <button type="button" onClick={() => setShowPopup(false)} className="flex w-full justify-end">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {data ? <SelectMenuTeamMembers teamMembers={data.folder_team_members} selectedUser={selectedUser} setSelectedUser={setSelectedUser} /> : null}
          {selectedUser ? (
            <div className="border rounded-xl p-2 mt-2 font-medium">
              <DisplayData data={dataArr} />
              <div className="flex justify-between content-center text-sm mt-3">
                <button className="border p-2 rounded-xl text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300" type="button">Change access</button>
                <button className="border p-2 rounded-xl text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300" type="button">Remove access</button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

PermissionsManagement.propTypes = {
  folderId: PropTypes.string.isRequired,
};

export default PermissionsManagement;
