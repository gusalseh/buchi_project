import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
import { Modal, Select } from 'antd';
import { Layout, Typography, DatePicker, TimePicker, InputNumber, Row, Col, Button } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import UserLocation from './UserLocationModal';
import { fetchSelectedLocation } from '../../features/userLocation';
import LoginAlert from '../alert/LoginAlert';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const Filter = () => {
  const user = useSelector((state) => state.user.user);
  const [locationName, setLocationName] = useState('역삼역 2번 출구');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalKey, setModalKey] = useState(0); // 모달을 다시 렌더링하기 위한 key
  const [isLoginAlertVisible, setIsLoginAlertVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // TODO: 날짜, 시간, 인원의 정보를 한꺼번에 state 관리해주는게 좋아보임
  const [selectedTime, setSelectedTime] = useState(null);

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

  const handleLoginAlertClose = () => {
    setIsLoginAlertVisible(false); // 로그인 경고 모달 닫기
  };

  const getTodayFormatted = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return `${year}년 ${month < 10 ? `0${month}` : month}월 ${day < 10 ? `0${day}` : day}일`;
  };

  const disabledDate = (current) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return current && current.toDate() < today;
  };

  const handleDateChange = (dateString) => {
    setSelectedDate(dateString);
  };

  const handleChange = (value) => {
    setSelectedTime(value);
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
            {user ? (
              <DownOutlined
                onClick={showLocationModal}
                style={{ fontSize: '15px', position: 'absolute', right: '10px' }}
              />
            ) : (
              <DownOutlined
                onClick={() => setIsLoginAlertVisible(true)}
                style={{ fontSize: '15px', position: 'absolute', right: '10px' }}
              />
            )}
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
              placeholder={getTodayFormatted()}
              value={selectedDate}
              style={{ MinWidth: 240, width: 240, height: 40 }}
              disabledDate={disabledDate}
              format="YYYY년 MM월 DD일"
              suffixIcon={<CalendarOutlined />}
              onChange={handleDateChange}
              allowClear={false}
            />
          </Col>
          <Col style={{ MinWidth: 240 }}>
            <Select
              placeholder="저녁회식"
              style={{ width: 240, height: 40, color: 'rgba(0, 0, 0, 0.25)' }}
              suffixIcon={<ClockCircleOutlined style={{ fontSize: 15 }} />}
              onChange={handleChange}
              value={selectedTime}
            >
              <Option value="점심회식" style={{ margin: '0 0 10px 0' }}>
                점심회식
              </Option>
              <Option value="저녁회식">저녁회식</Option>
            </Select>
          </Col>
          <Col style={{ MinWidth: 240 }}>
            <InputNumber
              placeholder="3명"
              style={{
                MinWidth: 240,
                width: 240,
                height: 40,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                color: 'rgba(0, 0, 0, 0.25)',
              }}
              suffixIcon={<UserOutlined />}
              min={1}
              max={100}
              onChange={(value) => {
                if (value < 1) {
                  return 1;
                }
                if (value > 100) {
                  return 100;
                }
                return value;
              }}
            />
          </Col>
          <Col style={{ MinWidth: 40 }}>
            <Button
              icon={<SearchOutlined style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.65)' }} />}
              style={{
                width: 40,
                height: 40,
                borderRadius: '6px',
                border: '1px solid #d9d9d9',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
              }}
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

      <LoginAlert visible={isLoginAlertVisible} onClose={handleLoginAlertClose} />
    </Layout>
  );
};

export default Filter;
