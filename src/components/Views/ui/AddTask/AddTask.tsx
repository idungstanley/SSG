import { useRef } from 'react';
import { useAddTask } from '../../../../features/task/taskService';
import { cl } from '../../../../utils';

interface AddTaskFieldProps {
  onClose: VoidFunction;
  parentId: string;
  paddingLeft?: number;
  isListParent?: boolean;
  columnsCount: number;
}

export function AddTask({ onClose, paddingLeft, parentId, isListParent, columnsCount }: AddTaskFieldProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const { mutate: onAdd } = useAddTask(!isListParent ? parentId : undefined);

  const onClickSave = () => {
    if (nameRef.current) {
      const name = nameRef.current.value;

      onAdd({
        name,
        isListParent: !!isListParent,
        id: parentId
      });
    }
  };

  return (
    <tr className="contents group">
      <td style={{ paddingLeft }} className="z-20 w-full flex items-center">
        <div className="h-full w-10 bg-primary-50"></div>
        <div className="border-t flex items-center w-full h-12 bg-white opacity-90">
          <input
            ref={nameRef}
            required
            minLength={2}
            type="text"
            autoFocus
            placeholder="Enter task name"
            className="border-transparent text-sm appearance-none focus:border-transparent focus:ring-0 flex-grow"
          />
        </div>
        <div className="absolute right-2 flex space-x-2">
          <Button onClick={onClickSave} primary label="Save" />
          <Button onClick={onClose} label="Cancel" />
        </div>
      </td>

      {[...Array(columnsCount)].map((_, index) => (
        <td
          key={index}
          className="z-10 border-t bg-white w-full h-full opacity-90 flex items-center justify-center"
        ></td>
      ))}
    </tr>
  );
}

interface ButtonProps {
  label: string;
  onClick?: VoidFunction;
  primary?: boolean;
}

function Button({ label, onClick, primary }: ButtonProps) {
  return (
    <button
      type={primary ? 'submit' : 'button'}
      className={cl(
        'p-1 font-semibold border uppercase',
        primary ? 'bg-primary-400 border-primary-400 text-white' : 'bg-white border-gray-400'
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
