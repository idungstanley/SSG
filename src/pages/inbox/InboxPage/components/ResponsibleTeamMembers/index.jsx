// /* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SelectMenuTeamMembers from '../../../../../components/selectMenu';
import { useGetTeamMembers } from '../../../../../features/settings/teamMembers/teamMemberService';
import { Spinner } from '../../../../../common';
import HalfScreenMessage from '../../../../../components/CenterMessage/HalfScreenMessage';

export default function ResponsibleTeamMembers({ setShowModal }) {
  // TODO: add modal with selection team member dropdown, list all members and removing members
  // * select team members from reusable component
  // * list all items as list blacklist emails
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, status } = useGetTeamMembers({ page: 0, query: '' });

  const teamMembers = data?.data.team_members;

  console.log(status, selectedUser);

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
      <div className="absolute top-14 right-52 p-6 rounded-xl border bg-white z-50 w-80">
        {teamMembers ? (
          <SelectMenuTeamMembers
            teamMembers={teamMembers.map((i) => ({
              id: i.id,
              user: i.user.name,
            }))}
            selectedData={selectedUser}
            setSelectedData={setSelectedUser}
            type="user"
            title="Add new responsible team member"
          />
        ) : null}
      </div>
    </>
  );
}

ResponsibleTeamMembers.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};
