import { useEffect, useRef, useState } from 'react';
import { IActivityLog } from '../../../../../features/general/history/history.interfaces';
import { SlideButton } from '../../../../SlideButton';
import { componentModals } from '..';

type HistoryColModalProps = {
  model: IActivityLog[] | undefined;
  toggleFn: React.Dispatch<React.SetStateAction<componentModals>>;
};

export function HistoryColModal({ model, toggleFn }: HistoryColModalProps) {
  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleChange = (index: number): void => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  const handleCloseModal = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      toggleFn((prev) => ({ ...prev, showHideColModal: false }));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseModal);
    return () => document.removeEventListener('mousedown', handleCloseModal);
  }, []);

  // Convert the model array to a set to get unique values
  const uniqueModelSet = new Set(model?.map((item) => item.model));

  // Convert the set back to an array for rendering
  const uniqueModelArray = Array.from(uniqueModelSet);

  return (
    <div
      className="flex flex-col space-y-2 bg-white absolute top-5 right-5 shadow-2xl rounded-lg w-56 max-h-96 z-50 p-2 overflow-auto"
      ref={modalRef}
    >
      <div className="border-b-2">
        <span className="text-sm capitalize">show all</span>
      </div>
      {uniqueModelArray.map((modelItem, i) => (
        <div key={modelItem} className="capitalize py-1 flex justify-between">
          <span>{modelItem}</span>
          <SlideButton changeFn={handleChange} index={i} state={checkedStates} />
        </div>
      ))}
    </div>
  );
}
