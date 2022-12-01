// /* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/solid';
import SelectMenuTeamMembers from '../../../../../components/selectMenu';
import { useGetTeamMembers } from '../../../../../features/settings/teamMembers/teamMemberService';
import { Spinner } from '../../../../../common';
import HalfScreenMessage from '../../../../../components/CenterMessage/HalfScreenMessage';
import {
  useCreateResponsibleTeamMember,
  useDeleteResponsibleTeamMember,
  useGetResponsibleTeamMembers,
} from '../../../../../features/inbox/inboxService';
import FullScreenMessage from '../../../../shared/components/FullScreenMessage';

export default function ResponsibleTeamMembers({ setShowModal }) {
  const { inboxId } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, status } = useGetTeamMembers({ page: 0, query: '' });
  const { mutate: onCreate } = useCreateResponsibleTeamMember(inboxId);
  const { data: dt } = useGetResponsibleTeamMembers(inboxId);
  const { mutate: onDelete } = useDeleteResponsibleTeamMember(inboxId);

  const responsibleUsers = dt?.data.inbox_responsible_team_members;
  const teamMembers = data?.data.team_members;

  if (status === 'loading') {
    return (
      <div className="absolute top-14 right-52 p-6 rounded-xl border bg-white z-50 w-80">
        <div className="mx-auto w-6 justify-center">
          <Spinner size={22} color="#0F70B7" />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="absolute top-14 right-52 p-6 rounded-xl border bg-white z-50 w-80">
        <HalfScreenMessage
          title="Oops, an error occurred :("
          description="Please try again later."
        />
      </div>
    );
  }

  const handleChange = (user) => {
    setSelectedUser(user);
    onCreate({
      inboxId,
      memberId: user.id,
    });
  };

  const handleDelete = (id) => {
    onDelete({
      fileId: inboxId,
      memberId: id,
    });
  };

  return (
    <>
      <div
        className="fixed left-0 right-0 bottom-0 top-0 opacity-0 z-40"
        tabIndex={0}
        role="button"
        onClick={() => setShowModal(false)}
        onKeyDown={() => {}}
      >
        {' '}
      </div>
      <div className="absolute top-14 left-28 p-6 rounded-xl border bg-white z-50 w-80">
        {teamMembers ? (
          <SelectMenuTeamMembers
            teamMembers={teamMembers.map((i) => ({
              id: i.id,
              user: i.user.name,
            }))}
            selectedData={selectedUser}
            setSelectedData={handleChange}
            type="user"
            title="Add new responsible team member"
          />
        ) : null}
        {responsibleUsers ? (
          !responsibleUsers.length ? (
            <div className="mt-4">
              <FullScreenMessage
                title="No members yes."
                description="Create one."
                showIcon={false}
              />
            </div>
          ) : (
            <>
              <p className="mt-4 text-sm font-medium text-gray-700">
                Responsible team members:
              </p>
              <ul className="divide-y divide-gray-200">
                {responsibleUsers.map((i) => (
                  <li
                    key={i.id}
                    className="py-4 flex justify-between items-center"
                  >
                    <div className="flex flex-col pl-1">
                      <p className="text-indigo-700 font-bold">
                        {i.team_member.user.name}
                      </p>
                      <p className="text-gray-500">
                        {i.team_member.user.email}
                      </p>
                    </div>

                    <TrashIcon
                      onClick={() => handleDelete(i.id)}
                      className="w-6 h-6 text-gray-300 cursor-pointer hover:text-red-500 transition-all duration-300"
                    />
                  </li>
                ))}
              </ul>
            </>
          )
        ) : null}
      </div>
    </>
  );
}

ResponsibleTeamMembers.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};
