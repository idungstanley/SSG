import { BeakerIcon, GiftIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRef, useState, InputHTMLAttributes } from 'react';
import { MdBeachAccess } from 'react-icons/md';
import Dropdown from '../../../components/Dropdown/VoidDropdown';
import { useAddLeaveType, useDeleteLeaveType, useLeaveTypes } from '../../../features/calendar/api/leaveTypesApi';
import { cl } from '../../../utils';

const icons = ['child', 'umbrella', 'groups'];
const colors = ['green', 'red', 'teal', 'fuchsia', 'yellow'];

export default function LeaveTypesTable() {
  const titleRef = useRef<HTMLInputElement>(null);
  const [icon, setIcon] = useState(icons[0]);
  const [color, setColor] = useState(colors[0]);
  const [isDeducted, setIsDeducted] = useState(false);
  const [isRequireApproval, setIsRequireApproval] = useState(false);
  const [isIncludeMaxOff, setIsIncludeMaxOff] = useState(false);

  const { data: leaveTypes } = useLeaveTypes();
  const { mutate: onDelete } = useDeleteLeaveType();
  const { mutate: onCreate } = useAddLeaveType();

  const handleCreateType = () => {
    if (titleRef.current && titleRef.current.value.length > 2) {
      const name = titleRef.current.value;

      onCreate({
        icon,
        name,
        color,
        is_deducted: isDeducted ? 1 : 0,
        is_include_max_off: isIncludeMaxOff ? 1 : 0,
        is_require_approval: isRequireApproval ? 1 : 0
      });

      // reset
      setIcon(icons[0]);
      setColor(colors[0]);
      setIsRequireApproval(false);
      setIsDeducted(false);
      setIsIncludeMaxOff(false);
      titleRef.current.value = '';
    }
  };

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
            Name
          </th>

          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Icon
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Color
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Take from allowance
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Needs approval
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            Maximum absent
          </th>
          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {leaveTypes?.map((type) => (
          <tr key={type.id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{type.name}</td>
            <td className={cl('whitespace-nowrap px-3 py-4', `text-${type.color}-500`)}>
              <LeaveTypeIcon iconName={type?.icon ?? 'umbrella'} />
            </td>
            <td className="flex whitespace-nowrap px-3 py-5">
              <span className={cl('rounded-md w-4 h-4', `bg-${type.color}-500`)} />
            </td>
            <td className="whitespace-nowrap px-3 py-4">
              <Checkbox
                className={`text-${type.color}-500 border-${type.color}-500`}
                checked={!!type.is_deducted}
                setChecked={() => null}
              />
            </td>
            <td className="whitespace-nowrap px-3 py-4">
              <Checkbox
                checked={!!type.is_require_approval}
                className={`text-${type.color}-500 border-${type.color}-500`}
                setChecked={() => null}
              />
            </td>
            <td className="whitespace-nowrap px-3 py-4">
              <Checkbox
                checked={!!type.is_include_max_off}
                className={`text-${type.color}-500 border-${type.color}-500`}
                setChecked={() => null}
              />
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <button type="button" onClick={() => onDelete(type.id)}>
                <TrashIcon className="w-5 h-5 cursor-pointer text-red-400" aria-hidden="true" />
              </button>
            </td>
          </tr>
        ))}

        <tr>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
            <input
              required
              minLength={3}
              ref={titleRef}
              type="text"
              className="block w-fit rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              placeholder="New leave type..."
            />
          </td>

          <td className={cl('whitespace-nowrap px-3 py-4', `text-${color}-700`)}>
            <Dropdown title={<LeaveTypeIcon iconName={icon} />}>
              {iconsConfig.map((i) => (
                <Dropdown.Item key={i.name}>
                  <button
                    onClick={() => setIcon(i.name)}
                    className={cl(`text-${color}-700`, 'cursor-pointer block p-2 text-sm')}
                  >
                    <LeaveTypeIcon iconName={i.name} />
                  </button>
                </Dropdown.Item>
              ))}
            </Dropdown>
          </td>

          <td className="whitespace-nowrap px-3 py-4">
            <Dropdown title={<span className={cl('rounded-md w-4 h-4', `bg-${color}-500`)} />}>
              {colors.map((i, index) => (
                <Dropdown.Item key={index}>
                  <button
                    onClick={() => setColor(i)}
                    className={cl('rounded-md cursor-pointer block w-4 m-1 h-4 p-2 text-sm', `bg-${i}-500`)}
                  ></button>
                </Dropdown.Item>
              ))}
            </Dropdown>
          </td>

          <td className="whitespace-nowrap px-3 pb-2">
            <Checkbox
              checked={isDeducted}
              className={`text-${color}-500 border-${color}-500 cursor-pointer`}
              setChecked={(e) => setIsDeducted(e)}
            />
          </td>

          <td className="whitespace-nowrap px-3 pb-2">
            <Checkbox
              checked={isRequireApproval}
              className={`text-${color}-500 border-${color}-500 cursor-pointer`}
              setChecked={(e) => setIsRequireApproval(e)}
            />
          </td>

          <td className="whitespace-nowrap px-3 pb-2">
            <Checkbox
              checked={isIncludeMaxOff}
              className={`text-${color}-500 border-${color}-500 cursor-pointer`}
              setChecked={(e) => setIsIncludeMaxOff(e)}
            />
          </td>

          <td className="whitespace-nowrap px-3 py-4">
            <button onClick={handleCreateType}>
              <PlusIcon className="w-5 h-5 cursor-pointer text-primary-500" aria-hidden="true" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

const iconsConfig = [
  {
    icon: <MdBeachAccess className="w-5 h-5 stroke-current" />,
    name: 'umbrella'
  },
  {
    icon: <BeakerIcon className="w-5 h-5 stroke-current" aria-hidden="true" />,
    name: 'child'
  },
  {
    icon: <GiftIcon className="w-5 h-5 stroke-current" aria-hidden="true" />,
    name: 'groups'
  }
];

// extends HTMLAttributes<HTMLSpanElement>
interface LeaveTypeIconProps {
  iconName: string;
}

function LeaveTypeIcon({ iconName }: LeaveTypeIconProps) {
  return iconsConfig.find((i) => i.name === iconName)?.icon || iconsConfig[0].icon;
}

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  setChecked: (i: boolean) => void;
}

function Checkbox({ checked, setChecked, ...props }: CheckboxProps) {
  return (
    <input
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      type="checkbox"
      className="h-4 w-4 rounded-md border-gray-300 focus:ring-gray-500 cursor-pointer"
      {...props}
    />
  );
}
