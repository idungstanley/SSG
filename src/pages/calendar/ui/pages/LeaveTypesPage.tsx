import { TrashIcon, PlusIcon, AcademicCapIcon, BeakerIcon, GiftIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import Dropdown from '../../../../components/Dropdown/VoidDropdown';
import { cl } from '../../../../utils';
import { useDaysOff } from '../../lib/daysOffContext';

const colors = ['green', 'red', 'teal', 'fuchsia', 'yellow'];

const icons = [
  <AcademicCapIcon key={1} className="w-5 h-5 stroke-current" aria-hidden="true" />,
  <BeakerIcon key={2} className="w-5 h-5 stroke-current" aria-hidden="true" />,
  <GiftIcon key={3} className="w-5 h-5 stroke-current" aria-hidden="true" />
];

export default function LeaveTypesPage() {
  const { leaveTypes, onAddLeaveType, onRemoveLeaveType } = useDaysOff();
  const titleRef = useRef<HTMLInputElement>(null);
  const [icon, setIcon] = useState(icons[0]);
  const [color, setColor] = useState(colors[0]);

  const handleCreateType = () => {
    if (titleRef.current && titleRef.current.value.length > 2) {
      const title = titleRef.current.value;

      onAddLeaveType({ icon, title, color });

      // reset
      setIcon(icons[0]);
      setColor(colors[0]);
      titleRef.current.value = '';
    }
  };

  const onRemove = (id: string) => onRemoveLeaveType(id);

  return (
    <div className="w-full p-4">
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

              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Icon
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Color
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {leaveTypes.map((type) => (
              <tr key={type.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {type.title}
                </td>
                <td className={cl('whitespace-nowrap px-3 py-4', `text-${type.color}-500`)}>{type.icon}</td>
                <td className="flex whitespace-nowrap px-3 py-4">
                  <span className={cl('rounded-md w-4 h-4', `bg-${type.color}-500`)} />
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <button type="button" onClick={() => onRemove(type.id)}>
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
                <Dropdown title={icon}>
                  {icons.map((i, index) => (
                    <Dropdown.Item key={index}>
                      <button
                        onClick={() => setIcon(i)}
                        className={cl(`text-${color}-700`, 'cursor-pointer block p-2 text-sm')}
                      >
                        {i}
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
              <td className="whitespace-nowrap px-3 py-4">
                <button onClick={handleCreateType}>
                  <PlusIcon className="w-5 h-5 cursor-pointer text-primary-500" aria-hidden="true" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
