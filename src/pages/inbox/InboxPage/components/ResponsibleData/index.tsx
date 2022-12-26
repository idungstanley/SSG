import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SelectMenuTeamMembers from '../../../../../components/selectMenu';
import { useGetTeamMembers } from '../../../../../features/settings/teamMembers/teamMemberService';
import { Spinner } from '../../../../../common';
import { useGetTeamMemberGroups } from '../../../../../features/settings/teamMemberGroups/teamMemberGroupService';
import {
  useCreateResponsibleMemberOrGroup,
  useGetResponsibleMembersOrGroups,
} from '../../../../../features/inbox/inboxService';
import ListItems from './ListItems';
import FullScreenMessage from '../../../../../components/CenterMessage/FullScreenMessage';

interface ResponsibleDataProps {
  setShowModal: (i: boolean) => void;
  isGroups: boolean;
}

export default function ResponsibleData({
  setShowModal,
  isGroups,
}: ResponsibleDataProps) {
  const { inboxId } = useParams();
  const [selectedData, setSelectedData] = useState<{
    name: string;
    id: string;
  } | null>(null);
  const { data, status } = isGroups
    ? useGetTeamMemberGroups(0)
    : useGetTeamMembers({ page: 0, query: '' });
  const { mutate: onCreate } = useCreateResponsibleMemberOrGroup(
    isGroups,
    inboxId
  );

  const { data: dt } = useGetResponsibleMembersOrGroups(isGroups, inboxId);

  const responsibleData = isGroups
    ? dt?.data.inbox_responsible_team_member_groups
    : dt?.data.inbox_responsible_team_members;

  const selectItems = isGroups
    ? data?.data.team_member_groups
    : data?.data.team_members;

  const responsibleDataIds = responsibleData?.map((i) =>
    isGroups ? i.team_member_group_id : i.team_member_id
  );
  const filteredData = selectItems?.filter(
    (i) => !responsibleDataIds?.includes(i.id)
  );

  if (status === 'loading') {
    return (
      <div className="absolute top-14 p-6 rounded-xl border bg-white z-50 w-80">
        <div className="mx-auto w-6 justify-center">
          <Spinner size={22} color="#0F70B7" />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="absolute top-14 p-6 rounded-xl border bg-white z-50 w-80">
        <FullScreenMessage
          title="Oops, an error occurred :("
          description="Please try again later."
          showHalFScreen
        />
      </div>
    );
  }

  const handleChange = (item: { name: string; id: string }) => {
    setSelectedData(item);
    onCreate({
      dataId: item.id,
      isGroups,
      inboxId,
    });
  };

  return (
    <>
      <div
        className="fixed left-0 right-0 bottom-0 top-0 opacity-0 z-40"
        tabIndex={0}
        role="button"
        onClick={() => setShowModal(false)}
      >
        {' '}
      </div>
      <div className="absolute top-14 left-0 px-6 py-3 rounded-xl border bg-white z-50 w-80">
        {filteredData ? (
          <SelectMenuTeamMembers
            teamMembers={filteredData.map((i) => ({
              id: i.id,
              name: isGroups ? i.name : i.user?.name,
            }))}
            selectedData={selectedData}
            setSelectedData={handleChange}
            title={`Add new responsible team ${
              isGroups ? 'member groups' : 'members'
            }`}
          />
        ) : null}
        <ListItems isGroups={isGroups} />
      </div>
    </>
  );
}
