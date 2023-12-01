import React from 'react';
import CollapseItems from '../../../../../../components/CollapseItems';
import PlusCircle from '../../../../../../assets/icons/AddCircle';

function AddProperty() {
  return (
    <div>
      <CollapseItems header="Create new" headerIcon={<PlusCircle color="white" />}>
        <div></div>
      </CollapseItems>
    </div>
  );
}

export default AddProperty;
