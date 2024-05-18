import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './styles/authorizationForm.module.css';

const AuthorizationForm = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log('Authorization submitted:', values);
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className={styles.formContainer}>
        <label className={styles.label} htmlFor="username">
          Username:
        </label>
        <Field className={styles.input} type="text" id="username" name="username" />
        <ErrorMessage className={styles.errorMessage} name="username" component="div" />

        <label className={styles.label} htmlFor="password">
          Password:
        </label>
        <Field className={styles.input} type="password" id="password" name="password" />
        <ErrorMessage className={styles.errorMessage} name="password" component="div" />

        <button className={styles.button} type="submit">
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default AuthorizationForm;