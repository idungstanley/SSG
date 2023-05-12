import Dropdown from '../../../../components/Dropdown/VoidDropdown';
import { cl } from '../../../../utils';
import { colors } from '../../lib/config';

interface SelectProps {
  setColor: (i: string) => void;
  color: string;
}

export function SelectColor({ setColor, color }: SelectProps) {
  return (
    <Dropdown title={<span className={cl('rounded-md w-4 h-4', `bg-${color}-500`)} />}>
      {colors.map((i, index) => (
        <Dropdown.Item key={index}>
          <button
            onClick={() => setColor(i)}
            className={cl('rounded-md cursor-pointer block w-4 m-1 h-4 p-2 text-sm', `bg-${i}-500`)}
          ></button>
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}
