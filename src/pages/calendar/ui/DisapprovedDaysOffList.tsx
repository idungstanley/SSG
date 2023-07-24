import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import FullScreenMessage from '../../../components/CenterMessage/FullScreenMessage';
import {
  useApproveDayOff,
  useDisapproveDayOff,
  useDisapprovedDaysOff
} from '../../../features/calendar/api/daysOffApi';
import DisapprovedDayOffCard from './DisapprovedDayOffCard';

export const MOCKED_HUB_ID = 'a6a875b9-3d82-465a-8c4b-a0cba13dfed6';

export default function DisapprovedDaysOffList() {
  const { data: disapprovedDaysOff } = useDisapprovedDaysOff(MOCKED_HUB_ID);
  const { mutate: onApprove } = useApproveDayOff(MOCKED_HUB_ID);
  const { mutate: onDisapprove } = useDisapproveDayOff(MOCKED_HUB_ID);

  return disapprovedDaysOff ? (
    !disapprovedDaysOff.length ? (
      <FullScreenMessage title="There are no requests." description="Add one." showHalFScreen />
    ) : (
      <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {disapprovedDaysOff?.map((dayOff) => (
          <DisapprovedDayOffCard
            userName={dayOff.team_member.user.name}
            roleName={dayOff.team_member.role.name}
            userEmail={dayOff.team_member.user.email}
            userInitials={dayOff.team_member.user.initials}
            key={dayOff.id}
            reason={dayOff.reason}
            startDate={dayjs(dayOff.start_date).format('MMMM D, YYYY')}
            endDate={dayjs(dayOff.end_date).format('MMMM D, YYYY')}
            actions={
              <div className="grid grid-cols-2 py-1">
                <div className="flex w-full h-full items-center justify-center">
                  <button onClick={() => onDisapprove(dayOff.id)} className="text-red-900 p-2">
                    <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex w-full h-full items-center justify-center">
                  <button onClick={() => onApprove(dayOff.id)} className="text-green-900 p-2">
                    <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            }
          />
        ))}
      </ul>
    )
  ) : null;
}
