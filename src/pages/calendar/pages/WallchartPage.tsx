import Weeks from '../ui/Wallchart/Weeks';
import { MembersWithDays } from '../ui/Wallchart/MembersWithDays';

export function WallchartPage() {
  return (
    <section>
      {/* weeks */}
      <Weeks />

      {/* members with days */}
      <MembersWithDays />
    </section>
  );
}
