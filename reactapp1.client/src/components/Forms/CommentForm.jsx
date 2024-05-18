import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form , ErrorMessage  } from 'formik';
import * as Yup from 'yup';
import { Modal, } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';


import {  closeCommentMenu ,addProductComm } from '../../store/actions';
import  styles from'../../assets/styles/commentForm.module.css'


const CommentFormModal = ({  productId }) => {
    const [comment, setComment] = useState('');
    const isOpen = useSelector(state => state.interface.commentVisible);
    const is = useSelector(state => state.cart.productComments);
    const dispatch = useDispatch();
  

  const initialValues = {
    name: '',
    email: '',
    comment: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Обов’язкове поле'),
    email: Yup.string().email('Введіть коректну електронну адресу').required('Обов’язкове поле'),
    comment: Yup.string().required('Обов’язкове поле'),
  });

  const onSubmit = (values) => {
    
    console.log(values);     
    dispatch(addProductComm(productId, values.comment));
    dispatch(closeCommentMenu());
  };

  return (
    <Modal
  
    title="Додати коментар"
    visible={isOpen}
    onCancel={()=>{
      dispatch(closeCommentMenu())
    }}
    footer= {null}
    >

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>Ім’я:</label>
            <Field type="text" id="name" name="name" className={styles.formInput} />
            <ErrorMessage name="name" component="div" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Електронна пошта:</label>
            <Field type="email" id="email" name="email" className={styles.formInput} />
            <ErrorMessage name="email" component="div" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="comment" className={styles.formLabel}>Коментар:</label>
            <Field  as="textarea" id="comment" name="comment" className={styles.formTextarea}  />
            
          </div>

          <button type="submit" className={styles.formButton}>Додати коментар</button>
        </Form>
      </Formik>
 
    </Modal>
  );
};

export default CommentFormModal;