import React from 'react';
import Header from './Components/Header';
import CreateNewColumn from './Components/CreateNewColumn';
import { useAppSelector } from '../../../../app/hooks';

function Templates() {
  const { entityForCustom } = useAppSelector((state) => state.task);
  return (
    <div className="h-full w-full overflow-scroll">
      <Header />
      {entityForCustom.id && entityForCustom.type && <CreateNewColumn />}
    </div>
  );
}

export default Templates;
