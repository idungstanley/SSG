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
      {/* <InputWithValidation
        id="email"
        type="text"
        placeholder="Enter email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isFocused
        message={
          formik.touched.email && formik.errors.email && formik.errors.email
        }
      /> */}
      {Object.keys(formik.values).map((i) => (
        <InputWithValidation
          id={i.toString()}
          type="text"
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
      {/* <InputWithValidation
        id="password"
        type="password"
        placeholder="Enter password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        // message={
        //   formik.touched.password &&
        //   formik.errors.password &&
        //   formik.errors.password
        // }
      /> */}
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
