import { PlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useCreateTemplateItem } from '../../../../features/directory/directoryActionService';
import {
  useGetDirectoryTemplate,
  useGetDirectoryTemplateItems,
} from '../../../../features/directory/directoryService';

interface TemplateItemsProps {
  selectedTemplateId: string;
}

export default function TemplateItems({
  selectedTemplateId,
}: TemplateItemsProps) {
  const { data: items } = useGetDirectoryTemplateItems(selectedTemplateId);

  const { data: template } = useGetDirectoryTemplate(selectedTemplateId);

  const { mutate: onCreate } = useCreateTemplateItem(selectedTemplateId);

  const fields = template?.fields;

  const [inputFields, setInputFields] = useState<
    null | { id: string; type: string; value: string | number; name: string }[]
  >(null);

  useEffect(() => {
    if (fields) {
      setInputFields([
        ...fields.map((i) => ({
          id: i.id,
          type: i.type,
          value: '',
          name: i.name,
        })),
      ]);
    }
  }, [fields]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputFields) {
      const fieldsArr: Record<string, string> = {};
      inputFields.map((i) => (fieldsArr[i.id] = String(i.value)));

      onCreate({
        templateId: selectedTemplateId,
        fields: fieldsArr,
      });

      if (fields) {
        setInputFields([
          ...fields.map((i) => ({
            id: i.id,
            type: i.type,
            value: '',
            name: i.name,
          })),
        ]);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (inputFields) {
      const data = [...inputFields];
      data[index].value = e.target.value;
      setInputFields(data);
    }
  };

  return (
    <div className="flex flex-col">
      {items ? (
        <div className="mt-10 flex flex-col gap-3">
          <h3 className="text-lg font-medium uppercase leading-6 text-gray-900 border-b border-gray-200 pb-2">
            {template?.name} items
          </h3>
          <div className="flex flex-col">
            {items.map((item) => (
              <div key={item.id} className="border p-2">
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-3 pt-4 items-start"
      >
        {inputFields?.map((field, index) => (
          <div key={field.id}>
            <input
              value={field.value}
              onChange={(e) => handleChange(e, index)}
              id={field.id}
              type={field.type}
              placeholder={`enter ${field.name}`}
              className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        ))}
        <button
          type="submit"
          className="inline-flex justify-center text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
