import { useCommunity } from '../../../features/community/communityService';
import { cl } from '../../../utils';

export default function Diagram() {
  const { data } = useCommunity();

  const graph = data?.graph ?? [];

  const membersTotal = data?.team_members.length;

  return (
    <section className="relative w-full border rounded-md shadow-md flex flex-col gap-2 px-3 pt-8">
      <div className="absolute top-2 left-2 flex gap-1 items-center">
        <span className="w-1 h-1 rounded-full bg-orange-500" />
        <p className="uppercase text-ultraXs font-light text-gray-400">people online</p>
      </div>
      <div className="flex gap-4 items-center overflow-x-scroll w-full h-[120px]">
        {graph.map((item) => (
          <div key={item.hour} className="flex flex-col gap-4 items-center h-[100px]">
            <div className="flex items-end h-[100px]">
              <div
                title={`${item.count} ${item.count === 1 ? 'user' : 'users'}`}
                className={cl(
                  item.count ? 'from-orange-600 to-orange-200' : 'bg-white',
                  'rounded-sm w-3 bg-gradient-to-t cursor-pointer'
                )}
                // Set col height by users online
                style={{
                  height: membersTotal ? Math.round((item.count * 100) / membersTotal) + '%' : 0
                }}
              />
            </div>

            <p className="text-xs text-gray-800">{item.hour}h</p>
          </div>
        ))}
      </div>
    </section>
  );
}
