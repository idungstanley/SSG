import { AvatarWithInitials } from '../../../../components';

interface MemberCardProps {
  initials: string;
  name: string;
  email: string;
}

export function MemberCard({ initials, name, email }: MemberCardProps) {
  return (
    <div className="w-72 bg-gray-50 py-1 px-2 flex space-x-2 items-center">
      <AvatarWithInitials width="w-6" height="h-6" initials={initials} />

      <div className="w-56">
        <h3 className="truncate text-sm font-medium text-gray-900">{name}</h3>
        <p className="truncate text-xs text-gray-500">{email}</p>
      </div>
    </div>
  );
}
