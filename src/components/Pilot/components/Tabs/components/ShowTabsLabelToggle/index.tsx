import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setShowTabLabel } from '../../../../../../features/workspace/workspaceSlice';

const pilotFromLS = JSON.parse(localStorage.getItem('pilot') || '""') as { tabOrder: number[]; showTabLabel: boolean };

function ShowTabsLabelToggle() {
  const dispatch = useAppDispatch();
  const { show } = useAppSelector((state) => state.slideOver.pilotSideOver);
  const { showTabLabel } = useAppSelector((state) => state.workspace);

  const toggleShowTabLabel = () => {
    localStorage.setItem(
      'pilot',
      JSON.stringify({
        ...pilotFromLS,
        showTabLabel: !showTabLabel
      })
    );
    dispatch(setShowTabLabel(!showTabLabel));
  };

  return show ? (
    <label className="switch">
      <input className="inputShow" type="checkbox" checked={showTabLabel} onChange={() => toggleShowTabLabel} />
      <div className={`slider ${showTabLabel ? 'checked' : ''} `}></div>
    </label>
  ) : null;
}

export default memo(ShowTabsLabelToggle);
