import React /*{ useEffect, useState }*/ from 'react';
// import { Modal, Form, Input, Button, Card } from 'antd';
import { Card } from 'antd';
import '../styles/mainPageTemporary.css';
// import axios from 'axios';

const MainPage = () => {
  /* 추후에 추가할 회사정보 등록 모달 코드 */
  // const [isModalVisible, setIsModalVisible] = useState(false);

  // useEffect(() => {
  //   const checkCompanyId = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/api/user/check-company-id');
  //       if (response.data.showModal) {
  //         setIsModalVisible(true);
  //       }
  //     } catch (error) {
  //       console.error('Failed to check company ID', error);
  //     }
  //   };

  //   checkCompanyId();
  // }, []);

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

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
    //   <Modal
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
    //       <Form.Item label="회사명" name="companyName" rules={[{ required: true, message: '회사명을 입력하세요' }]}>
    //         <Input placeholder="회사명" />
    //       </Form.Item>
    //     </Form>
    //   </Modal>
    // </div>
  );
};

export default MainPage;
