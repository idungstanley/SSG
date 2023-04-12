import { useMemo, useState } from 'react';
import { useCommunity } from '../../features/community/communityService';
import Diagram from './components/Diagram';
import Header from './components/Header';
import Search from './components/Search';
import { ShowDetailsToggle, ShowGuestsToggle } from './components/Toggles';
import UsersList from './components/UsersList';
import { useSplitTeamMembers } from './lib/useSplitTeamMembers';

export default function CommunityPage() {
  const { data } = useCommunity();

  const [query, setQuery] = useState('');
  const [showGuests, setShowGuests] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const teamMembers = data?.team_members ?? [];

  const { online, offline } = useMemo(() => useSplitTeamMembers(teamMembers), [teamMembers]);

  const filteredOnline = useMemo(
    () => online.filter((i) => i.user.name.toLowerCase().includes(query.toLowerCase())),
    [online, query]
  );

  const filteredOffline = useMemo(
    () => offline.filter((i) => i.user.name.toLowerCase().includes(query.toLowerCase())),
    [offline, query]
  );

  return (
    <div className="flex justify-center w-full h-full space-y-5 py-10">
      <div className="max-w-4xl h-full space-y-5">
        <Diagram />

        <Header>
          <Search onChange={(i) => setQuery(i)} />

          <ShowDetailsToggle value={showDetails} setValue={setShowDetails} />

          <ShowGuestsToggle value={showGuests} setValue={setShowGuests} />
        </Header>

        {/* active */}
        <UsersList users={filteredOnline} isColored title="Online" showDetails={showDetails} />

        {/* offline */}
        <UsersList users={filteredOffline} isColored={false} title="Offline" showDetails={showDetails} />
      </div>
    </div>
  );
}
