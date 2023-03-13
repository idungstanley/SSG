import React from 'react';
import { dataProps } from './ListTemplate';
import BoardHubData from './BoardHubData';
import { useAppSelector } from '../../../../../../../app/hooks';

export default function TaskBoardSection({ data }: { data: dataProps }) {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const { show } = pilotSideOver;

  return (
    <section key={data.id} className="bg-gray-100 pt-5 pl-5">
      <div className={`${show === false ? 'fgoverflow2' : 'fgoverflow'}`}>
        <BoardHubData hubId={data.id} hubName={data.name} />
      </div>
    </section>
  );
}
