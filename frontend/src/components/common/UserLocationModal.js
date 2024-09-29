import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Row, Col, Typography, Divider, Dropdown, Menu, Spin, Modal } from 'antd';
import { EnvironmentOutlined, MoreOutlined } from '@ant-design/icons';
import { Work, Domain } from '@mui/icons-material';
import {
  createLocation,
  fetchUserLocations,
  updateSelectedLocation,
  deleteLocation,
  updateLocationByType,
} from '../../features/userLocation';
import { fetchSelectedLocation } from '../../features/userLocationThunk';

const UserLocation = ({ saveLocation, visible }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [address, setAddress] = useState('');
  const [locationType, setLocationType] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const [registeredLocations, setRegisteredLocations] = useState([]);
  const [addressDetail, setAddressDetail] = useState({ roadAddress: '', jibunAddress: '', buildingName: '' });
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLimitVisible, setIsLimitVisible] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [limitMessage, setLimitMessage] = useState('');

  useEffect(() => {
    if (visible) {
      setIsAddressSelected(false);
      setLocationType(null);
      setLocationName('');
      setAddress('');
      setAddressDetail({ roadAddress: '', jibunAddress: '', buildingName: '' });
      setIsIframeVisible(false);
      setLoading(false);

      const fetchData = async () => {
        try {
          const fetchLocations = await fetchUserLocations(user.user_id);

          fetchLocations.sort((a, b) => {
            if (b.selected && !a.selected) return 1;
            if (a.selected && !b.selected) return -1;
            return 0;
          });
          setRegisteredLocations(fetchLocations);
        } catch (error) {
          console.error('Error fetching user locations:', error);
        }
      };
      fetchData();
    }
  }, [visible]);

  const handleAddressSelect = (data) => {
    setAddress(data.roadAddress || data.address);
    setAddressDetail({
      roadAddress: data.roadAddress,
      jibunAddress: data.jibunAddress,
      buildingName: data.buildingName,
    });
    setIsAddressSelected(true);
    setIsIframeVisible(false);
    setLoading(false);
  };

  const handleTypeChange = (e) => {
    setLocationType(e);

    const locationTypeMap = {
      근무지: 'onsite',
      출장지: 'offsite',
    };

    if (locationTypeMap[e]) {
      const isLocationExists = registeredLocations.some((location) => location.location_type === locationTypeMap[e]);
      if (isLocationExists) {
        return;
      }
    }
  };

  const handleInputClick = () => {
    if (registeredLocations.length >= 10) {
      setIsAlertVisible(true);
    } else {
      if (!isIframeVisible) {
        setIsIframeVisible(true);
        setLoading(true);
      } else {
        setIsIframeVisible(false);
        setLoading(false);
      }
    }
  };

  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  const handleConfirmClose = () => {
    setIsConfirmVisible(false);
    setSelectedLocationId(null);
  };

  const handleLimitClose = () => {
    setIsLimitVisible(false);
    setLimitMessage('');
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleRegisterLocation = async () => {
    try {
      const isOnsiteExists = registeredLocations.some((location) => location.location_type === 'onsite');
      const isOffsiteExists = registeredLocations.some((location) => location.location_type === 'offsite');

      if (locationType === '근무지' && isOnsiteExists) {
        setLimitMessage('근무지로 저장된 주소가 있습니다. 이 주소로 변경하시겠습니까?');
        setIsLimitVisible(true);
        return;
      }

      if (locationType === '출장지' && isOffsiteExists) {
        setLimitMessage('출장지로 저장된 주소가 있습니다. 이 주소로 변경하시겠습니까?');
        setIsLimitVisible(true);
        return;
      }

      const address = addressDetail.roadAddress || addressDetail.jibunAddress;

      const { latitude, longitude } = await getCoordinates(address);

      await createLocation({
        user_id: user.user_id,
        location_type: locationType,
        location_name: locationName || null,
        location_latitude: latitude,
        location_longitude: longitude,
        location_road_address: addressDetail.roadAddress,
        location_jibun_address: addressDetail.jibunAddress || null,
        location_building_name: addressDetail.buildingName || null,
      });

      const fetchLocations = await fetchUserLocations(user.user_id);
      fetchLocations.sort((a, b) => {
        if (b.selected && !a.selected) return 1;
        if (a.selected && !b.selected) return -1;
        return 0;
      });
      setRegisteredLocations(fetchLocations);

      setIsAddressSelected(false);
      setLocationType(null);
      setLocationName('');
      setAddress('');
      setAddressDetail({ roadAddress: '', jibunAddress: '', buildingName: '' });
      setIsIframeVisible(false);
      setLoading(false);
    } catch (error) {
      alert('Location registration failed: ' + error.message);
    }
  };

  const handleUpdateLocation = async () => {
    try {
      const address = addressDetail.roadAddress || addressDetail.jibunAddress;
      const { latitude, longitude } = await getCoordinates(address);

      await updateLocationByType({
        user_id: user.user_id,
        location_type: locationType,
        location_name: locationName || null,
        location_latitude: latitude,
        location_longitude: longitude,
        location_road_address: addressDetail.roadAddress,
        location_jibun_address: addressDetail.jibunAddress || null,
        location_building_name: addressDetail.buildingName || null,
      });

      const fetchLocations = await fetchUserLocations(user.user_id);
      fetchLocations.sort((a, b) => {
        if (b.selected && !a.selected) return 1;
        if (a.selected && !b.selected) return -1;
        return 0;
      });
      setRegisteredLocations(fetchLocations);

      setIsLimitVisible(false);
      setIsAddressSelected(false);
      setLocationType(null);
      setLocationName('');
      setAddress('');
      setAddressDetail({ roadAddress: '', jibunAddress: '', buildingName: '' });
      setIsIframeVisible(false);
      setLoading(false);
    } catch (error) {
      alert('Location update failed: ' + error.message);
    }
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

      if (!data) {
        throw new Error('No results found');
      }
      return data;
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      throw error;
    }
  };

  const handleSelectLocation = async (locationId) => {
    try {
      await updateSelectedLocation(locationId, { selected: true, user_id: user.user_id });

      const fetchLocations = await fetchUserLocations(user.user_id);
      fetchLocations.sort((a, b) => {
        if (b.selected && !a.selected) return 1;
        if (a.selected && !b.selected) return -1;
        return 0;
      });
      dispatch(fetchSelectedLocation(user.user_id));
      setRegisteredLocations(fetchLocations);
      handleConfirmClose();
    } catch (error) {
      console.error('handleSelectLocation Failed: ', error);
    }
  };

  const handleLocationClick = (locationId) => {
    setSelectedLocationId(locationId);
  };

  const handleDeleteLocation = async (locationId) => {
    await deleteLocation(locationId, { user_id: user.user_id });

    const fetchLocations = await fetchUserLocations(user.user_id);
    fetchLocations.sort((a, b) => {
      if (b.selected && !a.selected) return 1;
      if (a.selected && !b.selected) return -1;
      return 0;
    });
    setRegisteredLocations(fetchLocations);
  };

  const handleIframeMessage = (event) => {
    if (event.data && typeof event.data === 'object' && event.data.type === 'address') {
      handleAddressSelect(event.data.address);
    }
  };

  React.useEffect(() => {
    window.addEventListener('message', handleIframeMessage);

    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  const getLocationIcon = (type) => {
    switch (type) {
      case 'onsite':
        return <Domain />;
      case 'offsite':
        return <Work />;
      case 'etc':
      default:
        return <EnvironmentOutlined />;
    }
  };

  const menu = (locationId) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleDeleteLocation(locationId)}>
        삭제하기
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        width: 558,
        height: 600,
        border: 'none',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Typography.Title
        level={5}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          height: 20,
          marginBottom: 20,
        }}
      >
        위치 입력하기
      </Typography.Title>

      <Divider style={{ marginTop: '8px', marginBottom: '16px' }} />

      {!isAddressSelected ? (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <Row gutter={8} justify="center" style={{ marginBottom: '12px' }}>
            <Col span={12}>
              <Button
                onClick={handleInputClick}
                style={{
                  cursor: 'pointer',
                  width: '100%',
                  backgroundColor: isIframeVisible ? '#CC3C28' : '',
                  color: isIframeVisible ? '#fff' : '',
                  height: '40px',
                }}
              >
                주소 검색하기
              </Button>

              <Modal
                visible={isAlertVisible}
                onCancel={handleAlertClose}
                footer={null}
                centered
                closable={true}
                bodyStyle={{ textAlign: 'center' }}
              >
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', marginTop: '20px' }}>
                  주소는 최대 10개까지 저장 가능합니다
                </div>
                <div style={{ fontSize: '14px', color: '#737373', marginBottom: '24px' }}>
                  추가로 등록을 원하시면 등록된 위치 중 하나를 삭제해 주세요
                </div>
                <Button
                  style={{
                    borderRadius: 'var(--BorderRadius-borderRadiusLG, 8px)',
                    backgroundColor: 'var(--0Gray-500, #737373)',
                    color: 'var(--Background-colorBgContainer, #FFF)',
                    width: '170px',
                    height: '40px',
                  }}
                  onClick={handleAlertClose}
                >
                  확인
                </Button>
              </Modal>
            </Col>
            <Col span={12}>
              <Button disabled style={{ width: '100%', height: '40px' }}>
                현재 위치로 찾기
              </Button>
            </Col>
          </Row>
          {isIframeVisible && (
            <div>
              <Spin spinning={loading} style={{ color: 'var(--0Gray-500, #737373)' }} tip="주소 검색 로딩 중...">
                <iframe
                  src="/daum-postcode.html"
                  title="Daum Postcode"
                  style={{ width: '100%', height: '450px', border: 'none', marginLeft: '20px' }}
                  onLoad={handleIframeLoad}
                />
              </Spin>
              <style>
                {`
              .ant-spin-dot-item {
                background-color: var(--0Gray-500, #737373) !important;
              }
            `}
              </style>
            </div>
          )}

          {!isIframeVisible &&
            (registeredLocations.length === 0 ? (
              <div style={{ marginTop: 200, color: '#737373' }}>근무지(출발 위치)를 검색해주세요</div>
            ) : (
              <div style={{ marginTop: 20, width: '100%', overflow: 'hidden' }}>
                {registeredLocations.map((location, index) => (
                  <div key={location.location_id}>
                    <div
                      onClick={(e) => {
                        if (!e.defaultPrevented) handleLocationClick(location.location_id);
                      }}
                      style={{
                        marginBottom: 10,
                        paddingTop: 10,
                        paddingRight: 10,
                        paddingBottom: 10,
                        paddingLeft: 15,
                        border: `1px solid ${
                          location.selected ? 'var(--0Gray-700, #404040)' : 'var(--0Gray-200, #E5E5E5)'
                        }`,
                        borderRadius: 8,
                        display: 'flex',
                        justifyContent: 'space-between',
                        position: 'relative',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => setIsConfirmVisible(true)}>
                        {React.cloneElement(getLocationIcon(location.location_type), {
                          style: { fontSize: 36, marginRight: 20, color: '#A3A3A3' },
                        })}
                        <div style={{ textAlign: 'start' }}>
                          <div
                            style={{
                              color: 'var(--kakao-logo, #000)',
                              marginBottom: '5px',
                              display: 'flex',
                              alignItems: 'center',
                              fontWeight: location.selected ? 600 : 400,
                            }}
                          >
                            {location.location_type === 'onsite' && '근무지'}
                            {location.location_type === 'offsite' && '출장지'}
                            {(location.location_type === 'onsite' || location.location_type === 'offsite') &&
                              location.selected && (
                                <div
                                  style={{
                                    borderRadius: '4px',
                                    border: '1px solid var(--0Primary-100, #F2CCC7)',
                                    color: 'var(--0Primary-500, #CC3C28)',
                                    backgroundColor: 'var(--0Primary-50, #FDF5F4)',
                                    padding: '1px 8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    marginLeft: '8px',
                                    height: '20px',
                                    fontSize: '12px',
                                    fontFamily: 'Inter',
                                    fontWeight: '500',
                                  }}
                                >
                                  현재 설정된 위치
                                </div>
                              )}
                          </div>
                          <div
                            style={{
                              color:
                                location.location_type === 'etc'
                                  ? 'var(--kakao-logo, #000)'
                                  : location.selected
                                  ? 'var(--0Gray-800, #262626)'
                                  : '#737373',
                              fontWeight: location.selected ? 600 : 400,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            {location.location_name ||
                              location.location_building_name ||
                              location.location_road_address}
                            {location.location_type === 'etc' && location.selected && (
                              <div
                                style={{
                                  borderRadius: '4px',
                                  border: '1px solid var(--0Primary-100, #F2CCC7)',
                                  color: 'var(--0Primary-500, #CC3C28)',
                                  backgroundColor: 'var(--0Primary-50, #FDF5F4)',
                                  padding: '1px 8px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  marginLeft: '8px',
                                  height: '20px',
                                  fontSize: '12px',
                                  fontFamily: 'Inter',
                                  fontWeight: '500',
                                }}
                              >
                                현재 설정된 위치
                              </div>
                            )}
                          </div>
                          <div
                            style={{
                              color: location.selected ? 'var(--0Gray-700, #404040)' : 'var(--0Gray-500, #737373)',
                            }}
                          >
                            {!location.location_name &&
                            !location.location_building_name &&
                            location.location_road_address
                              ? location.location_jibun_address
                              : location.location_road_address}
                          </div>
                        </div>
                      </div>
                      {!location.selected && (
                        <Dropdown overlay={menu(location.location_id)} trigger={['click']} placement="bottomRight">
                          <Button
                            type="text"
                            icon={<MoreOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                            }}
                          />
                        </Dropdown>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      ) : (
        <div style={{ width: '100%' }}>
          <div style={{ marginBottom: '16px' }}>
            <Typography.Text style={{ fontSize: '16px', color: '#333333', fontWeight: 'bold' }}>
              {addressDetail.roadAddress}
              {addressDetail.buildingName && ` (${addressDetail.buildingName})`}
            </Typography.Text>
            <br />
            <Typography.Text style={{ fontSize: '14px', color: '#737373' }}>
              {addressDetail.jibunAddress}
            </Typography.Text>
          </div>

          <Divider style={{ marginTop: '8px', marginBottom: '16px' }} />

          <div style={{ display: 'flex', marginBottom: '16px' }}>
            <Button
              type={locationType === '근무지' ? 'default' : 'default'}
              icon={React.cloneElement(<Domain />, {
                style: { fontSize: 15, color: locationType === '근무지' ? '#CC3C28' : '#A3A3A3' },
              })}
              onClick={() => handleTypeChange('근무지')}
              style={{
                borderColor: locationType === '근무지' ? '#CC3C28' : '#d9d9d9',
                color: locationType === '근무지' ? '#CC3C28' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
                marginRight: '16px',
                borderRadius: 8,
              }}
            >
              근무지
            </Button>

            <Button
              type={locationType === '출장지' ? 'default' : 'default'}
              icon={React.cloneElement(<Work />, {
                style: { fontSize: 15, color: locationType === '출장지' ? '#CC3C28' : '#A3A3A3' },
              })}
              onClick={() => handleTypeChange('출장지')}
              style={{
                borderColor: locationType === '출장지' ? '#CC3C28' : '#d9d9d9',
                color: locationType === '출장지' ? '#CC3C28' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
                marginRight: '16px',
                borderRadius: 8,
              }}
            >
              출장지
            </Button>

            <Button
              type={locationType === '기타' ? 'default' : 'default'}
              icon={React.cloneElement(<EnvironmentOutlined />, {
                style: { fontSize: 15, color: locationType === '기타' ? '#CC3C28' : '#A3A3A3' },
              })}
              onClick={() => handleTypeChange('기타')}
              style={{
                borderColor: locationType === '기타' ? '#CC3C28' : '#d9d9d9',
                color: locationType === '기타' ? '#CC3C28' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
                borderRadius: 8,
              }}
            >
              기타
            </Button>
          </div>

          <Input
            placeholder="해당 장소의 명칭을 입력해주세요"
            value={locationName}
            onChange={(e) => {
              const input = e.target.value;
              const maxLength = 15;
              const koreanCharCount = (input.match(/[가-힣]/g) || []).length;

              if (input.length - koreanCharCount + koreanCharCount * 2 <= maxLength) {
                setLocationName(input);
              }
            }}
            style={{
              borderColor: '#d9d9d9',
              color: '#737373',
              height: '40px',
              borderRadius: 8,
            }}
          />

          <Button
            type="primary"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              backgroundColor: locationType ? '#CC3C28' : '#A3A3A3',
              borderColor: locationType ? '#CC3C28' : '#A3A3A3',
              height: '40px',
            }}
            onClick={handleRegisterLocation}
            disabled={!locationType}
          >
            등록하기
          </Button>
        </div>
      )}
      {/* 현재 위치 변경 확인모달 */}
      <Modal
        visible={isConfirmVisible}
        onCancel={handleConfirmClose}
        footer={null}
        centered
        closable={true}
        bodyStyle={{ textAlign: 'center' }}
      >
        <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '24px' }}>위치를 변경하시겠습니까?</div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Button
            style={{
              borderRadius: '8px',
              backgroundColor: '#CC3C28',
              color: '#FFF',
              width: '120px',
              height: '40px',
              fontWeight: 'bold',
            }}
            onClick={() => handleSelectLocation(selectedLocationId)}
          >
            예
          </Button>
          <Button
            style={{
              borderRadius: '8px',
              backgroundColor: '#A3A3A3',
              color: '#FFF',
              width: '120px',
              height: '40px',
              fontWeight: 'bold',
            }}
            onClick={handleConfirmClose}
          >
            아니요
          </Button>
        </div>
      </Modal>

      {/* 근무지 또는 출장지가 이미 있는데 덮어쓰기 저장할때 */}
      <Modal
        visible={isLimitVisible}
        onCancel={handleLimitClose}
        footer={null}
        centered
        closable={true}
        bodyStyle={{ textAlign: 'center' }}
      >
        <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '24px' }}>
          {/* 근무지와 출장지는 1개씩만 등록 가능합니다 */}
          {limitMessage}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Button
            style={{
              borderRadius: '8px',
              backgroundColor: '#CC3C28',
              color: '#FFF',
              width: '120px',
              height: '40px',
              fontWeight: 'bold',
            }}
            onClick={handleUpdateLocation}
          >
            변경
          </Button>
          <Button
            style={{
              borderRadius: '8px',
              backgroundColor: '#A3A3A3',
              color: '#FFF',
              width: '120px',
              height: '40px',
              fontWeight: 'bold',
            }}
            onClick={handleLimitClose}
          >
            취소
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserLocation;
