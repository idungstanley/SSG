import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { cl } from '../../../../utils';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';

export function ExtendedBar() {
  const [showSearch, setShowSearch] = useState(false);
  const { data } = useGetTeamMembers({ page: 1, query: '' });

  const [query, setQuery] = useState('');
  const [blacklist, setBacklist] = useState<string[]>([]);

  const members = data?.data.team_members ?? [];

  const onCheckbox = (i: boolean, id: string) => {
    if (i) {
      setBacklist((prev) => [...prev.filter((i) => i !== id)]);
    } else {
      setBacklist((prev) => [...prev, id]);
    }
  };

  const onReset = (e: boolean) => {
    if (e) {
      setBacklist([]);
    } else {
      setBacklist([...members.map((i) => i.id)]);
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

  const filteredMembers = members.filter((i) => `${i.user.name} ${i.user.email}`.includes(query));

  return (
    <section className="space-y-3 border w-full">
      {/* header */}
      <div className="relative h-10 p-2 border flex items-center overflow-hidden">
        <div className="flex space-x-3 items-center">
          <Checkbox
            styles="text-primary-500 focus:ring-primary-500"
            checked={blacklist.length === 0}
            setChecked={(e) => onReset(e)}
          />

          <p>Hub 1</p>
        </div>

        <div
          style={!showSearch ? { transform: 'translateX(calc(100% - 35px))' } : undefined}
          className={cl(
            'absolute space-x-1 left-0 transform p-2 justify-between transition-all duration-500 flex items-center right-0 bg-white h-10'
          )}
        >
          <button onClick={onToggleSearch}>
            <MagnifyingGlassIcon className="w-5 h-5 cursor-pointer text-gray-500" aria-hidden="true" />
          </button>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="py-1.5 w-full text-gray-900 border-0 ring-0 focus:ring-0  focus:outline-0 appearance-none"
            placeholder="Search..."
          />

          <button onClick={onClickXIcon}>
            <XMarkIcon className="w-5 h-5 cursor-pointer text-gray-500" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* list */}
      <ul className="px-2">
        {filteredMembers.map((member) => (
          <li className="py-2 grid grid-cols-autoFr items-center space-x-3" key={member.id}>
            <Checkbox
              styles="text-primary-500 focus:ring-primary-500"
              checked={!blacklist.includes(member.id)}
              setChecked={(e) => onCheckbox(e, member.id)}
            />
            <div className="space-y-2">
              <h3>{member.user.name}</h3>
              <p className="text-xs">{member.user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
