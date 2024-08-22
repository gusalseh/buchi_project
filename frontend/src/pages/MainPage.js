import React, { useEffect, useState } from 'react';
// import { Form, Input, Button } from 'antd';
// import CustomModal from '../components/common/Modal'
import { Card } from 'antd';
import '../styles/mainPageTemporary.css';
// import axios from 'axios';

const MainPage = () => {
  /* 추후에 추가할 회사정보 등록 모달 코드 */
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    // 확인 버튼 클릭 시의 로직
    console.log('회사 등록 처리');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시의 로직
    setIsModalVisible(false);
  };

  return (
    <div className="filter-container">
      <div className="filter-header">필터 항목</div>
      <Card className="filter-card"># 태그 추천</Card>
      <div style={{ display: 'flex', gap: 8 }}>
        <Card style={{ flex: 1 }} className="filter-card">
          우리 회사 사람들이 가는 장소
        </Card>
        <Card style={{ flex: 1 }} className="filter-card">
          같은 업종 사람들이 가는 장소 (회사 산업군)
        </Card>
      </div>
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
