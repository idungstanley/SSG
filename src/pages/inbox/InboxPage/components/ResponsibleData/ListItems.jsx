import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/solid';
import HalfScreenMessage from '../../../../../components/CenterMessage/HalfScreenMessage';
import {
  useDeleteResponsibleMemberOrGroup,
  useGetResponsibleMembersOrGroups,
} from '../../../../../features/inbox/inboxService';

export default function ListItems({ isGroups }) {
  const { inboxId } = useParams();
  const { mutate: onDelete } = useDeleteResponsibleMemberOrGroup(
    inboxId,
    isGroups,
  );
  const { data: dt } = useGetResponsibleMembersOrGroups(inboxId, isGroups);

  const data = isGroups
    ? dt?.data.inbox_responsible_team_member_groups
    : dt?.data.inbox_responsible_team_members;

  const handleDelete = (id) => {
    onDelete({
      inboxId,
      dataId: id,
      isGroups,
    });
  };
  return data ? (
    !data.length ? (
      <div className="mt-4">
        <HalfScreenMessage
          title="No data yet."
          description="Create one."
          showIcon={false}
        />
      </div>
    ) : (
      <>
        <p className="mt-4 text-sm font-medium text-gray-700">
          {`Responsible team ${isGroups ? 'member groups' : 'members'}`}
        </p>
        <ul className="divide-y divide-gray-200">
          {data.map((i) => (
            <li key={i.id} className="py-4 flex justify-between items-center">
              <div className="flex flex-col pl-1">
                <p className="text-indigo-700 font-bold">
                  {isGroups
                    ? i.team_member_group.name
                    : i.team_member.user.name}
                </p>
                <p className="text-gray-500">
                  {isGroups ? null : i.team_member.user.email}
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
  ) : null;
}

ListItems.propTypes = {
  isGroups: PropTypes.bool.isRequired,
};
