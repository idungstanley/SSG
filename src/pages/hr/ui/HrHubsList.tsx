import statusbox from '../../../assets/icons/statusbox.svg';
import CollapseIcon from '../../../components/Views/ui/collapseIcon/CollapseIcon';
import { cl } from '../../../utils';
import HrListMembers from './HrListMembers';
import React, { useState } from 'react';
import { SelectedHubs } from '../../../features/calendar/types/calendarSchema';
import { IHrTeamMemberInterface } from '../../../features/hr/hrTeamMembers.interface';
import { useAppSelector } from '../../../app/hooks';
import { selectCalendar } from '../../../features/calendar/slice/calendarSlice';

interface listItemProps {
  listItem: SelectedHubs;
  selectedHrTeamMembers: IHrTeamMemberInterface[];
  addHrItem: (hubId: string) => void;
}

export default function HrHubsList({ listItem, addHrItem, selectedHrTeamMembers }: listItemProps) {
  const [collapseTable, setCollapseTable] = useState(false);
  const [checkAllEmployeeCondition, setCheckAllEmployeeCondition] = useState(false);
  const [checkAllEmployeeData, setCheckAllEmployeeData] = useState<string[]>([]);
  const { hrTeamMembers } = useAppSelector(selectCalendar);

  const filteredTeamMembers = (hubId: string) => {
    return selectedHrTeamMembers.filter((i) => i.hub_id == hubId);
  };

  const checkTeamMembers = (hubId: string) => {
    return hrTeamMembers.filter((i) => i.hubId == hubId).length > 0;
  };

  const checkAllEmployee = () => {
    if (checkAllEmployeeCondition) {
      setCheckAllEmployeeCondition(false);
      setCheckAllEmployeeData([]);
    } else {
      setCheckAllEmployeeCondition(true);
      const filteredEmployees = filteredTeamMembers(listItem.hubId);
      const employeeIds = filteredEmployees.map((item) => item.id);
      setCheckAllEmployeeData(employeeIds);
    }
  };

  const employeeAction = (id: string) => {
    if (checkAllEmployeeData.filter((item) => item == id).length > 0) {
      setCheckAllEmployeeData(checkAllEmployeeData.filter((item) => item !== id));
    } else {
      setCheckAllEmployeeData([...checkAllEmployeeData, id]);
    }
  };

  return (
    <div className="w-full">
      <div
        className="pt-1 border-t-4 border-l-4 rounded-2xl bg-purple-50 pb-6 mb-3"
        style={{
          borderColor: listItem.hubColor ? listItem.hubColor : 'gray',
          transition: '.3s'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="flex items-center justify-between space-x-10 bg-purple-500 -mt-1 p-1 pr-7 rounded-tl-xl -ml-0.5 gap-4 h-8"
              style={{
                backgroundColor: listItem.hubColor ? listItem.hubColor : 'gray'
              }}
            >
              <div className="flex items-center pl-2 space-x-2 text-sm text-white w-fit cursor-pointer">
                <img src={statusbox} alt="" className="pr-1 border-r cursor-pointer" onClick={checkAllEmployee} />
                <CollapseIcon
                  color="#A854F7"
                  active={collapseTable}
                  onToggle={() => setCollapseTable((prev) => !prev)}
                  hoverBg="white"
                />
                <h1>{listItem.hubName}</h1>
              </div>
            </div>
          </div>
        </div>
        {!collapseTable && (
          <div>
            <div className="h-5 font-medium">
              <button
                onClick={() => addHrItem(listItem.hubId as string)}
                className={cl('text-left w-fit')}
                style={{ color: '#919191', fontSize: '11px', lineHeight: '13.2px', padding: '10px 0 10px 50px' }}
              >
                + NEW EMPLOYEE
              </button>
            </div>
            {checkTeamMembers(listItem.hubId) && (
              <section style={{ minHeight: '0', maxHeight: '83vh' }} className="w-full h-full pb-0 pr-10 space-y-10">
                <table className="w-full mt-2">
                  <thead>
                    <tr>
                      <td className="items-center text-center pb-1">Employee</td>
                      <td className="items-center text-center pb-1">Role</td>
                      <td className="items-center text-center pb-1">Work Location</td>
                      <td className="items-center text-center pb-1">Start Date</td>
                      <td className="items-center text-center pb-1">Salary</td>
                      <td className="items-center text-center pb-1">Time Taken Off</td>
                      <td className="items-center text-center pb-1">Allowance</td>
                    </tr>
                  </thead>
                  <tbody className="hr-table">
                    <HrListMembers
                      hrListItems={filteredTeamMembers(listItem.hubId)}
                      allEmployeeData={checkAllEmployeeData}
                      onChecked={employeeAction}
                    />
                  </tbody>
                </table>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
