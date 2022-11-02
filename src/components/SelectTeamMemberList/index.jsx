import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import React from 'react';
import toast from 'react-hot-toast';
import Toast from '../../common/Toast';
import requestNew from '../../app/requestNew';

const useGetTeamMembers = (currentUserId) => {
  const { data, status } = useQuery(['team-members'], async () => requestNew({
    url: 'settings/team-members',
    method: 'GET',
  }));

  const teamMembers = data && data.data.team_members.filter((i) => i.user.id !== currentUserId);

  return { data: teamMembers, status };
};

function TeamMembersList({ setShowPopup, folderOrFileId, dataType }) {
  const { currentUserId } = useSelector((state) => state.auth);
  const { data, status } = useGetTeamMembers(currentUserId);

  const onClickUser = async (id) => {
    try {
      const request = await requestNew({ method: 'post', url: `${dataType}/${folderOrFileId}/share/${id}` });
      toast.custom((t) => (<Toast type="success" title={request.message.title} body={null} toastId={t.id} />));
    } catch (e) {
      console.error(e.data.message.title);
      toast.custom((t) => (<Toast type="error" title="You don't have permission to share this." body={null} toastId={t.id} />));
    }
    setShowPopup(false);
  };

  return (
    <>
      <div className="fixed left-0 right-0 bottom-0 top-0 bg-black opacity-0" tabIndex={0} role="button" onClick={() => setShowPopup(false)} onKeyDown={() => {}}> </div>
      <div className="absolute bg-white rounded-xl border right-0 top-12">
        <ul className="divide-y divide-gray-200">
          {data && data.length === 0 ? <p>no users</p> : null}
          {status === 'success'
            ? data && data.map((i) => (
              <li className="flex py-4 hover:bg-gray-100 cursor-pointer rounded-xl" key={i.user.id}>
                <div className="mx-3" tabIndex={0} role="button" onKeyDown={() => {}} onClick={() => onClickUser(i.id)}>
                  <p className="text-sm font-medium text-gray-900">{i.user.name}</p>
                  <p className="text-sm text-gray-500">{i.user.email}</p>
                </div>
              </li>
            )) : null}
        </ul>
      </div>
    </>
  );
}

TeamMembersList.propTypes = {
  setShowPopup: PropTypes.func.isRequired,
  folderOrFileId: PropTypes.string.isRequired,
  dataType: PropTypes.string.isRequired,
};

export default TeamMembersList;
