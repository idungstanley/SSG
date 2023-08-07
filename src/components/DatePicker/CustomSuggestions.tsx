import { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setCustomSuggetionsField } from '../../features/task/taskSlice';

interface CustomSuggestionProps {
  setCustomSuggestion?: Dispatch<SetStateAction<boolean>>;
}

export default function CustomSuggestion({ setCustomSuggestion }: CustomSuggestionProps) {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<{ [key: string]: string | number }>({
    depth: 0,
    type: ''
  });
  const [error, setError] = useState<{ monthErr: string; weekErr: string; numberErr?: string }>({
    monthErr: '',
    weekErr: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    const { type, depth } = value as { type: string; depth: number };
    if (!Number(depth)) return setError((prev) => ({ ...prev, numberErr: 'Only number values allowed for depth' }));
    if ((type === 'month' && depth > 0) || (type === 'week' && depth > 0)) {
      dispatch(setCustomSuggetionsField({ depth, type, label: `${depth} ${type}}` }));
      setError({ monthErr: '', weekErr: '' });
      setCustomSuggestion && setCustomSuggestion(false);
    } else {
      type === 'month'
        ? setError({ ...error, monthErr: 'Months depth can not be less than 1' })
        : setError({ ...error, weekErr: 'Week depth can not be less than 1' });
    }
  };

  return (
    <div className="flex flex-col space-y-4 my-6 items-center justify-center">
      <label htmlFor="type" className="text-alsoit-text-lg  text-left font-semibold flex flex-col space-y-2">
        <span>Type of field</span>
        <select
          name="type"
          id="type"
          className="w-36 h-9 rounded-md border border-alsoit-gray-75 text-alsoit-text-md"
          onChange={handleChange}
        >
          <option value="">Type of field</option>
          <option value="month">Months</option>
          <option value="week">Weeks</option>
        </select>
      </label>
      <label htmlFor="depth" className="text-alsoit-text-lg text-left font-semibold flex flex-col space-y-2">
        <span>Depth of Addition</span>
        <input
          type="tel"
          id="depth"
          name="depth"
          className="w-36 h-7 rounded-md border border-alsoit-gray-75 text-alsoit-text-md"
          placeholder={value['type'] === 'week' ? '2 for 2 weeks' : '2 for 2 months'}
          onChange={(e) => handleChange(e)}
        />
      </label>
      {error.monthErr && <span className="text-alsoit-text-sm text-alsoit-danger text-center">{error.monthErr}</span>}
      {error.weekErr && <span className="text-alsoit-text-sm text-alsoit-danger text-center">{error.weekErr}</span>}
      {error.numberErr && <span className="text-alsoit-text-sm text-alsoit-danger text-center">{error.numberErr}</span>}
      <div className="flex space-x-2">
        <button
          className="border p-1 rounded-md text-alsoit-text-md font-semibold border-alsoit-danger text-alsoit-danger w-16 h-8"
          onClick={() => setCustomSuggestion && setCustomSuggestion(false)}
        >
          Cancel
        </button>
        <button
          className="border p-1 rounded-md text-alsoit-text-md font-semibold text-white bg-alsoit-success w-16 h-8 border-none"
          onClick={() => handleClick()}
        >
          Create
        </button>
      </div>
    </div>
  );
}
