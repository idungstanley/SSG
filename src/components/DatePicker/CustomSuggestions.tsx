import { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setCustomSuggetionsField } from '../../features/task/taskSlice';

interface CustomSuggestionProps {
  setRecurring?: Dispatch<SetStateAction<boolean>>;
}

export default function CustomSuggestion({ setRecurring }: CustomSuggestionProps) {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<{ [key: string]: string | number }>({
    depth: 0,
    type: ''
  });
  const [error, setError] = useState<{ monthErr: string; weekErr: string }>({
    monthErr: '',
    weekErr: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    const { type, depth } = value as { type: string; depth: number };
    if ((type === 'month' && depth <= 12 && depth > 0) || (type === 'week' && depth <= 5 && depth > 0)) {
      dispatch(setCustomSuggetionsField({ depth, type, label: `${depth} ${type}}` }));
      setError({ monthErr: '', weekErr: '' });
      setRecurring && setRecurring(false);
    } else {
      type === 'month'
        ? setError({ ...error, monthErr: 'Months depth can not be greater than 12 or less than 1' })
        : setError({ ...error, weekErr: 'Week depth can not be more than 5 or less than 1' });
    }
  };

  return (
    <div className="flex flex-col space-y-4 my-6 items-center justify-center">
      <label htmlFor="type" className="text-alsoit-text-lg px-2 text-left font-semibold">
        Type of field
        <select
          name="type"
          id="type"
          className="w-36 h-8 rounded-md border-none text-alsoit-text-md"
          onChange={handleChange}
        >
          <option value="">Type of field</option>
          <option value="month">Months</option>
          <option value="week">Weeks</option>
        </select>
      </label>
      <label htmlFor="depth" className="text-alsoit-text-lg px-2 text-left font-semibold">
        Depth of Addition
        <input
          type="tel"
          id="depth"
          name="depth"
          className="w-36 h-7 rounded-md text-alsoit-text-md"
          placeholder="2 for 2 weeks"
          onChange={(e) => handleChange(e)}
          // style={{ appearance: 'none' }}
        />
      </label>
      {error.monthErr && <span className="text-alsoit-text-sm text-alsoit-danger text-center">{error.monthErr}</span>}
      {error.weekErr && <span className="text-alsoit-text-sm text-alsoit-danger text-center">{error.weekErr}</span>}
      <div className="flex space-x-2">
        <button
          className="p-1 text-white bg-alsoit-gray-200 hover:bg-alsoit-gray-75 cursor-pointer rounded-md"
          onClick={() => setRecurring && setRecurring(false)}
        >
          Cancel
        </button>
        <button
          className="p-1 text-white bg-alsoit-purple-300 hover:bg-purple-400 cursor-pointer rounded-md"
          onClick={() => handleClick()}
        >
          Create
        </button>
      </div>
    </div>
  );
}
