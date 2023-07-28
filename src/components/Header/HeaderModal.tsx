import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react';

interface HeaderModalprops {
  toggleFn: Dispatch<SetStateAction<boolean>>;
  clickAway?: boolean;
  children: ReactNode;
  styles?: string;
}

function HeaderModal({ toggleFn, clickAway, children, styles }: HeaderModalprops) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (clickAway && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        toggleFn(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [clickAway, toggleFn]);

  return (
    <div
      className={`rounded-lg shadow-2xl bg-alsoit-gray-50 absolute z-50 ${styles}`}
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      onMouseLeave={() => !clickAway && toggleFn(false)}
    >
      {children}
    </div>
  );
}

export default HeaderModal;
