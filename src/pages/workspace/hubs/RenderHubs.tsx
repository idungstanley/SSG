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

  return (
    <div className="h-screen overflow-auto">
      <section id="nav">
        <ListNav
          navName={activeItemName}
          viewsList="List"
          viewsList2="Board"
          changeViews="View"
        />
      </section>
      <section className="flex w-full">
        {/* ListList */}
        <div className="w-7/12">
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
        <div className="ml-auto">
          <Pilot />
        </div>
      </section>
    </div>
  );
}

export default RenderHubs;
