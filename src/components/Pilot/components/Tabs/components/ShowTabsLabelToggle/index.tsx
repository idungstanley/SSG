import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from '@heroicons/react/24/outline';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { cl } from '../../../../../../utils';
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
    <button
      type="button"
      onClick={toggleShowTabLabel}
      className={cl(
        'border bg-white absolute flex items-center justify-center text-gray-600',
        showTabLabel ? 'right-6 top-0 w-4 h-4' : 'w-4 h-4 right-1 top-2'
      )}
    >
      {showTabLabel ? <ChevronDoubleUpIcon className="w-4 h-4" /> : <ChevronDoubleDownIcon className="w-4 h-4" />}
    </button>
  ) : null;
}

export default memo(ShowTabsLabelToggle);
