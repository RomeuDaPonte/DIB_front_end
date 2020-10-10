import React from "react";
import { Formik } from "formik";

const AppForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  formClass,
  validateOnBlur = false,
  validateOnChange = false,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnBlur={validateOnBlur}
      validateOnChange={validateOnChange}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={formClass}>
          {children}
        </form>
      )}
    </Formik>
  );
};

export default AppForm;
