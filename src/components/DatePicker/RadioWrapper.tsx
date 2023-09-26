import { Dispatch, ReactNode, SetStateAction } from 'react';

interface Props {
  children: ReactNode;
  styles?: string;
  stateValue?: string;
  btnCheckState?: boolean;
  checkStateFn?: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}

export default function RadioWrapper({ children, styles, btnCheckState, checkStateFn, stateValue }: Props) {
  return (
    <label
      htmlFor="radio"
      className={styles ? styles : 'flex space-x-2 py-1.5 items-center hover:bg-alsoit-purple-50 cursor-pointer'}
    >
      <input
        type="radio"
        checked={btnCheckState}
        onClick={() =>
          checkStateFn && stateValue && checkStateFn((prev) => ({ ...prev, [stateValue]: !prev[stateValue] }))
        }
        className="cursor-pointer"
      />
      {children}
    </label>
  );
}
