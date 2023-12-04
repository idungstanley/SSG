import React from 'react';
import CollapseItems from '../../../../../../components/CollapseItems';
import PlusCircle from '../../../../../../assets/icons/AddCircle';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setCreateNew } from '../../../../../../features/workspace/workspaceSlice';

function AddProperty() {
  const dispatch = useAppDispatch();
  const { popoutItems } = useAppSelector((state) => state.workspace);

  return (
    <div>
      <CollapseItems
        open={popoutItems.createNew}
        handleToggle={() => dispatch(setCreateNew())}
        header="Create new"
        headerIcon={<PlusCircle color="white" />}
      >
        <div>Coming soon!</div>
      </CollapseItems>
    </div>
  );
}

export default AddProperty;
