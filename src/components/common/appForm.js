import React from "react";
import { Formik } from "formik";

const AppForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  formClass,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
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
