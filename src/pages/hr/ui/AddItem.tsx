import React from 'react';
import DayDatePicker from './DayDatePicker';
import { ITeamMembersAndGroup } from '../../../features/settings/teamMembersAndGroups.interfaces';
import { SelectEmployee } from './selects/SelectEmployee';
import { SelectRole } from './selects/SelectRole';
import { SelectLocation } from './selects/SelectLocation';

interface AddDayFieldProps {
  onClose: VoidFunction;
  members: ITeamMembersAndGroup[];
}

export function AddItem({ onClose, members }: AddDayFieldProps) {
  const onClickSave = () => {
    onClose();
  };

  return (
    <table className="mt-5">
      <thead>
        <tr>
          <td className="items-center text-center pb-1">Employee</td>
          <td className="items-center text-center pb-1">Role</td>
          <td className="items-center text-center pb-1">Work Location</td>
          <td className="items-center text-center pb-1">Start Date</td>
          <td className="items-center text-center pb-1">Salary</td>
          <td className="items-center text-center pb-1">Allowance</td>
          <td className="items-center text-center pb-1"></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="items-center pr-3 pl-3">
            <SelectEmployee members={members} />
          </td>
          <td className="items-center pr-3 pl-3">
            <SelectRole />
          </td>
          <td className="items-center pr-3 pl-3">
            <SelectLocation />
          </td>
          <td className="items-center pr-3 pl-3">
            <DayDatePicker />
          </td>
          <td className="items-center pr-3 pl-3">
            <div className="flex items-center h-12 mx-2 border-t opacity-90">
              <input id="hr_salary" type="text" />
            </div>
          </td>
          <td className="items-center pr-3 pl-3">
            <div className="flex items-center h-12 mx-2 border-t opacity-90">
              <input id="hr_allowance" type="text" />
            </div>
          </td>
          <td className="items-center pr-3 pl-3">
            <button
              onClick={onClickSave}
              className="flex items-center px-6 py-1 text-sm text-white rounded-md cursor-pointer bg-alsoit-success"
            >
              Save
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
