import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import Login from '../LoginPage';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, logoutUser } from '../../features/userSlice';

export default function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="flex justify-between bg-base-100">
      <div className="flex p-2">
        <Link to="/">Home</Link>
      </div>
      <div className="flex items-center p-2">
        {user ? <button onClick={handleLogout}>Logout</button> : <button onClick={showModal}>Login</button>}
      </div>

      <Modal title="Login" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Login />
      </Modal>
    </div>
  );
}
