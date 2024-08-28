import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Layout, Typography, DatePicker, TimePicker, InputNumber, Row, Col, Button } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import UserLocation from './UserLocationModal';
import { fetchSelectedLocation } from '../../features/userLocation';

const { Content } = Layout;
const { Title, Text } = Typography;

const Filter = () => {
  const user = useSelector((state) => state.user.user);
  const [locationName, setLocationName] = useState('역삼역 2번 출구');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalKey, setModalKey] = useState(0); // 모달을 다시 렌더링하기 위한 key

  useEffect(() => {
    const fetchLocation = async () => {
      if (user) {
        const selectedLocation = await fetchSelectedLocation(user.user_id);
        setLocationName(selectedLocation.location_road_address);
      }
    };

    fetchLocation();
  }, [user]);

  const showLocationModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    if (user) {
      const selectedLocation = await fetchSelectedLocation(user.user_id);
      setLocationName(selectedLocation.location_road_address);
    }
  };

  const handleCancel = async () => {
    setIsModalVisible(false);
    setModalKey(modalKey + 1);
    if (user) {
      const selectedLocation = await fetchSelectedLocation(user.user_id);
      setLocationName(selectedLocation.location_road_address);
    }
  };

  return (
    // <div
    //   style={{
    //     width: '100%',
    //     height: 235,
    //     padding: '40px 0px',
    //     backgroundColor: 'green',
    //   }}
    // >
    //   <div
    //     style={{
    //       display: 'flex',
    //       width: '100%',
    //       height: 67,
    //       backgroundColor: 'red',
    //       justifyContent: 'center',
    //     }}
    //   >
    //     <div
    //       style={{
    //         display: 'flex',
    //         flexDirection: 'column',
    //         width: '400px',
    //         height: 67,
    //         backgroundColor: 'blue',
    //       }}
    //     >
    //       <div
    //         style={{
    //           display: 'flex',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           paddingTop: 0,
    //           width: 400,
    //           height: 40,
    //           backgroundColor: 'purple',
    //         }}
    //       >
    //         <p style={{ width: 400, fontSize: 32, height: 40, textAlign: 'center' }}>역삼역</p>
    //         <button style={{ width: 24, height: 24 }}>
    //           <DownOutlined style={{ width: 24, height: 24 }} />
    //         </button>
    //       </div>
    //       <div
    //         style={{
    //           fontSize: 15,
    //           width: '400px',
    //           height: 15,
    //           backgroundColor: 'yellow',
    //           textAlign: 'center',
    //         }}
    //       >
    //         근처 추천 회식 장소입니다.
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <Layout style={{ Height: '235px', backgroundColor: 'white' }}>
      <Content style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px', width: 400 }}>
          <Button
            style={{
              minWidth: 250,
              width: 400,
              textAlign: 'center',
              border: 'none',
              display: 'flex',
              flexDirection: 'row',
              textAlign: 'center',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 300,
              position: 'relative',
            }}
            value="location"
          >
            {locationName}
            <DownOutlined
              onClick={showLocationModal}
              style={{ fontSize: '15px', position: 'absolute', right: '10px' }}
            />
          </Button>

          <div
            style={{
              height: 15,
              borderBottom: '2px solid #B22222',
              width: '400px',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: 12,
            }}
          ></div>
          <Text style={{ marginTop: '8px' }} type="text">
            근처 추천 회식 장소입니다.
          </Text>
        </div>

        <Row style={{ gap: 22, justifyContent: 'center', width: '1920px' }}>
          <Col style={{ MinWidth: 240 }}>
            <DatePicker
              placeholder="회식 날짜 입력"
              style={{ MinWidth: 240, width: 240 }}
              suffixIcon={<CalendarOutlined />}
            />
          </Col>
          <Col style={{ MinWidth: 240 }}>
            <TimePicker
              placeholder="회식 시간대 입력"
              style={{ MinWidth: 240, width: 240 }}
              suffixIcon={<ClockCircleOutlined />}
            />
          </Col>
          <Col style={{ MinWidth: 240 }}>
            <InputNumber
              placeholder="인원수 입력"
              style={{ MinWidth: 240, width: 240 }}
              suffixIcon={<UserOutlined />}
            />
          </Col>
        </Row>
      </Content>
      <Modal
        key={modalKey}
        title=""
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="fit-content"
        style={{ maxWidth: '90%' }}
        bodyStyle={{ padding: 0 }}
      >
        <UserLocation visible={isModalVisible} />
      </Modal>
    </Layout>
  );
};

export default Filter;
