import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  styles?: string;
}

export default function RadioWrapper({ children, styles }: Props) {
  return (
    <label htmlFor="radio" className={styles ? styles : 'flex space-x-2 items-center'}>
      <input type="radio" />
      {children}
    </label>
  );
}
