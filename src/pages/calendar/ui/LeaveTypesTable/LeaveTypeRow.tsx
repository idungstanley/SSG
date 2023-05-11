import { TrashIcon } from '@heroicons/react/24/outline';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { useDeleteLeaveType, useUpdateLeaveType } from '../../../../features/calendar/api/leaveTypesApi';
import { LeaveType } from '../../../../features/calendar/types/leaveTypes';
import { cl } from '../../../../utils';
import { NameRow } from './NameRow';
import { SelectColor } from './SelectColor';
import { SelectIcon } from './SelectIcon';

type LeaveTypeRowProps = Omit<LeaveType, 'created_at' | 'updated_at'>;

export function LeaveTypeRow({
  id,
  name,
  icon,
  is_deducted,
  is_include_max_off,
  is_require_approval,
  color
}: LeaveTypeRowProps) {
  const { mutate: onDelete } = useDeleteLeaveType();

  const { mutate: onUpdate } = useUpdateLeaveType(id);

  const handleChangeIcon = (newOption: Pick<LeaveType, 'icon'>['icon']) => onUpdate({ id, data: { icon: newOption } });

  const handleChangeColor = (newOption: Pick<LeaveType, 'color'>['color']) =>
    onUpdate({ id, data: { color: newOption } });

  const handleChangeIsDeducted = (newOption: Pick<LeaveType, 'is_deducted'>['is_deducted']) =>
    onUpdate({ id, data: { is_deducted: newOption } });

  const handleChangeIsRequireApproval = (newOption: Pick<LeaveType, 'is_require_approval'>['is_require_approval']) =>
    onUpdate({ id, data: { is_require_approval: newOption } });

  const handleChangeIsIncludeMaxOff = (newOption: Pick<LeaveType, 'is_include_max_off'>['is_include_max_off']) =>
    onUpdate({ id, data: { is_include_max_off: newOption } });

  const handleChangeName = (newOption: Pick<LeaveType, 'name'>['name']) => onUpdate({ id, data: { name: newOption } });

  return (
    <tr key={id}>
      {/* name */}
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
        <NameRow defaultValue={name} onBlur={(e) => handleChangeName(e)} />
      </td>

      {/* icon */}
      <td className={cl('whitespace-nowrap px-3 py-4', `text-${color}-500`)}>
        <SelectIcon icon={icon} setIcon={(icon) => handleChangeIcon(icon)} color={color} />
      </td>

      {/* color */}
      <td className="flex whitespace-nowrap px-3 py-5">
        <SelectColor color={color} setColor={(color) => handleChangeColor(color)} />
      </td>

      <td className="whitespace-nowrap px-3 py-4">
        <Checkbox
          className={`text-${color}-500 border-${color}-500`}
          checked={!!is_deducted}
          setChecked={(i) => handleChangeIsDeducted(i ? 1 : 0)}
        />
      </td>

      <td className="whitespace-nowrap px-3 py-4">
        <Checkbox
          checked={!!is_require_approval}
          className={`text-${color}-500 border-${color}-500`}
          setChecked={(i) => handleChangeIsRequireApproval(i ? 1 : 0)}
        />
      </td>

      <td className="whitespace-nowrap px-3 py-4">
        <Checkbox
          checked={!!is_include_max_off}
          className={`text-${color}-500 border-${color}-500`}
          setChecked={(i) => handleChangeIsIncludeMaxOff(i ? 1 : 0)}
        />
      </td>

      {/* delete */}
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <button type="button" onClick={() => onDelete(id)}>
          <TrashIcon className="w-5 h-5 cursor-pointer text-red-400" aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
}
