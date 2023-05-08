import { AvatarWithInitials } from '../../../components';

interface DisapprovedDayOffCardProps {
  userName: string;
  roleName: string;
  userEmail: string;
  userInitials?: string;
  reason: string | null;
  startDate: string;
  endDate: string;
  actions: JSX.Element;
}

export default function DisapprovedDayOffCard({
  userName,
  roleName,
  userEmail,
  userInitials,
  reason,
  startDate,
  endDate,
  actions
}: DisapprovedDayOffCardProps) {
  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      {/* user info */}
      <div className="flex w-full items-center justify-between space-x-6 p-3">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">{userName}</h3>
            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-primary-50 border border-primary-300 px-1.5 py-0.5 text-xs font-medium text-primary-700">
              {roleName}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">{userEmail}</p>
        </div>
        <AvatarWithInitials initials={userInitials ?? ''} />
      </div>

      {/* day off info */}
      <dl className="divide-y divide-gray-100 px-2 py-1 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-1">
          <dt className="text-gray-500">Start</dt>
          <dd className="text-gray-700">
            <p>{startDate}</p>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-1">
          <dt className="text-gray-500">End</dt>
          <dd className="text-gray-700">
            <p>{endDate}</p>
          </dd>
        </div>
        <div className="py-1">
          <dd className="text-gray-700">
            <p>{reason ?? 'No reason'}</p>
          </dd>
        </div>
      </dl>

      {actions}
    </li>
  );
}
