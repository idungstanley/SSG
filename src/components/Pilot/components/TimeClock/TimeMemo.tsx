import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { ITimerDetails } from '../../../../features/task/interface.tasks';
import { setTimerDetails } from '../../../../features/task/taskSlice';

interface Props {
  timerDetails: ITimerDetails;
  closeModal: () => void;
}

export function TimeMemo({ timerDetails, closeModal }: Props) {
  const dispatch = useAppDispatch();

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickAway);

    return () => document.removeEventListener('mousedown', handleClickAway);
  }, []);
  return (
    <div className="w-full shadow-xl absolute top-7 right-64 z-40" onClick={(e) => e.stopPropagation()} ref={modalRef}>
      <textarea
        name="description"
        id="timeMemo"
        className="rounded-md w-72 h-28 text-alsoit-gray-200 text-alsoit-text-md"
        value={timerDetails.description}
        onChange={(e) => dispatch(setTimerDetails({ ...timerDetails, description: e.target.value }))}
      ></textarea>
    </div>
  );
}
