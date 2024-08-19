import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import Login from '../LoginPage';

export default function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex justify-between bg-base-100">
      <div className="flex p-2 ">
        <Link to="/">Home</Link>
      </div>
      <div className="flex items-center p-2">
        <button onClick={showModal}>Login</button>
      </div>

      <Modal title="Login" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Login />
      </Modal>
    </div>
  );
}
