import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import HrListMembers from '../ui/HrListMembers';
import { checkIsOwner } from '../../calendar/lib/userUtils';
import { useAppSelector } from '../../../app/hooks';
import { selectCalendar } from '../../../features/calendar/slice/calendarSlice';
import { AddItem } from '../ui/AddItem';
import { cl } from '../../../utils';
import { useGetHrTeamMembers } from '../../../features/hr/hrTeamMembersService';
import React, { useEffect, useState } from 'react';
import DetailsIcon from '../../../assets/icons/DetailsIcon';

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

  const isOwner = checkIsOwner(members);

  const filteredMembers = members.filter((i) => !blacklistIds.includes(i.id));

  if (!isOwner) {
    return <div>You have no right to do this</div>;
  }

  const [showNewDayField, setShowNewDayField] = useState('');

  const addHrItem = (hudId: string) => {
    setShowNewDayField(hudId);
  };

  const handleClose = () => {
    setShowNewDayField('');
    refetchData();
  };

  const checkTeamMembers = (hubId: string) => {
    return hrTeamMembers.filter((i) => i.hubId == hubId).length > 0;
  };

  const filteredTeamMembers = (hubId: string) => {
    return selectedHrTeamMembers.filter((i) => i.hub_id == hubId);
  };

  return (
    <div className="w-full h-full p-4">
      <div className="h-full mx-auto">
        {selectedHubs.length ? (
          selectedHubs.map((listItem, key) => (
            <div className="w-full" key={key}>
              <div
                className="pt-1 pb-3 mb-5 border-t-4 border-l-4 rounded-3xl bg-purple-50"
                style={{
                  borderColor: listItem.hubColor ? listItem.hubColor : 'gray',
                  transition: '.3s'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="flex items-center justify-between space-x-10 bg-purple-500 -mt-1 p-1 pr-7 rounded-tl-2xl -ml-0.5 gap-4 h-8"
                      style={{
                        backgroundColor: listItem.hubColor ? listItem.hubColor : 'gray'
                      }}
                    >
                      <div className="flex items-center pl-2 space-x-2 text-sm text-white w-fit">
                        <h1>{listItem.hubName}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                {!showNewDayField && (
                  <div className="h-5 font-semibold alsoit-gray-300">
                    <button
                      onClick={() => addHrItem(listItem.hubId as string)}
                      className={cl('p-1.5 pl-5 text-left w-fit text-xs')}
                    >
                      + NEW
                    </button>
                  </div>
                )}
                {checkTeamMembers(listItem.hubId) && (
                  <section style={{ minHeight: '0', maxHeight: '83vh' }} className="w-full h-full p-4 pb-0 space-y-10">
                    <table className="w-full mt-5">
                      <thead>
                        <tr>
                          <td className="items-center pb-1 text-center">Employee</td>
                          <td className="items-center pb-1 text-center">Role</td>
                          <td className="items-center pb-1 text-center">Work Location</td>
                          <td className="items-center pb-1 text-center">Start Date</td>
                          <td className="items-center pb-1 text-center">Salary</td>
                          <td className="items-center pb-1 text-center">Time Taken Off</td>
                          <td className="items-center pb-1 text-center">Allowance</td>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <HrListMembers hrListItems={filteredTeamMembers(listItem.hubId)} />
                      </tbody>
                    </table>
                  </section>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex">
              <DetailsIcon active={false} />
              <h2 className="pl-2">Selected nothing</h2>
            </div>
          </div>
        )}
      </div>
      {showNewDayField && (
        <div className="pl-2">
          <AddItem onClose={() => handleClose()} members={filteredMembers} hubId={showNewDayField} />
        </div>
      )}
    </div>
  );
}
