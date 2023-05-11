import { TrashIcon } from '@heroicons/react/24/outline';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { useDeleteLeaveType, useLeaveTypes } from '../../../../features/calendar/api/leaveTypesApi';
import { cl } from '../../../../utils';
import { AddLeaveType } from './AddLeaveType';
import { SelectIcon } from './SelectIcon';

export default function LeaveTypesTable() {
  const { data: leaveTypes } = useLeaveTypes();
  const { mutate: onDelete } = useDeleteLeaveType();

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
            {/* name */}
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{type.name}</td>

            {/* icon */}
            <td className={cl('whitespace-nowrap px-3 py-4', `text-${type.color}-500`)}>
              {/* <LeaveTypeIcon iconName={type?.icon ?? 'umbrella'} /> */}
              <SelectIcon icon={type.icon} setIcon={(icon) => handle} color={type.color} />
            </td>

            {/* color */}
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

        <AddLeaveType />
      </tbody>
    </table>
  );
}
