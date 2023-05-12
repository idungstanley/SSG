import { useLeaveTypes } from '../../../../features/calendar/api/leaveTypesApi';
import { AddLeaveType } from './AddLeaveType';
import { LeaveTypeRow } from './LeaveTypeRow';

export default function LeaveTypesTable() {
  const { data: leaveTypes } = useLeaveTypes();

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

      <tbody className="overflow-y-scroll divide-y divide-gray-200">
        <AddLeaveType />
        {leaveTypes?.map((type) => (
          <LeaveTypeRow
            color={type.color}
            name={type.name}
            key={type.id}
            id={type.id}
            is_deducted={type.is_deducted}
            icon={type.icon}
            is_include_max_off={type.is_include_max_off}
            is_require_approval={type.is_require_approval}
          />
        ))}
      </tbody>
    </table>
  );
}
