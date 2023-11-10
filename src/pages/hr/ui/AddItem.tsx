import React, { useState } from 'react';
import DayDatePicker from './DayDatePicker';
import { ITeamMembersAndGroup } from '../../../features/settings/teamMembersAndGroups.interfaces';
import { SelectEmployee } from './selects/SelectEmployee';
import { SelectRole } from './selects/SelectRole';
import { SelectLocation } from './selects/SelectLocation';
import { useAddHrTeamMember } from '../../../features/hr/hrTeamMembersService';
import dayjs from 'dayjs';
import { useAppSelector } from '../../../app/hooks';

interface AddDayFieldProps {
  onClose: VoidFunction;
  members: ITeamMembersAndGroup[];
  hubId: string;
}

export function AddItem({ onClose, members, hubId }: AddDayFieldProps) {
  const { selectedDate } = useAppSelector((state) => state.workspace);
  const currentDate = selectedDate?.date ? dayjs(selectedDate.date).format('YYYY-MM-DD') : '';
  const [hrTeamMemberToAdd, setHrTeamMemberToAdd] = useState('');
  const selectHrTeamMember = (memberId: string) => {
    setHrTeamMemberToAdd(memberId);
  };

  const [hrTeamMemberRole, setHrTeamMemberRole] = useState('');
  const selectMemberRole = (role: string) => {
    setHrTeamMemberRole(role);
  };

  const [hrTeamMemberLocation, setHrTeamMemberLocation] = useState('');
  const selectMemberLocation = (location: string) => {
    setHrTeamMemberLocation(location);
  };

  const [hrSalaryValue, setHrSalaryValue] = useState('');
  const handleSalaryChange = (salary: string) => {
    setHrSalaryValue(salary);
  };

  const [hrAllowanceValue, setHrAllowanceValue] = useState('');
  const handleAllowanceChange = (allowance: string) => {
    setHrAllowanceValue(allowance);
  };

  const addedResponse = useAddHrTeamMember(
    hubId,
    hrTeamMemberToAdd,
    hrTeamMemberRole,
    currentDate,
    hrTeamMemberLocation,
    hrSalaryValue,
    hrAllowanceValue
  );

  const onClickSave = () => {
    addedResponse.refetch({
      queryKey: [
        'AddHrTeamMember',
        hubId,
        hrTeamMemberToAdd,
        hrTeamMemberRole,
        currentDate,
        hrTeamMemberLocation,
        hrSalaryValue,
        hrAllowanceValue
      ]
    });
    setHrTeamMemberToAdd('');
    setHrTeamMemberRole('');
    setHrTeamMemberLocation('');
    onClose();
  };

  return (
    <div
      className="fixed w-full h-full flex flex-wrap justify-center content-center z-20"
      style={{ background: 'rgba(0,0,0,.5', top: '0', left: '0' }}
    >
      <div className="w-1/4 bg-white h-fit p-5">
        <h2 className="uppercase text-center pb-10">Add new item to Hub1</h2>
        <div className="flex justify-between w-full">
          <div className="w-2/4 text-center">
            <h3 className="w-full text-center py-2">Employee</h3>
            <SelectEmployee members={members} selectHrTeamMember={selectHrTeamMember} />
          </div>
          <div className="w-2/4 text-center">
            <h3 className="w-full text-center py-2">Role</h3>
            <SelectRole selectMemberRole={selectMemberRole} />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="w-2/4 text-center">
            <h3 className="w-full text-center py-2">Work Location</h3>
            <SelectLocation selectMemberLocation={selectMemberLocation} />
          </div>
          <div className="w-2/4 text-center">
            <h3 className="w-full text-center py-2">Start Date</h3>
            <DayDatePicker />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="w-2/4 text-center">
            <h3 className="w-full text-center py-2">Salary</h3>
            <div className="flex items-center h-12 mx-2 opacity-90 w-11/12">
              <input
                id="hr_salary"
                type="text"
                className="w-full"
                value={hrSalaryValue}
                onChange={(e) => handleSalaryChange(e.target.value)}
              />
            </div>
          </div>
          <div className="w-2/4 text-center">
            <h3 className="w-full text-center py-2">Allowance</h3>
            <div className="flex items-center h-12 mx-2 opacity-90 w-11/12">
              <input
                id="hr_allowance"
                type="text"
                className="w-full"
                value={hrAllowanceValue}
                onChange={(e) => handleAllowanceChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full pt-10">
          <button
            onClick={onClickSave}
            className="flex items-center mx-2 px-6 py-1 text-sm text-white rounded-md cursor-pointer bg-alsoit-success"
          >
            Save
          </button>
          <button
            onClick={onClickSave}
            className="flex items-center mx-2 px-6 py-1 text-sm text-white rounded-md cursor-pointer bg-alsoit-danger"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
