import React, { useState } from 'react';
import { Modal, Form, Input, Button, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import { openLoginMenu , closeLoginMenu } from '../../store/actions';

import '../../assets/styles/authorization.css'


const Authorization = ({  }) => {
  const [loading, setLoading] = useState(false);
  const visible = useSelector(state => state.interface.loginVisible);
  const dispatch = useDispatch();

  const handleLogin = () => { 
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(closeLoginMenu());
    }, 2000); 
  };

  return (
    <Modal
      title="Авторизація"
      visible={visible}
      onCancel={()=>{
        dispatch(closeLoginMenu())
      }}
      footer= {null}
      
    >
    <Spin spinning={loading} tip="Зачекайте, вхід в профіль...">
        <Form onFinish={handleLogin}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Будь ласка, введіть ім`я користувача' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Ім'я користувача" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Будь ласка, введіть пароль' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Увійти
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default Authorization;