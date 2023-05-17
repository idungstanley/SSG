import { AvatarWithInitials } from '../../../../components';

interface MemberCardProps {
  initials: string;
  name: string;
  email: string;
}

export function MemberCard({ initials, name, email }: MemberCardProps) {
  return (
    <div className="w-72 bg-gray-50 p-2 flex space-x-2 items-center">
      <AvatarWithInitials initials={initials} />

      <div className="space-y-3 w-56">
        <h3 className="truncate text-sm font-medium text-gray-900">{name}</h3>
        <p className="mt-1 truncate text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
}
