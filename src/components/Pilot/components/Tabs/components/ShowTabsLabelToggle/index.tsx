import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from '@heroicons/react/24/outline';
import { memo } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { cl } from '../../../../../../utils';

const pilotFromLS = JSON.parse(localStorage.getItem('pilot') || '""') as { tabOrder: number[]; showTabLabel: boolean };

interface ShowTabsLabelToggleProps {
  showTabLabel: boolean;
  setShowTabLabel: (i: boolean) => void;
}

function ShowTabsLabelToggle({ showTabLabel, setShowTabLabel }: ShowTabsLabelToggleProps) {
  const { show } = useAppSelector((state) => state.slideOver.pilotSideOver);

  const toggleShowTabLabel = () => {
    localStorage.setItem(
      'pilot',
      JSON.stringify({
        ...pilotFromLS,
        showTabLabel: !showTabLabel
      })
    );
    setShowTabLabel(!showTabLabel);
  };

  return show ? (
    <button
      type="button"
      onClick={toggleShowTabLabel}
      className={cl(
        'border flex items-center justify-center text-gray-600',
        showTabLabel ? 'absolute right-1 top-1 w-7 h-7' : 'p-2 w-8 h-9'
      )}
    >
      {showTabLabel ? <ChevronDoubleUpIcon className="w-4 h-4" /> : <ChevronDoubleDownIcon className="w-4 h-4" />}
    </button>
  ) : null;
}

export default memo(ShowTabsLabelToggle);
