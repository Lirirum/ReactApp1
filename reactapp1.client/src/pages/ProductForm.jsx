
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './styles/productForm.module.css';
import { useState } from 'react';

const ProductForm = () => {
  const [products, setProducts] = useState([]);
  const initialValues = {
    productName: '',
    price: '',
  };

  const validationSchema = Yup.object({
    productName: Yup.string().required('Product Name is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
  });

  const onSubmit = (values, { resetForm }) => {
    
    console.log('Product submitted:', values);
    setProducts([...products,values]);
    console.log(products);
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className={styles.formContainer}>
        <label className={styles.label} htmlFor="productName">
          Product Name:
        </label>
        <Field className={styles.input} type="text" id="productName" name="productName" />
        <ErrorMessage className={styles.errorMessage} name="productName" component="div" />

        <label className={styles.label} htmlFor="price">
          Price:
        </label>
        <Field className={styles.input} type="text" id="price" name="price" />
        <ErrorMessage className={styles.errorMessage} name="price" component="div" />

        <button className={styles.button} type="submit">
          Add Product
        </button>
      </Form>
    </Formik>
  );
};

export default ProductForm;