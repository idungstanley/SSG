import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
//import { checkIsOwner } from '../../calendar/lib/userUtils';
import { useAppSelector } from '../../../app/hooks';
import { selectCalendar } from '../../../features/calendar/slice/calendarSlice';
import { AddItem } from '../ui/AddItem';
import { useGetHrTeamMembers } from '../../../features/hr/hrTeamMembersService';
import React, { Fragment, useEffect, useState } from 'react';
import DetailsIcon from '../../../assets/icons/DetailsIcon';
import HrHubsList from '../ui/HrHubsList';

interface HrTeamMember {
  uuid: string;
  id: string;
  hubId: string;
}

export default function ManageHr() {
  const { blacklistIds, hrTeamMembers, selectedHubs } = useAppSelector(selectCalendar);
  const { data: teamMembersData } = useGetTeamMembers({ page: 1, query: '' });
  const members = teamMembersData?.data.team_members ?? [];

  const hrDataGroup = () => {
    const hrTeamMembersData: HrTeamMember[] = hrTeamMembers;

    const groupedByHubId: { [key: string]: string[] } = {};

    hrTeamMembersData.forEach((item) => {
      if (!groupedByHubId[item.hubId]) {
        groupedByHubId[item.hubId] = [];
      }
      groupedByHubId[item.hubId].push(item.id);
    });

    return Object.keys(groupedByHubId).map((key) => ({
      hub_id: key,
      members_id: groupedByHubId[key]
    }));
  };

  const refetchData = () => {
    const hubsArray = hrDataGroup();
    if (hubsArray.length > 0) {
      groupedHrMembersData.refetch({ queryKey: ['getHrTeamMembers', { selections: hubsArray }] });
    }
  };

  const hubsArray = hrDataGroup();

  const groupedHrMembersData = useGetHrTeamMembers({ selections: hubsArray });

  useEffect(() => {
    refetchData();
  }, [hrTeamMembers]);

  const selectedHrTeamMembers = groupedHrMembersData.data ? groupedHrMembersData.data : [];

  //const isOwner = checkIsOwner(members);

  const filteredMembers = members.filter((i) => !blacklistIds.includes(i.id));

  // if (!isOwner) {
  //   return <div>You have no right to do this</div>;
  // }

  const [showNewDayField, setShowNewDayField] = useState('');

  const addHrItem = (hudId: string) => {
    setShowNewDayField(hudId);
  };

  const handleClose = () => {
    setShowNewDayField('');
    refetchData();
  };

  return (
    <section className="w-full h-full flex">
      <div className="border-r w-9/12 pt-8 overflow-auto p-3">
        {selectedHubs.length ? (
          selectedHubs.map((listItem, key) => (
            <Fragment key={key}>
              <HrHubsList listItem={listItem} selectedHrTeamMembers={selectedHrTeamMembers} addHrItem={addHrItem} />
            </Fragment>
          ))
        ) : (
          <div className="flex w-full h-full items-center justify-center">
            <div className="flex">
              <DetailsIcon active={false} />
              <h2 className="pl-2">Selected nothing</h2>
            </div>
          </div>
        )}
      </div>

      <div className="pt-8 flex justify-center items-center w-3/12 p-3">
        <div style={{ color: 'orange' }}>HR PILOT</div>
      </div>

      {showNewDayField && (
        <div className="pl-2">
          <AddItem onClose={() => handleClose()} members={filteredMembers} hubId={showNewDayField} />
        </div>
      )}
    </section>
  );
}
