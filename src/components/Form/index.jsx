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
          id={i.toString()}
          type={i === 'password' ? 'password' : i === 'email' ? 'email' : 'text'}
          key={i}
          placeholder={`Enter ${i}`}
          value={formik.values[i]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isFocused={Object.keys(formik.values).indexOf(i) === 0}
          message={
            formik.touched[i] && formik.errors[i] && formik.errors[i]
          }
        />
      ))}

      <button
        className="border border-transparent shadow-sm text-sm font-medium text-white bg-primary-600 focus:outline-none hover:bg-primary-700 w-full h-10 px-4 py-2 rounded-md"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
}

From.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formikConfig: PropTypes.object.isRequired,
};
