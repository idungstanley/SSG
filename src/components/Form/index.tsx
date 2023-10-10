import React from 'react';
import { useFormik } from 'formik';
import InputWithValidation from '../input/InputWithValidation';
import { formikConfig } from '../Comments/components/componentType';
import { Capitalize } from '../../utils/NoCapWords/Capitalize';

interface checkboxType {
  id: string;
  value: boolean;
  onChange: () => void;
  label: string;
}

interface formType {
  onSubmit: (values: { email?: string; password?: string; name?: string }) => void;
  formikConfig: formikConfig;
  checkboxConfig?: checkboxType[];
}

export default function Form({ onSubmit, formikConfig, checkboxConfig }: formType) {
  const formik = useFormik({
    initialValues: {
      ...formikConfig.initValues
    },

    validationSchema: formikConfig.validationSchema,

    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
      {Object.keys(formik.values).map((i) => (
        <InputWithValidation
          key={i}
          id={i}
          type={i === 'name' ? 'text' : i === 'confirm password' ? 'password' : i}
          placeholder={i !== 'confirm password' ? `Enter ${i}` : Capitalize(i)}
          {...formik.getFieldProps(i)}
          isFocused={Object.keys(formik.values).indexOf(i) === 0}
          message={
            formik.touched[i as keyof typeof formik.touched] && formik.errors[i as keyof typeof formik.errors]
              ? formik.errors[i as keyof typeof formik.errors]
              : undefined
          }
          handleSubmit={formik.submitCount}
          isNewPassword={formikConfig.buttonTitle === 'Sign Up' || formikConfig.buttonTitle === 'Create Password'}
        />
      ))}

      {checkboxConfig ? (
        <div className="mb-6 space-y-3">
          {checkboxConfig.map((i) => (
            <div key={i.id} className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={i.id}
                  name={i.id}
                  type="checkbox"
                  value={String(i.value)}
                  onChange={i.onChange}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer ring-0 focus:ring-0"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={i.id} className="font-medium text-gray-700">
                  {i.label}
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <button
        className="w-full h-10 px-4 py-2 text-sm font-medium text-white transition-all duration-150 border border-transparent rounded-md shadow-sm bg-primary-600 focus:outline-none hover:bg-primary-700 hover:ease-in"
        type="submit"
        // disabled={checkboxConfig ? checkboxConfig.find((i) => i.value !== true) : false}
      >
        {formikConfig.buttonTitle}
      </button>
    </form>
  );
}
