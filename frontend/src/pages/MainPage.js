import React, { useEffect, useState } from 'react';
// import { Form, Input, Button } from 'antd';
// import CustomModal from '../components/common/Modal'
import { Card } from 'antd';
import '../styles/mainPageTemporary.css';
import Filter from '../components/common/Filter';
import Tag from '../components/common/Tag';
// import axios from 'axios';

const MainPage = () => {
  /* 추후에 추가할 회사정보 등록 모달 코드 */
  // const [isModalVisible, setIsModalVisible] = useState(false);

  // const handleOk = () => {
  //   // 확인 버튼 클릭 시의 로직
  //   console.log('회사 등록 처리');
  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   // 취소 버튼 클릭 시의 로직
  //   setIsModalVisible(false);
  // };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ width: '100%', height: 460, textAlign: 'center', backgroundColor: 'gray' }}>프로모션 배너</div>
      <Filter />
      <Tag />
      <Card className="filter-card">가장 많이 방문 랭킹</Card>
      <Card className="filter-card">프로모션</Card>
    </div>
    /* 추후에 추가할 회사정보 등록 모달 코드 */
    // <div>
    //   <Button type="primary" onClick={() => setIsModalVisible(true)}>
    //     회사 등록하기
    //   </Button>
    //   <CustomModal
    //     title="회사 등록하기"
    //     visible={isModalVisible}
    //     onOk={handleOk}
    //     onCancel={handleCancel}
    //     footer={[
    //       <Button key="skip" onClick={handleCancel}>
    //         건너뛰기
    //       </Button>,
    //       <Button key="submit" type="primary" onClick={handleOk}>
    //         등록
    //       </Button>,
    //     ]}
    //   >
    //     <Form>
    //       <Form.Item
    //         label="회사명"
    //         name="companyName"
    //         rules={[{ required: true, message: '회사명을 입력하세요' }]}
    //       >
    //         <Input placeholder="회사명" />
    //       </Form.Item>
    //     </Form>
    //   </CustomModal>
    // </div>
  );
};

export default MainPage;
