import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import ListNav from '../lists/components/renderlist/ListNav';
import { useGetHubChildren } from '../../../features/hubs/hubService';
import TaskListSections from './components/TaskListSections';
import Pilot from '../pilot';

function RenderHubs() {
  const { hubId } = useParams();
  const { activeItemName } = useAppSelector((state) => state.workspace);
  const { data: HubDetail } = useGetHubChildren({ query: hubId });
  console.log(HubDetail);
  return (
    <div className="h-screen">
      <section id="nav">
        <ListNav
          navName={activeItemName}
          viewsList="List"
          viewsList2="Board"
          changeViews="View"
        />
      </section>
      <section className="flex w-full h-full">
        {/* ListList */}
        <div className="w-full overflow-y-scroll">
          <div>
            {HubDetail?.data.hubs.map((data) => (
              <TaskListSections data={data} key={data.id} />
            ))}
            {HubDetail?.data.wallets.map((data) => (
              <TaskListSections data={data} key={data.id} />
            ))}
            {HubDetail?.data.lists.map((data) => (
              <TaskListSections data={data} key={data.id} />
            ))}
          </div>
        </div>
        <div className="ml-5">
          <Pilot />
        </div>
      </section>
    </div>
  );
}

export default RenderHubs;
