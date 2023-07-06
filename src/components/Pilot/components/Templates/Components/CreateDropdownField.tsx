import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

function CreateDropdownField() {
  const [formInputs, setFormInputs] = useState<{ id: number; value: string }[]>([{ id: 1, value: '' }]);

  const handleRemoveOption = (id: number) => setFormInputs((prev) => prev.filter((i) => i.id !== id));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = e.target;

    setFormInputs((prevInputs) => {
      const newInputs = [...prevInputs];

      return newInputs.map((i) => {
        if (i.id === id) {
          i.value = value;
        }

        return i;
      });
    });
  };

  const handleAddOption = () =>
    setFormInputs((prevInputs) => [...prevInputs, { id: (prevInputs.at(-1)?.id || 1) + 1, value: '' }]);

  return (
    <>
      <div className="space-y-3">
        {formInputs.map((i, index) => (
          <div className="relative" key={i.id}>
            <label
              htmlFor={`input_${i.id}`}
              className="block text-alsoit-gray-300-md font-medium text-gray-400 uppercase mb-1"
            >{`OPTION ${index + 1}`}</label>

            <input
              min={1}
              required
              type="text"
              placeholder={`OPTION ${index + 1}`}
              name={`input_${index + 1}`}
              value={i.value}
              onChange={(event) => handleInputChange(event, i.id)}
              className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset placeholder-gray-300 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-alsoit-gray-300-md sm:text-sm sm:leading-6"
            />

            <button onClick={() => handleRemoveOption(i.id)} className="absolute top-7 right-1">
              <TrashIcon className="w-4 h-4 text-gray-300 cursor-pointer hover:text-primary-300 transition" />
            </button>
          </div>
        ))}
      </div>
      {/* add new option */}
      <button onClick={handleAddOption} className="text-primary-400 flex items-center gap-2 my-1">
        <PlusCircleIcon className="w-5 h-5" />
        <span>Add new option</span>
      </button>
    </>
  );
}

export default CreateDropdownField;
