import { IHrTeamMemberInterface } from '../../../features/hr/hrTeamMembers.interface';
import { useAppSelector } from '../../../app/hooks';
import { selectCalendar } from '../../../features/calendar/slice/calendarSlice';
import dayjs from 'dayjs';

interface MembersProperties {
  hrListItems: IHrTeamMemberInterface[];
}

export default function HrListMembers({ hrListItems }: MembersProperties) {
  const { hrTeamMembers } = useAppSelector(selectCalendar);

  const checkSelectedMembers = (id: string, hubId: string) => {
    return hrTeamMembers.filter((hrTeamMember) => hrTeamMember.uuid == id + hubId).length > 0;
  };

  return (
    <>
      {hrListItems.map(
        (hrListItem: IHrTeamMemberInterface, key: number) =>
          checkSelectedMembers(hrListItem.team_member.id, hrListItem.hub_id) && (
            <tr key={key} style={{ borderBottom: '0.5px solid #B2B2B2' }}>
              <td className="w-1/4 p-5" style={{ borderRight: '0.5px solid #B2B2B2' }}>
                {hrListItem.team_member.user.name}
              </td>
              <td className="w-1/6 p-5 text-center">{hrListItem.hr_role}</td>
              <td className="w-1/6 p-5 text-center">{hrListItem.location}</td>
              <td className="w-1/12 p-5 text-center">{dayjs(hrListItem.start_date).format('DD/MM/YYYY')}</td>
              <td className="w-1/12 p-5 text-center">
                {hrListItem.salary_currency}
                {hrListItem.salary} PA
              </td>
              <td className="w-1/12 p-5 text-center">22 Days</td>
              <td className="w-1/12 p-5 text-center">{hrListItem.allowance} Days</td>
            </tr>
          )
      )}
    </>
  );
}
