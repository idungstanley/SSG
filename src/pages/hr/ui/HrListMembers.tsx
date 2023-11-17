import { IHrTeamMemberInterface } from '../../../features/hr/hrTeamMembers.interface';
import { useAppSelector } from '../../../app/hooks';
import { selectCalendar } from '../../../features/calendar/slice/calendarSlice';
import dayjs from 'dayjs';
import { Checkbox } from '../../../components/Checkbox/Checkbox';
import Dradnddrop from '../../../assets/icons/Dradnddrop';
import AvatarWithImage from '../../../components/avatar/AvatarWithImage';
import React from 'react';

interface MembersProperties {
  hrListItems: IHrTeamMemberInterface[];
  allEmployeeData: string[];
  onChecked: (id: string) => void;
}

export default function HrListMembers({ hrListItems, allEmployeeData, onChecked }: MembersProperties) {
  const { hrTeamMembers } = useAppSelector(selectCalendar);

  const checkSelectedMembers = (id: string, hubId: string) => {
    return hrTeamMembers.filter((hrTeamMember) => hrTeamMember.uuid == id + hubId).length > 0;
  };

  const checkEmployee = (id: string) => {
    return allEmployeeData.filter((i) => i == id).length > 0;
  };

  return (
    <>
      {hrListItems.map(
        (hrListItem: IHrTeamMemberInterface, key: number) =>
          checkSelectedMembers(hrListItem.team_member.id, hrListItem.hub_id) && (
            <tr key={key} style={{ opacity: 100 }} className="relative group dNFlex h-10">
              <td
                className="sticky left-0 z-10 flex items-center justify-start text-sm font-medium text-gray-900 cursor-pointer text-start h-10 w-full"
                style={{
                  borderRight: '0.5px solid #B2B2B2'
                }}
              >
                <div
                  className="flex items-center h-full ml-1 space-x-1"
                  style={{
                    paddingRight: '5px'
                  }}
                >
                  <div
                    className={`hr-checkbox-wrapper flex justify-center items-center group-hover:opacity-100 ${
                      checkEmployee(hrListItem.id) ? 'hr-member-checked' : ''
                    }`}
                  >
                    <Checkbox
                      styles="text-primary-500 focus:ring-primary-500 hr-checkbox"
                      checked={checkEmployee(hrListItem.id)}
                      setChecked={() => onChecked(hrListItem.id)}
                    />
                  </div>
                  <div className="text-lg text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100">
                    <Dradnddrop />
                  </div>
                </div>
                <div
                  className={`relative w-full flex items-center bg-white pl-1 h-full hr-border-white-top hr-border-gray-bottom hr-border-white-left ${
                    checkEmployee(hrListItem.id)
                      ? 'hr-border-purple-top hr-border-purple-bottom hr-border-purple-left'
                      : ''
                  }`}
                >
                  <div className="group flex gap-2 items-center justify-start rounded-full">
                    <div
                      title={hrListItem.team_member.user.name}
                      className="bg-gray-200 relative rounded-full flex items-center justify-center transform transition"
                      style={{
                        backgroundColor: hrListItem.team_member.user.color ? hrListItem.team_member.user.color : '',
                        width: '29px',
                        height: '29px',
                        outline: '0.5px solid rgb(247, 161, 0)',
                        padding: '1px'
                      }}
                    >
                      {hrListItem.team_member.is_online && (
                        <span
                          className="absolute z-10 border-white rounded-full bg-green-500"
                          style={{ top: '-1px', right: '-1px', width: '9px', height: '9px', borderWidth: '1px' }}
                        />
                      )}
                      {hrListItem.team_member.user.avatar_path ? (
                        <div className=" rounded-full">
                          <AvatarWithImage
                            image_path={hrListItem.team_member.user.avatar_path}
                            height={'h-7'}
                            width={'w-7'}
                          />
                        </div>
                      ) : (
                        <span className="text-white font-medium" style={{ fontSize: '10px' }}>
                          {hrListItem.team_member.user.initials}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="pl-2">
                    <div className="font-medium" style={{ fontSize: '13px', color: '#424242', lineHeight: '15.6px' }}>
                      {hrListItem.team_member.user.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#626262', lineHeight: '13.2px' }}>
                      {hrListItem.team_member.user.email}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div
                  className={`w-full flex items-center justify-center text-center bg-white w-2/12 font-medium hr-border-white-top hr-border-gray-bottom ${
                    checkEmployee(hrListItem.id) ? 'hr-border-purple-top hr-border-purple-bottom' : ''
                  }`}
                  style={{
                    fontSize: '13px',
                    color: '#424242',
                    lineHeight: '15.6px',
                    height: '40px'
                  }}
                >
                  {hrListItem.hr_role}
                </div>
              </td>
              <td>
                <div
                  className={`w-full flex items-center justify-center text-center bg-white w-2/12 font-medium hr-border-white-top hr-border-gray-bottom ${
                    checkEmployee(hrListItem.id) ? 'hr-border-purple-top hr-border-purple-bottom' : ''
                  }`}
                  style={{
                    fontSize: '13px',
                    color: '#424242',
                    lineHeight: '15.6px',
                    height: '40px'
                  }}
                >
                  {hrListItem.location}
                </div>
              </td>
              <td>
                <div
                  className={`w-full flex items-center justify-center text-center bg-white w-2/12 font-medium hr-border-white-top hr-border-gray-bottom ${
                    checkEmployee(hrListItem.id) ? 'hr-border-purple-top hr-border-purple-bottom' : ''
                  }`}
                  style={{
                    fontSize: '13px',
                    color: '#424242',
                    lineHeight: '15.6px',
                    height: '40px'
                  }}
                >
                  {dayjs(hrListItem.start_date).format('DD/MM/YYYY')}
                </div>
              </td>
              <td>
                <div
                  className={`w-full flex items-center justify-center text-center bg-white w-2/12 font-medium hr-border-white-top hr-border-gray-bottom ${
                    checkEmployee(hrListItem.id) ? 'hr-border-purple-top hr-border-purple-bottom' : ''
                  }`}
                  style={{
                    fontSize: '13px',
                    color: '#424242',
                    lineHeight: '15.6px',
                    height: '40px'
                  }}
                >
                  {hrListItem.salary_currency}
                  {hrListItem.salary} PA
                </div>
              </td>
              <td>
                <div
                  className={`w-full flex items-center justify-center text-center bg-white w-2/12 font-medium hr-border-white-top hr-border-gray-bottom ${
                    checkEmployee(hrListItem.id) ? 'hr-border-purple-top hr-border-purple-bottom' : ''
                  }`}
                  style={{
                    fontSize: '13px',
                    color: '#424242',
                    lineHeight: '15.6px',
                    height: '40px'
                  }}
                >
                  22 Days
                </div>
              </td>
              <td>
                <div
                  className={`w-full flex items-center justify-center text-center bg-white w-2/12 font-medium hr-border-white-top hr-border-gray-bottom hr-border-white-right ${
                    checkEmployee(hrListItem.id)
                      ? 'hr-border-purple-top hr-border-purple-bottom hr-border-purple-right'
                      : ''
                  }`}
                  style={{
                    fontSize: '13px',
                    color: '#424242',
                    lineHeight: '15.6px',
                    height: '40px'
                  }}
                >
                  {hrListItem.allowance} Days
                </div>
              </td>
            </tr>
          )
      )}
    </>
  );
}
