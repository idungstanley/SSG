import React from 'react';
import { useFormik } from 'formik';
import InputWithValidation from '../input/InputWithValidation';

interface checkboxType {
  id: string;
  value: string;
  onChange: () => void;
  label: string;
}

interface formType {
  onSubmit: (values: { email: string; password: string }) => void;
  formikConfig: {
    initValues: {
      email: string;
      password: string;
    };
    validationSchema: {
      email: string;
      password: string;
    };
    buttonTitle: string;
  }
  checkboxConfig: checkboxType[];
}

export default function Form({
  onSubmit,
  formikConfig,
  checkboxConfig,
}: formType) {
  const formik = useFormik({
    initialValues: {
      ...formikConfig.initValues,
    },

    validationSchema: formikConfig.validationSchema,

    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
      {Object.keys(formik.values).map((i) => (
        <InputWithValidation
          key={i}
          id={i}
          type={i === 'name' ? 'text' : i}
          placeholder={`Enter ${i}`}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...formik.getFieldProps(i)}
          isFocused={Object.keys(formik.values).indexOf(i) === 0}
          message={formik.touched[i] && formik.errors[i] && formik.errors[i]}
          handleSubmit={formik.submitCount}
          isNewPassword={formikConfig.buttonTitle === 'Sign Up'}
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
                  value={i.value}
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

Form.defaultProps = {
  checkboxConfig: null,
};
