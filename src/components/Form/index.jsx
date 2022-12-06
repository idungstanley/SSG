/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import InputWithValidation from '../input/InputWithValidation';

export default function Form({ onSubmit, formikConfig, checkboxConfig }) {
  const formik = useFormik({
    initialValues: {
      ...formikConfig.initValues,
    },

    validationSchema: formikConfig.validationSchema,

    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  console.log(checkboxConfig);

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
        <div className="mb-6">
          {checkboxConfig.map((i) => (
            <div key={i.id} className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id={i.id}
                  // aria-describedby="comments-description"
                  name={i.id}
                  type="checkbox"
                  value={i.value}
                  onChange={i.onChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={i.id} className="font-medium text-gray-700">
                  {i.label}
                </label>
                {/* <span id="comments-description" className="text-gray-500">
                  <span className="sr-only">New comments </span>
                  so you always know what&apos;s happening.
                </span> */}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <button
        className="border border-transparent shadow-sm text-sm font-medium text-white bg-primary-600 focus:outline-none hover:bg-primary-700 w-full h-10 px-4 py-2 rounded-md transition-all duration-150 hover:ease-in"
        type="submit"
      >
        {formikConfig.buttonTitle}
      </button>
    </form>
  );
}

Form.defaultProps = {
  checkboxConfig: null,
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formikConfig: PropTypes.object.isRequired,
  checkboxConfig: PropTypes.array,
};
