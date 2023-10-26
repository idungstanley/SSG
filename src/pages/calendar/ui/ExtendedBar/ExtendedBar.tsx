import React, { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCalendar, setBlacklistIds } from '../../../../features/calendar/slice/calendarSlice';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { Header } from './Header';
import { MembersList } from './MembersList';

export function ExtendedBar() {
  const dispatch = useAppDispatch();
  const { blacklistIds, selectedHubs } = useAppSelector(selectCalendar);
  const { data } = useGetTeamMembers({ page: 1, query: '' });

  const [query] = useState('');

  const members = data?.data.team_members ?? [];

  const onCheckbox = (i: boolean, id: string, hubId: string) => {
    if (i) {
      dispatch(setBlacklistIds([...blacklistIds.filter((i) => i !== id + '_' + hubId)]));
    } else {
      dispatch(setBlacklistIds([...blacklistIds, id + '_' + hubId]));
    }
  };

  const onReset = (e: boolean, hubId: string) => {
    if (e) {
      dispatch(setBlacklistIds([]));
    } else {
      dispatch(setBlacklistIds([...members.map((i) => i.id + '_' + hubId)]));
    }
  };

  const filteredMembers = members.filter((i) =>
    `${i.user.name} ${i.user.email}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section>
      {Object.keys(selectedHubs).map((keyName, i) => (
        <Fragment key={keyName}>
          {/* header */}
          <Header onReset={onReset} activeItemName={selectedHubs[i].hubName} hubId={selectedHubs[i].hubId} />

          {/* list */}
          <MembersList
            members={filteredMembers}
            onCheckbox={onCheckbox}
            hubId={selectedHubs[i].hubId}
            place="sidebar"
          />
        </Fragment>
      ))}
    </section>
  );
}
