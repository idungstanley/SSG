import { Dispatch, ReactNode, SetStateAction } from 'react';

interface HeaderModalprops {
  toggleFn: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  styles?: string;
}

function HeaderModal({ toggleFn, children, styles }: HeaderModalprops) {
  return (
    <div
      className={`rounded-lg shadow-2xl bg-alsoit-gray-50 absolute z-50 ${styles}`}
      tabIndex={0}
      onMouseLeave={() => toggleFn(false)}
    >
      {children}
    </div>
  );
}

export default HeaderModal;
