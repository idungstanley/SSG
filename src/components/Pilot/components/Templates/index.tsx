import React from 'react';
import Header from './Components/Header';
import CreateNewColumn from './Components/CreateNewColumn';
import { useAppSelector } from '../../../../app/hooks';
import EditDropdown from './Edit/EditDropdown';

function Templates() {
  const { entityForCustom, editCustomProperty } = useAppSelector((state) => state.task);
  return (
    <div className="h-full w-full overflow-scroll">
      <Header />
      {entityForCustom.id && entityForCustom.type && <CreateNewColumn />}
      {editCustomProperty && <EditDropdown />}
    </div>
  );
}

export default Templates;
