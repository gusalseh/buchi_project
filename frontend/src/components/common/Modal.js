import React from 'react';
import { Modal, Button } from 'antd';

const CustomModal = ({ title, visible, onOk, onCancel, footer, children }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={
        footer || [
          <Button key="cancel" onClick={onCancel}>
            취소
          </Button>,
          <Button key="submit" type="primary" onClick={onOk}>
            확인
          </Button>,
        ]
      }
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
