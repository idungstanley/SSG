import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { useAddLeaveType } from '../../../../features/calendar/api/leaveTypesApi';
import { cl } from '../../../../utils';
import { colors, icons } from '../../lib/config';
import { NameRow } from './NameRow';
import { SelectColor } from './SelectColor';
import { SelectIcon } from './SelectIcon';

export function AddLeaveType() {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(icons[0]);
  const [color, setColor] = useState(colors[0]);
  const [isDeducted, setIsDeducted] = useState(false);
  const [isRequireApproval, setIsRequireApproval] = useState(false);
  const [isIncludeMaxOff, setIsIncludeMaxOff] = useState(false);

  const { mutate: onCreate } = useAddLeaveType();

  const handleCreateType = () => {
    if (name.length > 2) {
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
      setName('');
    }
  };

  return (
    <tr>
      {/* name */}
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
        <NameRow defaultValue={name} onChange={(e) => setName(e)} />
      </td>

      {/* icon */}
      <td className={cl('whitespace-nowrap px-3 py-4', `text-${color}-700`)}>
        <SelectIcon icon={icon} setIcon={setIcon} color={color} />
      </td>

      {/* color */}
      <td className="whitespace-nowrap px-3 py-4">
        <SelectColor color={color} setColor={setColor} />
      </td>

      <td className="whitespace-nowrap px-3 pb-2">
        <Checkbox
          checked={isDeducted}
          styles={`text-${color}-500 border-${color}-500 focus:ring-${color}-300`}
          setChecked={(e) => setIsDeducted(e)}
        />
      </td>

      <td className="whitespace-nowrap px-3 pb-2">
        <Checkbox
          checked={isRequireApproval}
          styles={`text-${color}-500 border-${color}-500 focus:ring-${color}-300`}
          setChecked={(e) => setIsRequireApproval(e)}
        />
      </td>

      <td className="whitespace-nowrap px-3 pb-2">
        <Checkbox
          checked={isIncludeMaxOff}
          styles={`text-${color}-500 border-${color}-500 focus:ring-${color}-300`}
          setChecked={(e) => setIsIncludeMaxOff(e)}
        />
      </td>

      {/* submit */}
      <td className="whitespace-nowrap px-3 py-4">
        <button onClick={handleCreateType}>
          <PlusIcon className="w-5 h-5 cursor-pointer text-primary-500" aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
}
