import React, { useEffect, useRef } from 'react';

interface Props {
  header: string;
  subHeader: string;
  children: React.ReactNode;
  styles: string;
  subStyles?: string;
  closeModal: () => void;
}

export function TabsDropDown({ children, closeModal, header, subHeader, styles, subStyles }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickAway);

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`fixed z-40 flex flex-col p-2 space-y-3 bg-white rounded-md shadow-xl ${styles}`}
      ref={modalRef}
    >
      <div className="flex flex-col space-y-3.5">
        <span className="font-semibold text-center uppercase">{header}</span>
        <div className="relative border-b-2">
          <span
            className={`absolute bg-white px-1.5 py-0.5 uppercase text-alsoit-text-sm font-semibold -top-2 ${
              subStyles ? subStyles : 'left-10'
            }`}
          >
            {subHeader}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
