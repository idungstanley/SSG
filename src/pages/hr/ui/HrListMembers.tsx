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
              <td className="p-5 w-1/4" style={{ borderRight: '0.5px solid #B2B2B2' }}>
                {hrListItem.team_member.user.name}
              </td>
              <td className="p-5 text-center w-1/6">{hrListItem.hr_role}</td>
              <td className="p-5 text-center w-1/6">{hrListItem.location}</td>
              <td className="p-5 text-center w-1/12">{dayjs(hrListItem.start_date).format('DD/MM/YYYY')}</td>
              <td className="p-5 text-center w-1/12">
                {hrListItem.salary_currency}
                {hrListItem.salary} PA
              </td>
              <td className="p-5 text-center w-1/12">22 Days</td>
              <td className="p-5 text-center w-1/12">{hrListItem.allowance} Days</td>
            </tr>
          )
      )}
    </>
  );
}
