interface MemberProperties {
  member: {
    color: string | undefined;
    id: string;
    name?: string;
    is_active?: boolean;
    invited_at: boolean;
    user: {
      color: string | undefined;
      name: string;
      id: string;
      email: string;
      initials: string;
      avatar_path?: string | null;
    };
    initials: string;
    colour: string;
    role: {
      key: string;
      name: string;
    };
  };
}

export default function HrListMembers({ member }: MemberProperties) {
  //STATIC DEMO DATA

  return (
    <>
      <tr className="border-b-2" style={{ borderColor: '#B2B2B2' }}>
        <td className="p-5 border-r-2" style={{ borderColor: '#B2B2B2' }}>
          {member.user.name}
        </td>
        <td className="p-5 text-center">Administrator</td>
        <td className="p-5 text-center">London</td>
        <td className="p-5 text-center">12/05/2017</td>
        <td className="p-5 text-center">£40,000 PA</td>
        <td className="p-5 text-center">22 Days</td>
        <td className="p-5 text-center">13 Days</td>
      </tr>
    </>
  );
}
