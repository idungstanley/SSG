import { useRef } from 'react';
import { useAddTask } from '../../../../features/task/taskService';
import { cl } from '../../../../utils';

interface AddTaskFieldProps {
  onClose: VoidFunction;
  parentId: string;
  paddingLeft?: number;
  isListParent?: boolean;
}

export function AddTask({ onClose, paddingLeft, parentId, isListParent }: AddTaskFieldProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const { mutate: onAdd } = useAddTask(!isListParent ? parentId : undefined);

  const onClickSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <form style={{ paddingLeft }} onSubmit={onClickSave} className="flex items-center w-full">
      <input
        ref={nameRef}
        required
        minLength={2}
        type="text"
        autoFocus
        placeholder="Enter task name"
        className="border-transparent appearance-none text-xs focus:border-transparent focus:ring-0 flex-grow"
      />

      <Button primary label="Save" />
      <Button onClick={onClose} label="Cancel" />
    </form>
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
        'p-1 text-lg font-semibold border uppercase',
        primary ? 'bg-primary-400 border-primary-400' : 'bg-white border-gray-400'
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
