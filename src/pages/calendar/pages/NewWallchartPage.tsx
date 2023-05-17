import Weeks from '../ui/Wallchart/Weeks';
import { MembersWithDays } from '../ui/Wallchart/MembersWithDays';

export default function NewWallchart() {
  return (
    <section>
      {/* weeks */}
      <Weeks />

      {/* members with days */}
      <MembersWithDays />
    </section>
  );
}
