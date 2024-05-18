import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './styles/form.module.css'; 

const RegistrationForm = () => {
    const initialValues = {
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  
    const validationSchema = Yup.object({
      firstName: Yup.string().min(3, 'Ім’я повинно містити не менше 3 символів').max(40, 'Ім`я не повинно перевищувати 40 символів').required('Обов’язкове поле'),
      lastName: Yup.string().max(40, 'Прізвище не повинно перевищувати 40 символів'),
      email: Yup.string().email('Введіть коректну електронну адресу').required('Обов’язкове поле'),      
      age: Yup.number()
      .required('Обов’язкове поле')
      .integer('Вік повинен бути цілим числом')
      .min(16, 'Мінімальний вік - 16 років')
      .max(130, 'Максимальний вік - 130 років'),
      password: Yup.string()
        .matches(/[A-Z]/, 'Повинна бути хоча б 1 велика літера')
        .matches(/[^\w\d]/, 'Повинен бути хоча б 1 символ відмінний від букви та цифри')
        .required('Обов’язкове поле'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Паролі повинні співпадати')
        .required('Обов’язкове поле'),
    });
  
    const onSubmit = (values, { resetForm }) => {
      console.log('Authorization submitted:', values);
      resetForm();
    };
    return (
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.formLabel}>Ім’я:</label>
            <Field type="text" id="firstName" name="firstName" className={styles.formInput} />
            <ErrorMessage name="firstName" component="div" />
          </div>
  
          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.formLabel}>Прізвище:</label>
            <Field type="text" id="lastName" name="lastName" className={styles.formInput} />
            <ErrorMessage name="lastName" component="div" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="age" className={styles.formLabel}>Вік:</label>
            <Field type="number" id="age" name="age"   className={styles.formInput}/>
            <ErrorMessage name="age" component="div" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Електронна пошта:</label>
            <Field type="email" id="email" name="email" className={styles.formInput} />
            <ErrorMessage name="email" component="div" />
          </div>
  
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>Пароль:</label>
            <Field type="password" id="password" name="password" className={styles.formInput} />
            <ErrorMessage name="password" component="div" />
          </div>
  
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>Підтвердження пароля:</label>
            <Field type="password" id="confirmPassword" name="confirmPassword" className={styles.formInput} />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>
  
          <button type="submit" className={styles.formButton}>Зареєструватися</button>
        </Form>
      </Formik>
    );
  };
  
  export default RegistrationForm;