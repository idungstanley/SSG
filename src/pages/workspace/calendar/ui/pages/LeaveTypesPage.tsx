import { cl } from '../../../../../utils';
import { useDaysOff } from '../../lib/daysOffContext';

export default function LeaveTypesPage() {
  const { leaveTypes } = useDaysOff();

  return (
    <div className="w-full">
      <div className="w-fit mx-auto">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Leave types</h1>
          <p className="mt-2 text-sm text-gray-700">Create different categories for different days off.</p>
        </div>

        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Title
              </th>
              {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Email
              </th> */}
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Icon
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Color
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {leaveTypes.map((type) => (
              <tr key={type.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {type.title}
                </td>
                <td className={cl('whitespace-nowrap px-3 py-4', `text-${type.color}-500`)}>{type.icon}</td>
                <td className="whitespace-nowrap px-3 py-4">
                  <span className={cl('rounded-md w-5 h-5', `bg-${type.color}-500`)}>{type.color}</span>
                </td>
                {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
