import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCalendar, setBlacklistIds } from '../../../../features/calendar/slice/calendarSlice';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { Header } from './Header';
import { MembersList } from './MembersList';

export function ExtendedBar() {
  const dispatch = useAppDispatch();
  const { blacklistIds } = useAppSelector(selectCalendar);
  const [showSearch, setShowSearch] = useState(false);
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const { activeItemName } = useAppSelector((state) => state.workspace);

  const [query, setQuery] = useState('');

  const members = data?.data.team_members ?? [];

  const onCheckbox = (i: boolean, id: string) => {
    if (i) {
      dispatch(setBlacklistIds([...blacklistIds.filter((i) => i !== id)]));
    } else {
      dispatch(setBlacklistIds([...blacklistIds, id]));
    }
  };

  const onReset = (e: boolean) => {
    if (e) {
      dispatch(setBlacklistIds([]));
    } else {
      dispatch(setBlacklistIds([...members.map((i) => i.id)]));
    }
  };

  const onToggleSearch = () => {
    setShowSearch((prev) => !prev);
    if (query.length) {
      setQuery('');
    }
  };

  const onClickXIcon = () => {
    if (query.length) {
      setQuery('');
    } else {
      setShowSearch(false);
    }
  };

  const filteredMembers = members.filter((i) =>
    `${i.user.name} ${i.user.email}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section>
      <div className="relative mt-0 mb-0 h-10 p-2 flex border-b items-center overflow-hidden justify-start bg-alsoit-gray-50 capitalize pl-5">
        {activeItemName}
      </div>

      {/* header */}
      <Header
        onClickXIcon={onClickXIcon}
        onToggleSearch={onToggleSearch}
        onReset={onReset}
        showSearch={showSearch}
        activeItemName={activeItemName}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="py-1.5 w-full text-gray-900 border-0 ring-0 focus:ring-0  focus:outline-0 appearance-none"
          placeholder="Search..."
        />
      </Header>

      {/* list */}
      <MembersList members={filteredMembers} onCheckbox={onCheckbox} />
    </section>
  );
}
