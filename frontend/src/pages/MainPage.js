import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import CustomModal from '../components/common/Modal';
import { Card } from 'antd';
import '../styles/mainPageTemporary.css';
import Filter from '../components/common/Filter';
import Tag from '../components/common/Tag';
import axios from 'axios';

const MainPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [usersWithoutCompany, setUsersWithoutCompany] = useState([]);

  useEffect(() => {
    if (isModalVisible) {
      // 회사 ID가 없는 사용자만 가져오는 API 호출
      axios
        .get('/api/users/no-company')
        .then((response) => {
          setUsersWithoutCompany(response.data);
        })
        .catch((error) => {
          console.error('회사 ID가 없는 사용자 조회 중 오류 발생:', error);
        });
    }
  }, [isModalVisible]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('회사 등록 처리', values);
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시의 로직
    setIsModalVisible(false);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ width: '100%', height: 460, textAlign: 'center', backgroundColor: 'gray' }}>프로모션 배너</div>
      <Filter />
      <Tag />
      <Card className="filter-card">가장 많이 방문 랭킹</Card>
      <Card className="filter-card">프로모션</Card>

      {/* <Button type="primary" onClick={() => setIsModalVisible(true)}>
        회사 등록하기
      </Button> */}

      <CustomModal
        title="회사 정보 입력하기"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="skip" onClick={handleCancel} style={{ borderRadius: '8px' }}>
            건너뛰기
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} style={{ borderRadius: '8px' }}>
            등록
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            label="회사명"
            name="companyName"
            rules={[{ required: true, message: '회사명을 입력하세요' }]}
            labelCol={{ span: 24 }} // Label의 width를 전체로 설정
            wrapperCol={{ span: 24 }} // Input의 width를 전체로 설정
          >
            <Input placeholder="회사명 검색" style={{ padding: '12px', borderRadius: '8px' }} />
          </Form.Item>
        </Form>
      </CustomModal>
    </div>
  );
};

export default MainPage;
