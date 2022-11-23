/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import InputWithValidation from '../input/InputWithValidation';

export default function From({ onSubmit, formikConfig }) {
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

      <button
        className="border border-transparent shadow-sm text-sm font-medium text-white bg-primary-600 focus:outline-none hover:bg-primary-700 w-full h-10 px-4 py-2 rounded-md transition-all duration-150 hover:ease-in"
        type="submit"
      >
        {formikConfig.buttonTitle}
      </button>
    </form>
  );
}

From.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formikConfig: PropTypes.object.isRequired,
};
