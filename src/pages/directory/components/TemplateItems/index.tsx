import { PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { ITemplateField } from '../../../../features/directory/directory.interfaces';
import { useCreateTemplateItem } from '../../../../features/directory/directoryActionService';
import { useGetDirectoryTemplate, useGetDirectoryTemplateItems } from '../../../../features/directory/directoryService';

interface TemplateItemsProps {
  selectedTemplateId: string;
}

const makeClearFieldsArr = (item: ITemplateField[]) => [
  ...item.map((i) => ({
    id: i.id,
    type: i.type,
    value: '',
    name: i.name,
    isRequired: !!i.is_required
  }))
];

export default function TemplateItems({ selectedTemplateId }: TemplateItemsProps) {
  const { data: items } = useGetDirectoryTemplateItems(selectedTemplateId);

  const { data: template } = useGetDirectoryTemplate(selectedTemplateId);

  const { mutate: onCreate } = useCreateTemplateItem(selectedTemplateId);

  const fields = template?.fields;

  const [inputFields, setInputFields] = useState<
    | null
    | {
        id: string;
        type: string;
        value: string | number;
        name: string;
        isRequired: boolean;
      }[]
  >(null);

  // autofill input state with empty data
  useEffect(() => {
    if (fields) {
      setInputFields(makeClearFieldsArr(fields));
    }
  }, [fields]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputFields) {
      // create required data format
      const fieldsArr: Record<string, string> = {};
      inputFields.map((i) => (fieldsArr[i.id] = String(i.value)));

      onCreate({
        templateId: selectedTemplateId,
        fields: fieldsArr
      });

      // clear inputs
      if (fields) {
        setInputFields(makeClearFieldsArr(fields));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (inputFields) {
      const data = [...inputFields];
      data[index].value = e.target.value;
      setInputFields(data);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-lg font-medium uppercase leading-6 text-gray-900 border-b border-gray-200 pb-2">
        {template?.name} items
      </h3>

      <div className="flex gap-20 items-start p-2">
        {/* created items list */}
        {items ? (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              {items.map((item) => (
                <div key={item.id} className="border p-2">
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* create new item form */}
        {inputFields ? (
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3 items-start">
            {inputFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <input
                  value={field.value}
                  onChange={(e) => handleChange(e, index)}
                  id={field.id}
                  type={field.type}
                  placeholder={`enter ${field.name}`}
                  className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {!field.isRequired ? (
                  <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                ) : null}
              </div>
            ))}

            {/* submit */}
            <button
              type="submit"
              className="inline-flex justify-center text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
