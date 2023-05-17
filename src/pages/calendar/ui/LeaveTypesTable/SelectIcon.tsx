import { UserGroupIcon } from '@heroicons/react/24/outline';
import { MdBeachAccess, MdOutlineChildFriendly } from 'react-icons/md';
import Dropdown from '../../../../components/Dropdown/VoidDropdown';
import { cl } from '../../../../utils';

interface LeaveTypeIconProps {
  iconName: string;
}

const iconsConfig = [
  {
    icon: <MdBeachAccess className="w-5 h-5 stroke-current" />,
    name: 'umbrella'
  },
  {
    icon: <MdOutlineChildFriendly className="w-5 h-5 stroke-current" aria-hidden="true" />,
    name: 'child'
  },
  {
    icon: <UserGroupIcon className="w-5 h-5 stroke-current" aria-hidden="true" />,
    name: 'groups'
  }
];

function LeaveTypeIcon({ iconName }: LeaveTypeIconProps) {
  return iconsConfig.find((i) => i.name === iconName)?.icon || iconsConfig[0].icon;
}

interface SelectProps {
  icon: string;
  setIcon?: (i: string) => void;
  color: string;
  noSelect?: boolean;
}

export function SelectIcon({ icon, setIcon, color, noSelect }: SelectProps) {
  if (noSelect) {
    return (
      <span className={cl(`text-${color}-500`, 'cursor-pointer block p-2 text-sm')}>
        <LeaveTypeIcon iconName={icon} />
      </span>
    );
  }

  return (
    <Dropdown title={<LeaveTypeIcon iconName={icon} />}>
      {iconsConfig.map((i) => (
        <Dropdown.Item key={i.name}>
          <button
            onClick={setIcon ? () => setIcon(i.name) : undefined}
            className={cl(`text-${color}-700`, 'cursor-pointer block p-2 text-sm')}
          >
            <LeaveTypeIcon iconName={i.name} />
          </button>
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}
