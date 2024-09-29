import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Modal, Select } from 'antd';
import { Layout, Typography, DatePicker, InputNumber, Row, Col, Button, Spin } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  SearchOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import UserLocation from './UserLocationModal';
import { fetchSelectedLocation } from '../../features/userLocation';
import LoginAlert from '../alert/LoginAlert';

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const Filter = () => {
  const user = useSelector((state) => state.user.user);
  const [locationName, setLocationName] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [isLoginAlertVisible, setIsLoginAlertVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isLocationFetched, setIsLocationFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true);
      if (user) {
        const selectedLocation = await fetchSelectedLocation(user.user_id);
        if (selectedLocation && selectedLocation.location_road_address) {
          setLocationName(selectedLocation.location_road_address);
        }
      }
      setIsLoading(false);
      setIsLocationFetched(true);
    };

    fetchLocation();
  }, [user, locationName, isLocationFetched]);

  useEffect(() => {
    if (isLocationFetched && !locationName) {
      setIsLoading(true);
      const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          } else {
            reject(new Error('Geolocation is not supported by this browser.'));
          }
        });
      };

      const onSuccess = (position) => {
        const { latitude, longitude } = position.coords;
        setSelectedLatitude(latitude);
        setSelectedLongitude(longitude);
        getReverseGeocode(latitude, longitude);
      };

      const onError = (error) => {
        console.error(error);
        setLocationName('역삼역 2번 출구');
      };

      const getReverseGeocode = async (latitude, longitude) => {
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost:80/api/reverse_geocode?lat=${latitude}&lon=${longitude}`);

          if (!response.ok) {
            const text = await response.text();
            console.error(`Error response: ${text}`);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data.results && data.results[0]) {
            const roadAddress = formatAddress(data.results) || '주소를 찾을 수 없습니다.';
            setLocationName(roadAddress);
          } else {
            setLocationName('주소를 찾을 수 없습니다.');
          }
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
        } finally {
          setIsLoading(false);
        }
      };

      const getFetchedLocation = async () => {
        try {
          const position = await getCurrentLocation();
          onSuccess(position);
        } catch (error) {
          onError(error);
        }
      };

      getFetchedLocation();
    }
  }, [locationName, isLocationFetched]);

  const formatAddress = (data) => {
    const item = data[0];
    const region = item.region;
    const land = item.land;

    const city = (region.area1?.name).slice(0, 2);
    const district = region.area2?.name;

    const roadName = land.name;
    const buildingNumber = land.number1;

    const address = `${city} ${district} ${roadName} ${buildingNumber}`;

    return address;
  };

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
    setIsLoginAlertVisible(false);
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
    setIsSelectOpen(true);
  };

  const handleTimeChange = (value) => {
    setSelectedTime(value);
    setIsSelectOpen(false);
  };

  const getCoordinates = async (address) => {
    try {
      const response = await fetch(`http://localhost:80/api/geocode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch coordinates');
      }

      const data = await response.json();
      return { latitude: data.latitude, longitude: data.longitude };
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      throw error;
    }
  };

  const handleSearch = async () => {
    const date = selectedDate ? selectedDate.format('YYYY년 MM월 DD일') : getTodayFormatted();
    const time = selectedTime || '저녁회식';
    const amount = selectedAmount || 3;

    let latitude, longitude;

    if (locationName === '역삼역 2번 출구') {
      latitude = '37.5000263';
      longitude = '127.0365456';
    } else {
      try {
        const coordinates = await getCoordinates(locationName);
        latitude = coordinates.latitude;
        longitude = coordinates.longitude;
      } catch (error) {
        console.error('Failed to fetch coordinates:', error);
        return;
      }
    }
    setSelectedLatitude(latitude);
    setSelectedLongitude(longitude);

    navigate(
      `/filterResult?date=${date}&time=${time}&amount=${amount}&lat=${latitude}&lng=${longitude}&address=${locationName}`
    );
  };

  return (
    <Layout style={{ Height: '235px', backgroundColor: 'white' }}>
      <Content style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px', width: 400 }}>
          {isLoading ? (
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          ) : (
            <Button
              style={{
                minWidth: 250,
                width: 400,
                textAlign: 'center',
                border: 'none',
                display: 'flex',
                flexDirection: 'row',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: 300,
                position: 'relative',
              }}
              onClick={() => {
                if (user) {
                  showLocationModal();
                } else {
                  setIsLoginAlertVisible(true);
                }
              }}
            >
              <span>{locationName}</span>
              <DownOutlined style={{ fontSize: '15px', position: 'absolute', right: '10px' }} />
            </Button>
          )}

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
              open={isSelectOpen}
              onDropdownVisibleChange={(open) => setIsSelectOpen(open)}
              onChange={handleTimeChange}
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
              value={selectedAmount === null ? undefined : selectedAmount}
              onFocus={() => setSelectedAmount(selectedAmount || 3)}
              onChange={(value) => {
                if (value < 1) {
                  return 1;
                }
                if (value > 100) {
                  return 100;
                }
                setSelectedAmount(value);
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
              onClick={handleSearch}
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
